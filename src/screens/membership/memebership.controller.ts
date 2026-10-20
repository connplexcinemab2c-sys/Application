import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import Snackbar from 'react-native-snackbar';
import axiosInstance from '../../services/api';
import constant from '../../services/config/constant';
import params from '../../services/config/params';
import {
  useAppDispatch,
  useAppSelector,
} from '../../services/config/redux/useReduxHooks';

const memebershipController = () => {
  const isFocused = useIsFocused();
  const {token, userData} = useAppSelector(state => state.UserReducer);
  const navigation = useNavigation<any>();
  const [selectedPlan, setSelectedPlan] = useState<any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [list, setList] = useState<any>([]);
  const [uri, setUri] = useState('');
  const [paymentModal, setPaymentModal] = useState<boolean>(false);
  const [transactionModal, setTransactionModal] = useState<boolean>(false);
  const [transactionError, setTransactionError] = useState<string>();
  const [cancelSpinner, setCancelSpinner] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>({});
  const [visible, setVisible] = useState(false);
  const [coupon, setCoupon] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showLoaderCoupon, setShowLoaderCoupon] = useState<boolean>(false);
  const [cartCalculation, setCartCalculation] = useState<{
    finalAmount?: number;
    totalDiscount?: number;
  }>({finalAmount: undefined, totalDiscount: undefined});
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isFocused) {
      if (!token) {
        getMemberShipList([]);
      } else {
        setCartCalculation({
          finalAmount: undefined,
          totalDiscount: undefined,
        });
        setCoupon('');
        getActivePlan();
      }
    }
  }, [isFocused, token]);

  const getMembershipDurationText = (days: number) => {
    if (days >= 365) {
      const years = days / 365;
      const roundedYears = Math.round(years);
      const isWholeYear = Number.isInteger(years);

      if (isWholeYear) {
        return `${roundedYears} Year${roundedYears > 1 ? 's' : ''}`;
      } else {
        const formattedYears = years.toFixed(1);
        return `${formattedYears} Years`;
      }
    } else if (days >= 30) {
      const months = Math.round(days / 30);
      return `${months} Month${months > 1 ? 's' : ''}`;
    } else {
      return `${days} Day${days > 1 ? 's' : ''}`;
    }
  };

  const getActivePlan = async () => {
    setLoading(true);
    try {
      const {data} = await axiosInstance.get(constant.activePlan, {
        headers: {
          auth: token,
        },
      });

      if (data?.data?.length > 0) {
        let filterData = data?.data?.filter((item: any) => {
          return item?.isActive == true;
        });
        getMemberShipList(filterData);
      } else {
        getMemberShipList([]);
      }
      setRefreshing(false);
    } catch (error: any) {
      setLoading(false);
      setRefreshing(false);
      Snackbar.show({text: error?.response?.data?.message ?? error?.message});
    }
  };

  const getMemberShipList = async (temp: any) => {
    if (!token) {
      setLoading(true);
    }
    try {
      const {data} = await axiosInstance.get(constant.subscriptionList);

      const highestPriceData = data?.data.sort(
        (a: any, b: any) => a.price - b.price,
      );
      if (temp?.length > 0) {
        const matchedData = highestPriceData.map((dataItem: any) => {
          const matchedItem = temp.find(
            (newItem: any) => newItem.subscriptionId._id === dataItem._id,
          );

          if (matchedItem) {
            return {
              ...dataItem,
              currentPlan: true,
            };
          } else {
            return {
              ...dataItem,
              currentPlan: false,
            };
          }
        });
        setList(matchedData);
        let filterCurrentPlan = matchedData?.filter(
          (item: any) => item?.currentPlan,
        );
        setSelectedPlan(
          filterCurrentPlan ? filterCurrentPlan[0]?._id : matchedData[0]?._id,
        );
      } else {
        let newData = highestPriceData?.map((dataItem: any) => {
          return {
            ...dataItem,
            currentPlan: false,
          };
        });
        setList(newData);
        setSelectedPlan(newData[0]?._id);
      }
      setLoading(false);
      setRefreshing(false);
    } catch (error: any) {
      setLoading(false);
      setRefreshing(false);
      Snackbar.show({text: error?.response?.data?.message ?? error?.message});
    }
  };

  const refreshCall = () => {
    setRefreshing(true);
    getActivePlan();
  };

  const onPlan = (item: any): void => {
    selectedPlan === item?._id
      ? setSelectedPlan('')
      : setSelectedPlan(item?._id);
  };

  const onSubscribe = async () => {
    setShowModal(false);
    if (!token) {
      setVisible(true);
    } else {
      setLoading(true);
      try {
        const formData = {
          [params.subscriptionId]: selectedItem?._id,
          couponCode: coupon,
        };
        const {data} = await axiosInstance.post(
          constant.onSubscribe,
          formData,
          {
            headers: {
              auth: token,
            },
          },
        );
        console.log('data::', data?.data);
        razorPay(
          data?.data?.razorpayOrderId,
          data?.data?.keyId,
          data?.data?.currency,
          data?.data?.amount,
          data?.data?.transId,
          data?.data?.totalDiscount,
        );
        // setUri(data);
        // setIsLoad(false);
        // setPaymentModal(true);
      } catch (error: any) {
        setShowModal(false);
        setLoading(false);
        Snackbar.show({
          text: error?.response?.data?.message ?? error?.message,
        });
      }
    }
  };

  const razorPay = (
    orderId: any,
    razorPayKey: string,
    currency: any,
    amount: any,
    transId: any,
    totalDiscount: any,
  ) => {
    var options: any = {
      description: 'Connplex Mobile Application',
      key: razorPayKey,
      currency: currency,
      amount: amount,
      name: 'Connplex Smart Theatre',
      order_id: orderId,
      // prefill: {
      //   email: 'satyam.vhits@gmail.com',
      //   contact: '9909922417',
      //   name: 'Satyam vyas',
      // },
      theme: {
        color: '#191510',
      },
    };
    RazorpayCheckout.open(options)
      .then(data => {
        ccavResponseHandler(data, transId, totalDiscount);
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
    transactionId: any,
    totalDiscount: any,
  ) => {
    try {
      const formData = {
        razorpay_payment_id: razorPayResponse.razorpay_payment_id,
        razorpay_order_id: razorPayResponse.razorpay_order_id,
        razorpay_signature: razorPayResponse.razorpay_signature,
        transId: transactionId,
        [params.subscriptionId]: selectedItem?._id,
        couponCode: coupon,
        userId: userData?._id,
        totalDiscount: totalDiscount,
        paymentStatus: 'success',
      };
      const {data} = await axiosInstance.post(
        constant.subscriptionResponseHandler,
        formData,
        {
          headers: {
            auth: token,
          },
        },
      );
      setLoading(false);
      navigation.navigate('paymentSuccess', {
        data: selectedItem,
        price: cartCalculation?.finalAmount
          ? cartCalculation?.finalAmount
          : selectedItem?.isDiscounted
          ? selectedItem?.discountedPrice
          : selectedItem?.price,
      });
    } catch (error) {
      setLoading(false);
      console.log('error', error);
      Snackbar.show({text: 'Something went wrong', duration: 3000});
    }
  };

  const onBuy = async (item: any) => {
    if (!token) {
      setVisible(true);
    } else {
      setSelectedItem(item);
      setShowModal(true);
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
    navigation.navigate('paymentSuccess', {
      data: selectedItem,
      price: cartCalculation?.finalAmount
        ? cartCalculation?.finalAmount
        : selectedItem?.isDiscounted
        ? selectedItem?.discountedPrice
        : selectedItem?.price,
    });
  };

  const cancelTransaction = async (flag: string) => {
    /* API call for cancelling transaction */
    setCancelSpinner(false);
    setTransactionModal(false);
    setCartCalculation({
      finalAmount: undefined,
      totalDiscount: undefined,
    });
    setCoupon('');
    // navigation.goBack();
  };

  const onFailPayment = (): void => {
    setPaymentModal(false);
    setCartCalculation({
      finalAmount: undefined,
      totalDiscount: undefined,
    });
    setCoupon('');
    navigation.navigate('paymentFail', {screen: 'membership'});
  };

  const onApplyCouponCode = () => {
    setShowLoaderCoupon(true);
    const formData = {
      couponCode: coupon,
      subscriptionId: selectedItem?._id,
      userId: userData?._id,
    };

    axiosInstance
      .post(constant.verifyMembershipCoupon, formData, {
        headers: {
          auth: token,
        },
      })
      .then(res => {
        setCartCalculation(res.data.data);
        Snackbar.show({text: res?.data?.message});
      })
      .catch(e => {
        setCartCalculation({
          finalAmount: undefined,
          totalDiscount: undefined,
        });
        setCoupon('');
        Snackbar.show({
          text: e?.response?.data?.message ?? 'Something went wrong',
        });
      })
      .finally(() => {
        setShowLoaderCoupon(false);
      });
  };

  const onCloseModal = () => {
    setShowModal(false);
    setCartCalculation({
      finalAmount: undefined,
      totalDiscount: undefined,
    });
  };

  const onCouponCall = () => {
    setCoupon('');
    setCartCalculation({
      finalAmount: undefined,
      totalDiscount: undefined,
    });
  };
  return {
    onPlan,
    selectedPlan,
    isOpen,
    setIsOpen,
    loading,
    refreshing,
    list,
    refreshCall,
    onSubscribe,
    isLoad,
    uri,
    paymentModal,
    onCancelPayment,
    onSuccessPayment,
    transactionModal,
    setTransactionModal,
    transactionError,
    setTransactionError,
    cancelSpinner,
    cancelTransaction,
    visible,
    setVisible,
    onFailPayment,
    getMembershipDurationText,
    navigation,
    coupon,
    setCoupon,
    showModal,
    setShowModal,
    onBuy,
    selectedItem,
    onApplyCouponCode,
    showLoaderCoupon,
    setShowLoaderCoupon,
    cartCalculation,
    setCartCalculation,
    onCloseModal,
    onCouponCall,
  };
};

export default memebershipController;
