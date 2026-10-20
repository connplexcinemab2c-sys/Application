import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import RazorPayCheckout from 'react-native-razorpay';
import Snackbar from 'react-native-snackbar';
import useSeatTimer from '../../hooks/useSeatTimer';
import {axiosInstance} from '../../services/api/api';
import constant from '../../services/config/constant';
import params from '../../services/config/params';
import {useAppSelector} from '../../services/config/redux/useReduxHooks';
import {crypt} from '../../utility/functions/comman';
import {calculateGst} from '../../utility/functions/commonFunctions/gstCalculation';
import Log from '../../utility/log';
import {capitalizeFirstLetter} from '../../utility/validation/stringValidation';
import validationMessage from '../../utility/validation/validationMessage';
const paymentController = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<any>>();
  const {cityData, token, userData} = useAppSelector(
    state => state.UserReducer,
  );
  const flag = route?.params?.flag;
  const details: any = route?.params;
  let coupon = route?.params?.coupon;

  const selectedSeatTime = route?.params?.selectedSeatTime;
  const [sessionTime, setSessionTime] = useState<any>();

  const [expiredModal, setExpiredModal] = useState(false);
  const appliedDiscount = route?.params?.appliedDiscount;
  const appliedDiscountFNB = route?.params?.appliedDiscountFNB;
  const transactionId = route?.params?.transactionId;
  const cinemaName = route?.params?.cinemaName;
  const [cartCalculation, setCartCalculation] = useState<any>({});
  const [modal, setModal] = useState<boolean>(true);
  const [cancelModal, setCancelModal] = useState<boolean>(false);
  const [cancelSpinner, setCancelSpinner] = useState<boolean>(false);
  const [transactionModal, setTransactionModal] = useState<boolean>(false);
  const [transactionError, setTransactionError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [movieDetails, setMovieDetails] = useState<any>();
  const [more, setMore] = useState<any>({food: false, fees: false});
  const [snacks, setSnacks] = useState<any>([]);
  const [couponCode, setCouponCode] = useState<string>();
  const [convenienceFees, setConvenienceFees] = useState<number>(0);
  const [ticketCGST, setTicketCGST] = useState<number>(0);
  const [ticketSGST, setTicketSGST] = useState<number>(0);
  const [CGST3D, setCGST3D] = useState<number>(0);
  const [SGST3D, setSGST3D] = useState<number>(0);
  const [sectionType, setSectionType] = useState<string>();
  const [uri, setUri] = useState<string>('');
  const [paymentModal, setPaymentModal] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [cinemaData, setCinemaData] = useState<any>([]);
  const [pricePackage, setPricePackage] = useState<string | undefined>('Y');
  const [load, setLoad] = useState<boolean>(false);
  const [isNumberVisible, setIsNumberVisible] = useState<boolean>(false);
  const [couponData, setCouponData] = useState<any>(undefined);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [checkPromo, setCheckPromo] = useState<boolean>(false);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [staticCouponData, setStaticCouponData] = useState<Array<any>>([]);
  const [checkData, setCheckData] = useState([]);
  const [isAutoApplied, setIsAutoApplied] = useState(true);
  const [couponCodes, setCouponCodes] = useState<Array<string>>([]);
  const [notValidCoupon, setNotValidCoupon] = useState<string[]>([]);
  const [isAppliedCoupons, setIsAppliedCoupons] = useState<any[]>([]);
  const [cinemaGSTToolTip, setCinemaGSTToolTip] = useState<boolean>(false);
  const [fnbGSTToolTip, setFnbGSTToolTip] = useState<boolean>(false);
  const [reCalculate, setReCalculate] = useState<boolean>(true);
  const [isRemoved, setIsRemoved] = useState<boolean>(false);
  const [isTaxVisible, setIsTaxVisible] = useState<boolean>(false);
  const [allFoodData, setAllFoodData] = useState<any>([]);
  const [rewardPoints, setRewardPoints] = useState<number>(0);
  const [rewardModal, setRewardModal] = useState<boolean>(false);
  const [selectedRewardPoints, setSelectedRewardPoints] = useState<number>(0);
  const [appliedRewardPoints, setAppliedRewardPoints] = useState<number>(0);
  const [spinnerLoading, setSpinnerLoading] = useState<boolean>(false);
  const [stopPayment, setStopPayment] = useState<boolean>(false);
  const spentAmountFNB = snacks.map((row: any) => {
    const price = Number(row.price).toFixed(2);
    return Number(price) * row.quantity;
  });
  const FNBTotal = spentAmountFNB.reduce((a: any, b: any) => a + b, 0);

  const totalFNBQuantity =
    snacks.length > 0
      ? snacks.reduce((sum: any, item: any) => sum + (item.quantity || 0), 0)
      : 0;

  // const FNBTotalGST = ((FNBTotal ?? 0) * 5) / 100;
  const FNBTotalGST = calculateGst({
    price: FNBTotal,
    gstPercentage: '5',
  });
  const FNBWOGST: any = (FNBTotal - FNBTotalGST).toFixed(2);

  const CGST =
    pricePackage == 'Y'
      ? (ticketCGST * details?.totalTicket) / 100
      : ticketCGST * details?.totalTicket;
  const SGST =
    pricePackage == 'Y'
      ? (ticketSGST * details?.totalTicket) / 100
      : ticketSGST * details?.totalTicket;
  const ticketPrice = details?.ticketPrice - CGST - SGST;

  const total = snacks
    ?.map((item: any) => item?.price * item.quantity)
    ?.reduce((acc: number, current: number) => acc + current, 0);
  const totalAmount =
    details?.ticketPrice + total + convenienceFees * details?.totalTicket;
  const discountableAmount =
    couponData?.couponType == 'Cinema' ? ticketPrice.toFixed(2) : +FNBWOGST;
  let discountUpto = (+discountableAmount * couponData?.discount) / 100;

  let discount: any = 0;
  let discountMerge: any = 0;
  let FNBDiscount: any = 0;
  let FNBDiscountMerge: any = 0;

  let finalAmount: any;

  if (couponData) {
    if (couponData?.discountType == 'flat') {
      if (couponData?.couponType == 'Cinema') {
        discount = couponData?.discount;
      } else {
        FNBDiscount = couponData?.discount;
      }
    } else if (couponData?.couponUpTo > discountUpto) {
      if (couponData?.couponType == 'Cinema') {
        discount = discountUpto;
      } else {
        FNBDiscount = discountUpto;
      }
    } else {
      if (couponData?.couponType == 'Cinema') {
        discount = couponData?.couponUpTo;
      } else {
        FNBDiscount = couponData?.couponUpTo;
      }
    }
  }

  //
  else if (staticCouponData?.length > 0) {
    if (staticCouponData?.length == 1) {
      const discountableAmount =
        staticCouponData[0]?.couponType == 'Cinema'
          ? ticketPrice.toFixed(2)
          : FNBWOGST;

      let multipleDiscountUpto: any =
        (+discountableAmount * staticCouponData[0]?.discount) / 100;
      const flatDisUpto =
        discountableAmount >= staticCouponData[0]?.discount
          ? staticCouponData[0]?.discount
          : discountableAmount;

      if (staticCouponData[0]?.discountType == 'flat') {
        if (staticCouponData[0]?.couponType == 'Cinema') {
          discount = flatDisUpto;
        } else {
          FNBDiscount = flatDisUpto;
        }
      } else if (staticCouponData[0]?.discountType == '%') {
        if (
          parseFloat(staticCouponData[0]?.couponUpTo) >
          parseFloat(multipleDiscountUpto)
        ) {
          if (staticCouponData[0]?.couponType == 'Cinema') {
            discount = multipleDiscountUpto;
          } else {
            FNBDiscount = multipleDiscountUpto;
          }
        } else {
          if (staticCouponData[0]?.couponType == 'Cinema') {
            discount = staticCouponData[0]?.couponUpTo;
          } else {
            FNBDiscount = staticCouponData[0]?.couponUpTo;
          }
        }
      }
    } else {
      let multipleDiscountUpto =
        (staticCouponData[1]?.finalAmount * staticCouponData[1]?.discount) /
        100;

      let multipleFNBDiscountUpto =
        (staticCouponData[1]?.finalAmountFNB * staticCouponData[1]?.discount) /
        100;

      const checkUptoDiscount =
        staticCouponData[1]?.couponType == 'Cinema'
          ? multipleDiscountUpto
          : multipleFNBDiscountUpto;

      if (staticCouponData[1]?.discountType == 'flat') {
        if (staticCouponData[1]?.couponType == 'Cinema') {
          discountMerge = staticCouponData[1]?.discount;
          discount = appliedDiscount
            ? appliedDiscount
            : staticCouponData[1]?.appliedDiscount;
          if (snacks.length > 0) {
            FNBDiscount = appliedDiscountFNB
              ? appliedDiscountFNB
              : staticCouponData[1]?.appliedDiscountFNB;
          }
        } else {
          FNBDiscountMerge = staticCouponData[1]?.discount;
          discount = appliedDiscount
            ? appliedDiscount
            : staticCouponData[1]?.appliedDiscount;
          if (snacks.length > 0) {
            FNBDiscount = appliedDiscountFNB
              ? appliedDiscountFNB
              : staticCouponData[1]?.appliedDiscountFNB;
          }
        }
      } else if (staticCouponData[1]?.couponUpTo > checkUptoDiscount) {
        if (staticCouponData[1]?.couponType == 'Cinema') {
          discountMerge = checkUptoDiscount;
          discount = appliedDiscount
            ? appliedDiscount
            : staticCouponData[1]?.appliedDiscount;
          if (snacks.length > 0) {
            FNBDiscount = appliedDiscountFNB
              ? appliedDiscountFNB
              : staticCouponData[1]?.appliedDiscountFNB;
          }
        } else {
          FNBDiscountMerge = checkUptoDiscount;
          discount = appliedDiscount
            ? appliedDiscount
            : staticCouponData[1]?.appliedDiscount;
          if (snacks.length > 0) {
            FNBDiscount = appliedDiscountFNB
              ? appliedDiscountFNB
              : staticCouponData[1]?.appliedDiscountFNB;
          }
        }
      } else {
        if (staticCouponData[1]?.couponType == 'Cinema') {
          discountMerge = staticCouponData[1]?.couponUpTo;
          discount = appliedDiscount
            ? appliedDiscount
            : staticCouponData[1]?.appliedDiscount;
          if (snacks.length > 0) {
            FNBDiscount = appliedDiscountFNB
              ? appliedDiscountFNB
              : staticCouponData[1]?.appliedDiscountFNB;
          }
        } else {
          FNBDiscountMerge = staticCouponData[1]?.couponUpTo;
          discount = appliedDiscount
            ? appliedDiscount
            : staticCouponData[1]?.appliedDiscount;
          if (snacks.length > 0) {
            FNBDiscount = appliedDiscountFNB
              ? appliedDiscountFNB
              : staticCouponData[1]?.appliedDiscountFNB;
          }
        }
      }
    }
  } else {
  }

  finalAmount = Number(totalAmount) - Number(discount);
  const timeLeft = useSeatTimer(sessionTime);

  useEffect(() => {
    if (timeLeft == 'Time expired') {
      setPaymentModal(false);
      setModal(false);
      setCancelModal(false);
      setTransactionModal(false);
      setPaymentModal(false);

      setTimeout(() => {
        setExpiredModal(true);
      }, 300);
    }
  }, [timeLeft]);

  useEffect(() => {
    getSession();
    getMoviesDetails();
    getShowTiming();
    getFoodAndBeverages();
    getRewardBalance();
    getSiteSetting();
  }, []);

  // useEffect(() => {
  //   if (!isAutoApplied && !modal) {
  //     getCouponList();
  //   }
  // }, [modal, isAutoApplied]);

  useEffect(() => {
    //@ts-ignore
    navigation.addListener('beforeRemove', nav => {
      // Prevent going back on swipe
      if (nav.data.action.type === 'GO_BACK' && !nav.data.action.source) {
        nav.preventDefault();
      }
    });
  }, [navigation]);

  const refreshCall = () => {
    calculateCartValue();
    getSiteSetting();
  };

  const getFoodAndBeverages = async () => {
    try {
      setLoading(true);
      let {data} = await axiosInstance.get(
        `${constant.getFoodAndBeverages}${details?.id}`,
      );

      data?.data?.map((item: any) => ({
        itemPrice: (item?.itemPrice / 100) * 1.05,
      }));
      setAllFoodData(data?.data);

      const list = data?.data?.map((item: any) => ({
        id: item?.itemId,
        image: item?.poster,
        name: item?.itemDescription,
        price: item?.itemPrice / 100 + (5 / 100) * (item?.itemPrice / 100),
        itemPrice: item?.itemPrice / 100 + (5 / 100) * (item?.itemPrice / 100),
        quantity: 0,
        type: item?.type,
      }));

      setLoading(false);
      Log('food and beverages', data);
    } catch (error: any) {
      setLoading(false);
      Snackbar.show({text: error?.response?.data?.message ?? error?.message});
      Log('food and beverages error', error?.response?.data);
    }
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
      const filterCoupons = couponIds.filter((item: any) => {
        let couponFor = item?.couponFor.includes('app');
        return (
          item?.language?.toLowerCase() ==
            route?.params?.language?.toLowerCase() &&
          item?.region?.toLowerCase() == cityData?.region?.toLowerCase() &&
          item?.cinemaId == route?.params?.id &&
          couponFor
        );
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
      setCheckData(uniqueData);
      let filterPublic = uniqueData.filter((st: any) => {
        return st.couponCategory == 'Public';
      });
      setCheckData(uniqueData);
      let autoApplyData = filterPublic.filter((item: any) => {
        if (snacks.length == 0) {
          return item?.autoApplyOnCheckOut != 0 && item?.couponType != 'F&B';
        } else {
          return item?.autoApplyOnCheckOut != 0;
        }
      });
      let totalDiscount = 0;
      let maxDiscount = autoApplyData.map((coupon: any) => {
        const totalAmountAutoApply =
          coupon.couponType == 'Cinema' ? ticketPrice : FNBWOGST;

        let checkDiscount =
          (totalAmountAutoApply * parseFloat(coupon.discount)) / 100;
        if (coupon.discountType === 'flat') {
          totalDiscount = parseFloat(coupon.discount);
        } else if (coupon.discountType === '%') {
          if (coupon.couponUpTo > checkDiscount) {
            totalDiscount = checkDiscount;
          } else {
            totalDiscount = coupon.couponUpTo;
          }
          // totalDiscount = (totalAmount * parseFloat(coupon.discount)) / 100;
        }
        return {
          ...coupon,
          discountAmount: totalDiscount,
          finalAmount: ticketPrice - discount,
          finalAmountFNB: FNBWOGST - FNBDiscount,
        };
      });
      const highestCoupon = maxDiscount.reduce(
        (max: any, coupon: any) =>
          Number(coupon.discountAmount) > Number(max.discountAmount)
            ? coupon
            : max,
        maxDiscount[0],
      );

      if (highestCoupon) {
      } else {
        setLoading(false);
        setRefreshing(false);
      }

      // if (highestCoupon) {
      //   if (highestCoupon?.mergeWithAnotherCoupon == 1) {
      //     let temp = [...staticCouponData];
      //     temp.push(highestCoupon);
      //     setStaticCouponData(temp);
      //     setIsAutoApplied(true);
      //   } else {
      //     setStaticCouponData([]);
      //     setIsAutoApplied(false);
      //     setCouponData(highestCoupon);
      //   }
      // }
    } catch (e: any) {
      Log('Coupon List error', e);
      setLoading(false);
      setRefreshing(false);
      Snackbar.show({text: e?.response?.data?.message ?? e?.message});
    }
  };

  const getSiteSetting = async () => {
    try {
      const {data} = await axiosInstance.get(constant.getsiteSetting);
      console.log('data site setting', data?.data);
      setStopPayment(data?.data?.stopPayment);
    } catch (error) {
      console.log('error site settting', error);
    }
  };

  useEffect(() => {
    // if (couponCodes.includes(coupon?.couponTitle)) {
    //   return;
    // }

    if (coupon) {
      setCouponCodes([...couponCodes, coupon?.couponTitle]);
      setReCalculate(true);
    }
  }, [coupon]);

  const onMoreFood = (): void => {
    if (more.food === true) {
      more.food = false;
    } else {
      more.food = true;
    }
    setMore({...more});
  };

  const onMoreFees = (): void => {
    if (more.fees === true) {
      more.fees = false;
    } else {
      more.fees = true;
    }
    setMore({...more});
  };

  const onSnacks = (data: any): void => {
    setSnacks(data);
  };

  const getMoviesDetails = async () => {
    /* API call for getting movie details */
    try {
      const params = {
        movieId: route?.params?.movieId,
        userId: userData?._id,
      };
      const {data} = await axiosInstance.get(constant.movieDetails, {
        params: params,
      });
      setMovieDetails(data?.data);
    } catch (error: any) {
      Snackbar.show({text: error?.response?.data?.message});
    }
  };

  const getShowTiming = async () => {
    /* API call for getting show timing */
    try {
      const formData = {
        id: `${details?.id}|${moment(details?.time).format('YYYY-MM-DD')}|${
          details?.movieId
        }`,
      };
      const {data} = await axiosInstance.post(constant.getShowTime, formData);
      setCinemaData(data?.cinema);
      setConvenienceFees(data?.cinema?.convenienceFees);
      const pGroupCode = data?.data?.filter(
        (item: any) => item?.sessionRealShow === details?.time,
      )[0]?.pGroupCode;
      getPriceDetails(pGroupCode, data?.data[0]?.cinemaId);
    } catch (error: any) {
      Snackbar.show({text: error?.response?.data?.message});
    }
  };

  const getPriceDetails = async (pGroupCode: any, cinemaId: string) => {
    /* API call for getting price details */
    try {
      const priceDetailsUrl = `${constant.priceDetails}/${pGroupCode}/${cinemaId}?showTime=${details?.time}`;
      const {data} = await axiosInstance.get(priceDetailsUrl);
      const list = data?.data?.filter(
        (item: any) => item?.areaCatCode === details?.areaCatCode,
      )[0];

      setTicketCGST(list?.priceTax1);
      setTicketSGST(list?.priceTax2);
      setCGST3D(list?.priceTax3);
      setSGST3D(list?.priceTax4);
      setSectionType(list?.tTypeDescription);
      setPricePackage(list?.pricePackage);
    } catch (error: any) {
      Snackbar.show({text: error?.response?.data?.message});
    }
  };

  const cancelTransaction = async (flag: string) => {
    try {
      if (flag == 'Expired') {
        setExpiredModal(false);
        navigation.navigate('homeScreen');
        return;
      }
      setCancelSpinner(true);

      if (flag === 'yes' && isAppliedCoupons?.length > 0) {
        try {
          await Promise.all(
            isAppliedCoupons.map((item: any) => onCouponCall(item)),
          );
        } catch (e) {
          Snackbar.show({text: 'Failed to remove coupon. Please try again.'});
          setCancelSpinner(false);
          return;
        }
      }

      const {data} = await axiosInstance.get(
        `${constant.cancelSeat}/${cinemaName}/${transactionId}`,
      );
      setCancelSpinner(false);
      if (flag === 'yes') {
        if (data?.data?.Status === '1') {
          setCancelModal(false);

          setTimeout(() => {
            //@ts-ignore
            if (flag === 'theatreSeats') {
              navigation.navigate('theatreSeats', {
                movieId: route?.params?.movieId,
              });
            } else {
              navigation.goBack();
            }
          }, 300);

          Snackbar.show({text: data?.message});
        } else {
          Snackbar.show({text: 'Failed to cancel transaction.'});
        }
      } else {
        setTransactionModal(false);
        navigation.goBack();
      }

      Log('cancellation response', data);
    } catch (error: any) {
      setCancelSpinner(false);
      setTransactionModal(false);
      Snackbar.show({text: error?.response?.data?.message ?? error?.message});
      Log('cancellation error', error?.response?.data);
    }
  };

  const getRewardBalance = async () => {
    try {
      const {data} = await axiosInstance.get(constant.rewardBalance, {
        headers: {
          auth: token,
        },
      });
      console.log('reward balance:', data?.data);
      setRewardPoints(data?.data?.availableCoins);
      setAppliedRewardPoints(data?.data?.availableCoins);
    } catch (error) {
      console.log('error', error);
    }
  };

  // const cancelTransaction = async (flag: string) => {
  //   try {
  //     setCancelSpinner(true);

  //     const {data} = await axiosInstance.get(
  //       `${constant.cancelSeat}/${cinemaName}/${transactionId}`,
  //     );

  //     setCancelSpinner(false);
  //     if (flag == 'yes') {
  //       if (data?.data?.Status === '1') {
  //         setCancelModal(false);

  //         //@ts-ignore
  //         if (flag === 'theatreSeats') {
  //           navigation.navigate('theatreSeats', {
  //             movieId: route?.params?.movieId,
  //           });
  //         } else {
  //           navigation.goBack();
  //         }
  //         Snackbar.show({text: data?.message});
  //       }
  //     } else {
  //       setTransactionModal(false);
  //       navigation.goBack();
  //     }
  //     Log('cancellation response', data);
  //   } catch (error: any) {
  //     setCancelSpinner(false);
  //     setTransactionModal(false);
  //     Snackbar.show({text: error?.response?.data?.message ?? error?.message});
  //     Log('cancellation error', error?.response?.data);
  //   }
  // };

  // const commitPayment = async (orderId: string, response: any) => {
  //   /* API call for committing payment */
  //   const formData = {
  //     razorpay_order_id: orderId,
  //     razorpay_payment_id: response?.razorpay_payment_id,
  //     razorpay_signature: response?.razorpay_signature,
  //   };
  //   try {
  //     setLoading(true);
  //     const {data} = await axiosInstance.post(constant.commitPayment, formData);
  //     setLoading(false);
  //     if (data) {
  //       navigation.navigate('movieTicket', {transactionId: transactionId});
  //     }
  //   } catch (error: any) {
  //     setLoading(false);
  //     Snackbar.show({text: error?.response?.data?.message});
  //   }
  // };

  const createOrder = async () => {
    // setError(undefined);
    let selectedCouponIds = null;
    if (staticCouponData?.length > 0) {
      selectedCouponIds = staticCouponData?.map(item => {
        return item?.payId;
      });
    } else if (couponData) {
      selectedCouponIds = couponData?.payId;
    }

    if (userData?.mobileNumber) {
      try {
        setLoading(true);

        const orderDetails = `${transactionId}|${cinemaName}|${
          details?.movieSessionId
        }|${userData?._id}|${details?.areaCatCode}|${details?.totalTicket}|${
          details?.pGroupCode
        }|${snacks?.length ? true : false}|${appliedRewardPoints}${
          Platform.OS === 'android' ? 'Android' : 'iOS'
        }`;

        const formData = new URLSearchParams();
        formData.append('id', crypt('testText123', orderDetails));
        const {data} = await axiosInstance.post(
          constant.ccavRequestHandler,
          formData?.toString(),
        );
        console.log('data ccavRequestHandler', data?.data);
        razorPay(
          data?.data?.razorpayOrderId,
          data?.data?.keyId,
          data?.data?.currency,
          data?.data?.amount,
          data?.data?.cinemaId,
        );
        // if (cartCalculation?.finalAmount <= 0) {
        //   navigation.navigate('movieTicket', {transactionId: transactionId});
        //   setLoading(false);
        //   return;
        // }
        // setUri(data);
        // setLoading(false);
        // setPaymentModal(true);
        // Log('payment response', data);
      } catch (error: any) {
        setLoading(false);
        Snackbar.show({text: error?.response?.data?.message ?? error?.message});
        Log('payment error', error?.response);
      }
    } else {
      setIsNumberVisible(true);
      setLoading(false);
    }
  };

  const razorPay = (
    orderId: any,
    razorPayKey: string,
    currency: any,
    amount: any,
    cinemaId: string,
  ) => {
    var options: any = {
      description: 'Connplex Mobile Application',
      key: razorPayKey,
      currency: currency,
      amount: amount,
      name: 'Connplex Smart Theatre',
      order_id: orderId,
      prefill: {
        contact: `+91${userData?.mobileNumber}`,
        name: `${userData?.firstName}`,
      },
      theme: {
        color: '#191510',
      },
    };
    RazorPayCheckout.open(options)
      .then(data => {
        ccavResponseHandler(data, cinemaId);
      })
      .catch(error => {
        setLoading(false);
        let errorText =
          Platform.OS === 'ios'
            ? error?.description
            : JSON.parse(error?.description)?.error?.description;
        setTransactionError(errorText);
        setTransactionModal(true);
      });
  };

  const ccavResponseHandler = async (
    razorPayResponse: any,
    cinemaId: string,
  ) => {
    try {
      const formData = {
        razorpay_payment_id: razorPayResponse.razorpay_payment_id,
        razorpay_order_id: razorPayResponse.razorpay_order_id,
        razorpay_signature: razorPayResponse.razorpay_signature,
        transId: transactionId,
        cinemaId: cinemaId,
        sessionId: details?.movieSessionId,
        userId: userData?._id,
        appliedRewardPoints: appliedRewardPoints,
        paymentStatus: 'success',
      };
      console.log('formdata::', formData);
      const {data} = await axiosInstance.post(
        constant.ccavResponseHandler,
        formData,
        {
          headers: {
            auth: token,
          },
        },
      );
      setLoading(false);
      navigation.navigate('movieTicket', {transactionId: transactionId});
    } catch (error) {
      setLoading(false);
      console.log('error', error);
      Snackbar.show({text: 'Something went wrong', duration: 3000});
    }
  };

  const onCancelPayment = (): void => {
    setTimeout(() => {
      setPaymentModal(false);
    }, 300);
    setTransactionModal(true);
  };

  const onSuccessPayment = (): void => {
    setPaymentModal(false);
    navigation.navigate('movieTicket', {transactionId: transactionId});
  };

  const onFailPayment = (): void => {
    setPaymentModal(false);
    navigation.navigate('paymentFail', {
      transactionId: transactionId,
      screen: 'payment',
    });
  };

  const onCouponCode = () => {
    const applyCodes = isAppliedCoupons?.map(item => {
      return item?.couponTitle;
    });

    if (!couponCode) {
      setError(validationMessage.emptyCouponCode);
    } else if (applyCodes?.includes(couponCode)) {
      Snackbar.show({text: 'Coupon Already Applied'});
      setCouponCode('');
      setError(undefined);
    } else {
      setError(undefined);
      setCouponCodes([...couponCodes, couponCode]);
      setReCalculate(true);
      setIsLoad(true);
      // checkCouponCall();
    }
  };

  const onBackModal = async () => {
    try {
      setLoad(true);
      const {data} = await axiosInstance.get(
        `${constant.cancelSeat}/${cinemaName}/${transactionId}`,
      );
      setTimeout(() => {
        setModal(false);
      }, 200);
      setLoad(false);
      navigation.goBack();
      Log('cancellation response', data);
    } catch (error: any) {
      setTimeout(() => {
        setModal(false);
      }, 200);
      setLoad(false);
      navigation.goBack();
      Log('cancellation error', error?.message);
    }
  };

  const onApplyCall = () => {
    setError(undefined);
    setCouponCode('');
    setCheckPromo(false);
    let selectedCouponIds = staticCouponData?.map(item => {
      return item?.couponId;
    });

    const applyCodes = isAppliedCoupons?.map(item => {
      return item?.couponTitle;
    });

    let data = {
      ...route?.params,
      movieTicketPrice: ticketPrice.toFixed(2),
      snacks: snacks,
      coupon: couponData,
      staticCoupon: staticCouponData,
      selectedCouponIds: selectedCouponIds,
      isSuccess: false,
      language: capitalizeFirstLetter(movieDetails?.languages),
      finalAmount: ticketPrice - discount,
      finalAmountFNB: FNBWOGST - FNBDiscount,
      appliedDiscount: discount,
      appliedDiscountFNB: FNBDiscount,
      couponCodes: applyCodes,
      cartCalculation: cartCalculation,
    };
    navigation.navigate('couponList', {data});
  };

  const onCouponCall = (title: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setError(undefined);
      setCouponCode('');
      setCheckPromo(false);

      const fromData = {
        transId: transactionId,
        couponCode: title,
        cinemaId: route?.params?.id,
      };

      axiosInstance
        .post(constant.removeCartCoupon, fromData, {
          headers: {
            auth: `${token}`,
          },
        })
        .then(res => {
          setCouponCodes([]);
          setReCalculate(true);
          setIsRemoved(true);
          Snackbar.show({text: 'Coupon Removed Successfully'});
          resolve();
        })
        .catch(e => {
          Snackbar.show({text: e?.response?.data?.message});
          reject(e);
        });
    });
  };

  // const onCouponCall = (title: string) => {

  //   setError(undefined);
  //   setCouponCode('');
  //   setCheckPromo(false);

  //   const fromData = {
  //     transId: transactionId,
  //     couponCode: title,
  //     cinemaId: route?.params?.id,
  //   };

  //   axiosInstance
  //     .post(constant.removeCartCoupon, fromData, {
  //       headers: {
  //         auth: `${token}`,
  //       },
  //     })
  //     .then(res => {
  //       setCouponCodes([]);
  //       Snackbar.show({
  //         text: `Coupon Removed Successfully`,
  //       });
  //       setReCalculate(true);
  //       setIsRemoved(true);
  //     })
  //     .catch(e => {
  //       console.log('Err', e.response);
  //       Snackbar.show({
  //         text: e?.response?.data?.message,
  //       });
  //       cancelTransaction('yes');
  //     });
  // };

  const onSkipModal = () => {
    setTimeout(() => {
      setModal(false);
    }, 300);
  };

  const checkCouponCall = () => {
    if (staticCouponData?.length > 0) {
      let checkCoupon = staticCouponData?.filter(
        item => item?.couponTitle == couponCode,
      );
      if (checkCoupon?.length > 0) {
        Snackbar.show({text: 'Coupon Already Applied'});
      } else {
        onApplyCoupon();
      }
    } else if (couponData) {
      let checkCoupon = couponData.couponTitle == couponCode;
      if (checkCoupon) {
        Snackbar.show({text: 'Coupon Already Applied'});
      } else {
        onApplyCoupon();
      }
    } else {
      onApplyCoupon();
    }
  };

  const onApplyCoupon = async () => {
    /** Apply For Franchise Api call */
    let couponType = 'cinema';
    let couponCategory = 'Public';
    if (checkData?.length > 0) {
      const findCouponTypefromCoupon: any = checkData.find(
        (row: any) => row.couponTitle == couponCode,
      );
      couponType = findCouponTypefromCoupon?.couponType;
      couponCategory = findCouponTypefromCoupon?.couponCategory;
    }

    const spentAmount =
      couponType == 'Cinema' ? ticketPrice - discount : FNBWOGST - FNBDiscount;

    const formData = {
      [params.couponTitle]: couponCode,
      [params.cityId]: cityData?._id,
      [params.cinemaObjectId]: movieDetails?.cinemaObjectId,
      [params.movieLanguage]: capitalizeFirstLetter(movieDetails?.languages),
      [params.userSpentAmount]: spentAmount,
      [params.couponType]: couponType,
    };
    if (!couponType) {
      Snackbar.show({
        text: 'Coupon is not valid',
      });
      return;
    }

    setIsLoad(true);

    try {
      const {data} = await axiosInstance.post(constant.addCoupon, formData, {
        headers: {
          auth: token,
        },
      });

      setIsLoad(false);
      setCouponCode('');
      let json = data?.data;

      const tempData = {
        cinema: json?.cinemaObjectId[0]?.cinemaName,
        cinemaId: json?.cinemaObjectId[0]?._id,
        language: capitalizeFirstLetter(movieDetails?.languages),
        couponId: json?.couponId,
        couponTitle: couponCode,
        discount: json?.discount,
        discountType: json?.discountType,
        couponUpTo: json?.couponUpTo,
        mergeWithAnotherCoupon: json?.advancedSettings?.mergeWithAnotherCoupon,
        autoApplyOnCheckOut: json?.advancedSettings?.autoApplyOnCheckOut,
        couponType: json?.couponType,
        payId: json?._id,
        couponFor: json?.couponFor,
        couponCategory: json?.couponCategory,
        finalAmount: ticketPrice - discount,
        finalAmountFNB: FNBWOGST - FNBDiscount,
        appliedDiscount: discount,
        appliedDiscountFNB: FNBDiscount,
        region: '',
        isSuccess: true,
        disabled: true,
      };
      if (couponCategory == 'Private') {
        setStaticCouponData([...staticCouponData, tempData]);
        // setStaticCouponData([]);
        // setCouponData(tempData);
      } else {
        if (tempData?.mergeWithAnotherCoupon == 0) {
          // if (staticCouponData?.length > 0) {
          //   let temp = [...staticCouponData];
          //   temp.push(coupon);
          //   setStaticCouponData(temp);
          // } else {
          setStaticCouponData([]);
          setCouponData(tempData);
          // }
        } else {
          let temp: any = [];
          if (staticCouponData?.length > 0) {
            temp = [...staticCouponData];
            temp.push(tempData);
            if (temp?.length > 2) {
              Snackbar.show({text: 'Not able to coupon!'});
            } else {
              setStaticCouponData(temp);
            }
          } else {
            temp.push(tempData);
            setStaticCouponData(temp);
          }
        }
      }
      setCheckPromo(true);
    } catch (e: any) {
      setIsLoad(false);
      setCouponCode('');
      setCheckPromo(false);
      Log('apply Coupon errors', e);
      Snackbar.show({text: e?.response?.data?.message ?? e?.message});
    }
  };

  useEffect(() => {
    if (!modal && reCalculate) {
      calculateCartValue();
    }
  }, [modal, reCalculate]);

  const calculateCartValue = (rewardCoins?: any) => {
    const removeDuplicateCode = couponCodes?.filter(
      (value, index) => couponCodes.indexOf(value) === index,
    );
    const lastCoupon = removeDuplicateCode[removeDuplicateCode.length - 1];

    if (rewardCoins) {
      // setSpinnerLoading(true);
    }

    setLoading(true);

    const selectedSnacks = snacks?.map((item: any, index: number) => {
      const {id, ...rest} = item; // Remove 'id'
      return {
        ...rest,
        index: index,
        itemPrice: Number(Number(item.price).toFixed(2)),
      };
    });

    const formData: any = {
      coupons: removeDuplicateCode,
      cityId: cityData?._id,
      cinemaObjectId: route?.params?.id, // Static cinema id
      movieLanguage: capitalizeFirstLetter(route?.params?.language ?? 'HINDI'),
      ticketTotal: Number(route?.params?.ticketPrice).toFixed(0),
      fnbprice: Number(FNBTotal).toFixed(2),
      autoApply: isAutoApplied,
      transId: transactionId,
      userTicketSpentAmount:
        cartCalculation?.ticketCart?.totalAfterDiscount ?? 0,
      userFNBSpentAmount: cartCalculation?.foodCart?.totalAfterDiscount ?? 0,
      deviceType: 'app',
      selectedFood: selectedSnacks,
      // name: item.name,
      // quantity: item.quantity,
      // itemDescription: item.itemDescription,
      // itemMasterItemCode: item.itemMasterItemCode,
      // // price: Number(item.price).toFixed(2) * Number(item.quantity),
      // price: Number(item.price) * Number(item.quantity),

      quantity: details?.totalTicket,
      isCoupan: removeDuplicateCode?.length > 0 ? true : false,
      couponDetails: {
        cinema_id: route?.params?.id,
        // cinema_id: '0001',
        area_category_code: route?.params?.areaCatCode,
        show_date_time: moment(route?.params?.time).format(
          'YYYY-MM-DD HH:mm:ss',
        ),
        number_of_tickets: details?.totalTicket, // Ticket amount
        customer_name: `${userData?.firstName} ${userData?.lastName}`,
        filme_ho_code: route?.params?.filmCode, // Filmcode
        coupan_code: removeDuplicateCode, // Coupon code
        sale_channel: 1234, // Static
        total_ticket_amount: Number(route?.params?.ticketPrice), // Ticket amount
        total_concession_amount: Number(FNBTotal), // FNB amount
        total_inventory: Number(totalFNBQuantity), // FNB quantity
        work_station_code: 'W001', // Static
        user_id: '005', // Static
        type: 'VOUCHER', // Static
        post_date_time: moment().format('YYYY-MM-DD HH:mm:ss'),
        customer_number: `+91${userData?.mobileNumber}`,
      },
    };
    if (rewardCoins) {
      formData['rewardCoins'] = rewardCoins;
    }

    const encryptedData = crypt('testText123', JSON.stringify(formData));

    axiosInstance
      .post(
        constant.couponCart,
        {
          data: encryptedData,
        },
        {
          headers: {
            auth: token,
          },
        },
      )
      .then(res => {
        setSpinnerLoading(false);
        const {data, status} = res.data;
        console.log('coupon cart data:::', data);
        const isAppliedCoupons: Array<any> = data?.ticketCart?.coupons?.concat(
          data?.foodCart?.coupons,
        );

        const codes = isAppliedCoupons?.map((item: any) => item);
        const validCoupon = codes.includes(lastCoupon);
        if (!isRemoved) {
          if (validCoupon) {
            Snackbar.show({text: res.data?.message});
          } else if (isAppliedCoupons.length >= 0 && lastCoupon) {
            Snackbar.show({text: res.data?.message});
            // Snackbar.show({text: `${lastCoupon} Coupon Not Applied`});
          }
        }

        setCouponCodes(codes);
        setCartCalculation(data);
        setIsAppliedCoupons(isAppliedCoupons);
        setIsAutoApplied(false);
        setCouponCode('');
        setIsLoad(false);
        setLoading(false);
        coupon = undefined;
        navigation.setParams({coupon: undefined});
        setReCalculate(false);
        setIsRemoved(false);
      })
      .catch(e => {
        setSpinnerLoading(false);
        Snackbar.show({
          text: e?.response?.data?.message ?? e?.message,
        });

        setLoading(false);
        setIsLoad(false);
        setIsAutoApplied(false);
        setCouponCode('');
        navigation.setParams({coupon: undefined});
        coupon = undefined;
        setReCalculate(false);
        setIsRemoved(false);
      })
      .finally(() => {
        setSpinnerLoading(false);
        setLoading(false);
        setIsLoad(false);
      });
  };

  const getSession = async () => {
    try {
      const {data} = await axiosInstance.get(
        `${constant.bookingSession}/${route?.params?.sessionId}`,
        {
          headers: {
            auth: token,
          },
        },
      );
      setSessionTime(data?.data?.createdAt || '');
    } catch (e: any) {
      Snackbar.show({text: e?.response?.data?.message});
    }
  };

  const applyReward = () => {
    if (selectedRewardPoints == 0) {
      setRewardModal(false);
      return;
    }
    calculateCartValue(selectedRewardPoints);
    setAppliedRewardPoints(selectedRewardPoints);
    setRewardModal(false);
  };

  const removeReward = () => {
    calculateCartValue();
    setAppliedRewardPoints(rewardPoints);
    setSelectedRewardPoints(0);
  };

  return {
    setCouponCode,
    couponCode,
    createOrder,
    route,
    modal,
    setModal,
    cancelModal,
    setCancelModal,
    cancelSpinner,
    cancelTransaction,
    movieDetails,
    details,
    onSnacks,
    snacks,
    onMoreFood,
    onMoreFees,
    more,
    loading,
    setTransactionModal,
    transactionModal,
    transactionError,
    sectionType,
    ticketCGST,
    ticketSGST,
    convenienceFees,
    CGST3D,
    SGST3D,
    paymentModal,
    uri,
    onCancelPayment,
    onSuccessPayment,
    setTransactionError,
    onCouponCode,
    error,
    setError,
    onBackModal,
    cinemaData,
    pricePackage,
    onSkipModal,
    load,
    isNumberVisible,
    setIsNumberVisible,
    onCouponCall,
    coupon,
    couponData,
    isVisible,
    setIsVisible,
    checkPromo,
    isLoad,
    refreshing,
    refreshCall,
    staticCouponData,
    onApplyCall,
    total,
    totalAmount,
    finalAmount,
    discount,
    FNBTotal,
    discountableAmount,
    discountMerge,
    FNBDiscount,
    FNBDiscountMerge,
    cartCalculation,
    couponCodes,
    isAppliedCoupons,
    cinemaGSTToolTip,
    setCinemaGSTToolTip,
    fnbGSTToolTip,
    setFnbGSTToolTip,
    onFailPayment,
    isTaxVisible,
    setIsTaxVisible,
    selectedSeatTime,
    sessionTime,
    timeLeft,
    expiredModal,
    setExpiredModal,
    rewardPoints,
    rewardModal,
    setRewardModal,
    selectedRewardPoints,
    setSelectedRewardPoints,
    appliedRewardPoints,
    setAppliedRewardPoints,
    setRewardPoints,
    applyReward,
    removeReward,
    spinnerLoading,
    stopPayment,
  };
};

export default paymentController;
