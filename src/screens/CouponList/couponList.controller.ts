import {useEffect, useState} from 'react';
import axiosInstance from '../../services/api';
import constant from '../../services/config/constant';
import Snackbar from 'react-native-snackbar';
import Log from '../../utility/log';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AuthParams} from '../../navigation/stacks/authStack';
import {BackHandler} from 'react-native';
import params from '../../services/config/params';
import {calculateGst} from '../../utility/functions/commonFunctions/gstCalculation';
import {capitalizeFirstLetter} from '../../utility/validation/stringValidation';
import {useAppSelector} from '../../services/config/redux/useReduxHooks';

const couponListController = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<AuthParams, 'couponList'>>();
  const {cityData, token} = useAppSelector(state => state.UserReducer);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [list, setList] = useState<any>([]);
  const routeData = route?.params?.data;

  useEffect(() => {
    // getCouponList();
    getCoupons();
    setLoading(true);
  }, [cityData]);

  useEffect(() => {
    const backAction = () => {
      onBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const refreshCall = () => {
    setRefreshing(true);
    getCoupons();
    // getCouponList();
  };

  const onBack = () => {
    navigation.navigate('payment', {
      ...routeData,
      staticCoupon: routeData?.staticCoupon,
      finalAmount: routeData?.finalAmount,
      finalAmountFNB: routeData?.finalAmountFNB,
    });
  };

  const getCouponList = async () => {
    /* API call for getting coupon List */
    setLoading(true);
    try {
      const {data} = await axiosInstance.get(
        `${constant.coupons}/${cityData?._id}`,
        {
          headers: {auth: token},
        },
      );
      const couponIds: any = [];
      const regions: any = data?.data;
      for (const region in regions) {
        const cinemas = regions[region];
        for (const cinema in cinemas) {
          const languages = cinemas[cinema];
          for (const language in languages) {
            const coupons = languages[language];
            coupons.forEach((coupon: any) => {
              coupon.cinemaObjectId.forEach((cinemaObj: any) => {
                couponIds.push({
                  cinema: cinema,
                  cinemaId: cinemaObj?._id,
                  language: language,
                  couponId: coupon.couponId,
                  couponTitle: coupon.couponTitle,
                  discount: coupon.discount,
                  discountType: coupon.discountType,
                  couponUpTo: coupon?.couponUpTo,
                  couponCategory: coupon?.couponCategory,
                  mergeWithAnotherCoupon:
                    coupon?.advancedSettings?.mergeWithAnotherCoupon,
                  autoApplyOnCheckOut:
                    coupon?.advancedSettings?.autoApplyOnCheckOut,
                  couponType: coupon.couponType,
                  payId: coupon._id,
                  couponFor: coupon?.couponFor,
                  region: region,
                  isSuccess: true,
                  disabled: false,
                });
              });
            });
          }
        }
      }
      const filterCoupons = couponIds
        .filter((item: any) => {
          let couponFor = item?.couponFor.includes('app');
          return (
            item?.language?.toLowerCase() ==
              routeData?.language?.toLowerCase() &&
            item?.region?.toLowerCase() == cityData?.region?.toLowerCase() &&
            item?.cinemaId == routeData?.id &&
            item?.couponCategory == 'Public' &&
            couponFor
          );
        })
        .map((row: any) => {
          return {
            ...row,
            disabled:
              routeData?.couponCodes?.includes(row?.couponTitle) ?? false,
          };
        });

      const uniqueData: any = [];
      const seen = new Set();
      filterCoupons.forEach((item: any) => {
        const identifier = `${item.cinemaId}-${item.couponId}-${item.region}`;
        if (!seen.has(identifier)) {
          seen.add(identifier);
          uniqueData.push(item);
        }
      });
      setList(uniqueData);
      setLoading(false);
      setRefreshing(false);
    } catch (e: any) {
      setLoading(false);
      setRefreshing(false);
      Snackbar.show({text: e?.response?.data?.message ?? e?.message});
    }
  };

  const getCoupons = () => {
    const formData = {
      deviceType: 'app',
      cinemaObjectId: routeData?.id,
      movieLanguage: capitalizeFirstLetter(routeData?.language ?? 'Hindi'),
      cityId: cityData?._id,
    };

    axiosInstance
      .post(constant.getCouponsByCityCinemaLanguage, formData, {
        headers: {auth: token},
      })
      .then(response => {
        const {data} = response.data;

        const finalData = data.map((row: any) => {
          const checkSpentAmount = !(
            routeData?.cartCalculation?.ticketCart.totalAfterDiscount >
              row?.assignCoupon.rangeOfSpent.spentForm &&
            routeData?.cartCalculation?.ticketCart.totalAfterDiscount <
              row?.assignCoupon.rangeOfSpent.spentTo
          );

          return {
            ...row,
            disabled:
              routeData?.couponCodes?.includes(row?.couponTitle) ?? false,
            eligible: checkSpentAmount,
          };
        });
        setList(finalData);
        setLoading(false);
        setRefreshing(false);
      })
      .catch(err => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  const onApplyCoupon = async (item: any) => {
    if (routeData?.couponCodes?.includes(item?.couponTitle)) {
      Snackbar.show({text: 'Coupon already applied'});
      return;
    }

    let filterItem = {
      ...item,
      finalAmount: routeData?.finalAmount,
      finalAmountFNB: routeData?.finalAmountFNB,
      disabled: true,
    };
    navigation.navigate('payment', {
      ...routeData,
      coupon: filterItem,
      appliedDiscount: routeData?.appliedDiscount,
      appliedDiscountFNB: routeData?.appliedDiscountFNB,
    });

    return;

    let totalAmount: number = 0;

    if (item.couponType == 'F&B') {
      const spentAmountFNB = routeData?.snacks.map((row: any) => {
        return row.price * row.quantity;
      });
      const FNBtotalAmount = spentAmountFNB.reduce(
        (a: any, b: any) => a + b,
        0,
      );
      // const FNBTotalGST = ((FNBtotalAmount ?? 0) * 5) / 100;
      const FNBTotalGST = calculateGst({
        price: FNBtotalAmount,
        gstPercentage: '5',
      });
      const totalAmountWithoutGST =
        FNBtotalAmount - FNBTotalGST - (routeData?.appliedDiscountFNB ?? 0);
      totalAmount = +totalAmountWithoutGST.toFixed(2);
    } else if (item.couponType == 'Cinema') {
      totalAmount = routeData?.movieTicketPrice;
    } else {
      totalAmount = 0;
      Snackbar.show({
        text: 'Coupon is not valid',
      });
      return;
    }

    const formData = {
      [params.couponTitle]: item?.couponTitle,
      [params.cityId]: cityData?._id,
      [params.cinemaObjectId]: item?.cinemaId,
      [params.movieLanguage]: item?.language,
      [params.userSpentAmount]: totalAmount,
      [params.couponType]: item?.couponType,
    };

    // setLoading(true);

    try {
      const {data} = await axiosInstance.post(constant.addCoupon, formData, {
        headers: {
          auth: token,
        },
      });
      setLoading(false);
      const validCoupon = data?.data;

      let filterItem = {
        ...item,
        finalAmount: routeData?.finalAmount,
        finalAmountFNB: routeData?.finalAmountFNB,
        disabled: true,
      };
      navigation.navigate('payment', {
        ...routeData,
        coupon: filterItem,
        appliedDiscount: routeData?.appliedDiscount,
        appliedDiscountFNB: routeData?.appliedDiscountFNB,
      });
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      Log('apply Coupon error', e);
      Snackbar.show({text: e?.response?.data?.message ?? e?.message});
    }
  };

  return {list, loading, refreshing, refreshCall, onApplyCoupon, onBack};
};

export default couponListController;
