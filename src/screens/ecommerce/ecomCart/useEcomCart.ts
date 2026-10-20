import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {AuthNavigationProps} from '../../../navigation/stacks/authStack';
import {axiosInstance, ecomInstance} from '../../../services/api/api';
import constant from '../../../services/config/constant';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../services/config/redux/useReduxHooks';
import Log from '../../../utility/log';
import useAppState from '../../../hooks/useAppState';
import params from '../../../services/config/params';
import {
  getCartList,
  getWishlist,
  updateSelectedAddress,
} from '../../../services/config/redux/userReducer/action';
import Snackbar from 'react-native-snackbar';
import {CartDataProps, ValuesProps} from './ecomCart.interface';
import axios from 'axios';
import {Vibration} from 'react-native';

const useEcomCart = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const dispatch = useAppDispatch();
  const {
    token,
    notificationCount,
    selectedAddress,
    cartList,
    wishListAll,
    cartItem,
  } = useAppSelector(state => state.UserReducer);
  const [allCartID, setAllCartID] = useState([]);
  const [getDeliveryCharges, setGetDeliveryCharges] = useState('');
  const [onLoad, setOnLoad] = useState(false);
  const [deliveryChargeUpdatedAt, setDeliveryChargeUpdatedAt] = useState(
    Date.now(),
  );
  const [showEmpty, setShowEmpty] = useState<boolean>();
  const isFocused = useIsFocused();
  const [values, setValues] = useAppState<ValuesProps>({
    cartData: [],
    totalPrice: 0,
    deliveryPrice: 0,
    isLoading: true,
    applyCoupon: undefined,
    coupon: '',
    membershipDiscount: '',
    membershipDiscountAmount: 0,
    totalCost: 0,
    isLoadCoupon: false,
    loadCheckout: false,
    couponAmount: 0,
    selectedAddress: {},
    addresses: [],
    deleiveryData: [],
    cartIdData: [],
  });

  useFocusEffect(
    useCallback(() => {
      getSubscriptionMembership();

      getAllAddress();
    }, []),
  );

  useEffect(() => {
    if (values?.cartData?.length === 0) {
      const timer = setTimeout(() => {
        setShowEmpty(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowEmpty(false);
    }
  }, [values?.cartData]);

  useEffect(() => {
    getAllCartApi();
    getAllAddress();
  }, [isFocused]);

  useEffect(() => {
    if (selectedAddress) {
      setValues('selectedAddress', selectedAddress);
    }
  }, [selectedAddress]);

  useEffect(() => {
    let membershipDiscountPercent = +values?.membershipDiscount || 0;
    let membershipDiscountAmt =
      (values?.totalPrice * membershipDiscountPercent) / 100;
    setValues('membershipDiscountAmount', membershipDiscountAmt);
    setValues(
      'totalCost',
      values?.totalPrice - membershipDiscountAmt + values?.deliveryPrice,
    );
  }, [values?.membershipDiscount, values?.totalPrice, values?.deliveryPrice]);

  const onHeartPress = (item: CartDataProps, index: number) => {};
  const getAllCartApi = async (isDelete?: boolean) => {
    if (isDelete == true) {
      setValues('isLoading', false);
    } else {
      setValues('isLoading', true);

      try {
        const {data} = await ecomInstance.get(constant.getAllCart, {
          headers: {
            auth: token,
          },
        });
        Log('getAllCart data', JSON.stringify(data?.data));
        setValues('totalPrice', data?.data?.total);
        const cartItems = data?.data?.cartItems || [];
        const cartIds = cartItems.map(item => item._id);
        setValues('cartIdData', cartIds);
        onGetDeliveryChargesMobile(selectedAddress, cartIds);

        setAllCartID(cartIds);
        if (!isDelete) {
          getProductAvailableOnPincode(data?.data?.cartItems);
          setGetDeliveryCharges('');
          onGetDeliveryChargesMobile(selectedAddress, cartIds);
        }
        setValues('isLoading', false);
      } catch (error: any) {
        setValues('isLoading', false);
        Snackbar.show({text: error?.response?.data?.message});
        Log('getAllCart error', error);
      }
    }
  };

  const getLatestProductAvailableOnPincode = async (
    cartData: CartDataProps[],
  ) => {
    try {
      const queryParams = {
        [params.pincode]: selectedAddress?.addressDetails?.billing_zip,
      };
      const {data} = await ecomInstance.get(
        constant.getProductAvailableOnPincode,
        {
          headers: {
            auth: token,
          },
          params: queryParams,
        },
      );
      Log('getProductAvailableOnPincode data', data);

      setValues(
        'deliveryPrice',
        data?.data?.totalDeliveryCharges ?? values.deliveryPrice,
      );
      setOnLoad(false);

      const list = cartData?.map(item => {
        if (data?.data?.matchingCartIds?.includes(item?._id)) {
          return {
            ...item,
            isAvailable: true,
          };
        } else {
          return {
            ...item,
            isAvailable: false,
          };
        }
      });
      setValues('cartData', [...list]);
    } catch (error: any) {
      Snackbar.show({text: error?.response?.data?.message});
      Log('getProductAvailableOnPincode error', error);
    }
  };

  const getLatestallApi = async (isDelete?: boolean) => {
    try {
      const {data} = await ecomInstance.get(constant.getAllCart, {
        headers: {
          auth: token,
        },
      });
      setValues('totalPrice', data?.data?.total);
      setValues('', data?.data?.cartItems);
      const cartItems = data?.data?.cartItems || [];
      const cartIds = cartItems.map(item => item._id);
      setAllCartID(cartIds);
      if (!isDelete) {
        getLatestProductAvailableOnPincode(data?.data?.cartItems);
        setGetDeliveryCharges('');
        onGetLatestChargesMobile(selectedAddress, cartIds);
      }
      setValues('isLoading', false);
    } catch (error: any) {
      setValues('isLoading', false);
      Snackbar.show({text: error?.response?.data?.message});
      Log('getAllCart error', error);
    }
  };
  const onGetLatestChargesMobile = async (address, cartIds) => {
    if (!address?.addressDetails?.billing_zip || !cartIds?.length) return;
    // setValues('isLoading', true);
    // setOnLoad(true);
    try {
      const {data} = await ecomInstance.post(
        `${constant.getDeliveryChargesMobile}`,
        {
          pinCode: address?.addressDetails?.billing_zip,
          cartItems: cartIds,
        },
        {
          headers: {
            auth: token,
          },
        },
      );
      setGetDeliveryCharges(data?.totalShipmentCharge);
      setDeliveryChargeUpdatedAt(Date.now());
      setValues('deliveryPrice', data?.totalShipmentCharge);
      setValues('deleiveryData', data);

      Log('getDeliveryChargesMobile mobile data', JSON.stringify(data?.data));
    } catch (error: any) {
      Log('mobile error', error);
    }
  };
  const onGetDeliveryChargesMobile = async (address, cartIds) => {

    if (!address?.addressDetails?.billing_zip || !cartIds?.length) return;

    setOnLoad(true);
    try {
      const {data} = await ecomInstance.post(
        `${constant.getDeliveryChargesMobile}`,
        {
          pinCode: address?.addressDetails?.billing_zip,
          cartItems: cartIds,
        },
        {
          headers: {
            auth: token,
          },
        },
      );
      setGetDeliveryCharges(data?.totalShipmentCharge);
      setDeliveryChargeUpdatedAt(Date.now());
      setValues('deliveryPrice', data?.totalShipmentCharge);
      setValues('deleiveryData', data);

      setOnLoad(false);
      Log('getDeliveryChargesMobile mobile data', JSON.stringify(data?.data));
    } catch (error: any) {
      setOnLoad(false);

      Log('mobile error', error);
    }
  };

  const getProductAvailableOnPincode = async (cartData: CartDataProps[]) => {
    setValues('isLoading', true);

    try {
      const queryParams = {
        [params.pincode]: selectedAddress?.addressDetails?.billing_zip,
      };
      const {data} = await ecomInstance.get(
        constant.getProductAvailableOnPincode,
        {
          headers: {
            auth: token,
          },
          params: queryParams,
        },
      );
      Log('getProductAvailableOnPincode data', data);

      setValues('deliveryPrice', data?.data?.totalDeliveryCharges ?? 0.0);
      setValues('isLoading', false);

      const list = cartData?.map(item => {
        if (data?.data?.matchingCartIds?.includes(item?._id)) {
          return {
            ...item,
            isAvailable: true,
          };
        } else {
          return {
            ...item,
            isAvailable: false,
          };
        }
      });
      setValues('cartData', [...list]);
    } catch (error: any) {
      Snackbar.show({text: error?.response?.data?.message});
      Log('getProductAvailableOnPincode error', error);
      setValues('isLoading', false);
    }
  };

  const getAllAddress = async () => {
    try {
      const {data} = await ecomInstance.get(constant.getAllAddress, {
        headers: {
          auth: token,
        },
      });
      Log('getAllAddress data', JSON.stringify(data?.data));
      if (data?.data) {
        dispatch(updateSelectedAddress(data?.data[0]));
        onGetDeliveryChargesMobile(data?.data[0], ['6814b33dd4162c2028f343f4']);

        setValues('addresses', data?.data);
      }
    } catch (error) {
      Log('getAllAddress error', error);
    }
  };

  const getSubscriptionMembership = async () => {
    try {
      const {data} = await axiosInstance.get(
        constant.getUserSubscriptionMembership,
        {
          headers: {
            auth: token,
          },
        },
      );
      Log('getUserSubscriptionMembership data', JSON.stringify(data?.data));
      setValues(
        'membershipDiscount',
        data?.data?.subscriptionDetails?.discountOnEcommerce,
      );
    } catch (error) {
      Log('getUserSubscriptionMembership error', error);
    }
  };

  const onApplyCoupon = async () => {
    if (values?.applyCoupon === 'Remove') {
      setValues('applyCoupon', 'Apply');
      setValues('isLoadCoupon', false);
      setValues('couponAmount', 0);
      setValues('totalCost', values?.totalCost + values?.couponAmount);
      setValues('coupon', '');
      Snackbar.show({
        text: 'Coupon removed successfully.',
      });
      return;
    }

    if (values?.applyCoupon === 'Applied') {
      setValues('applyCoupon', 'Apply');
      setValues('isLoadCoupon', false);
      setValues('couponAmount', 0);
      setValues('totalCost', values?.totalCost + values?.couponAmount);
    } else {
      setValues('isLoadCoupon', true);
      try {
        const {data} = await axiosInstance.post(
          constant.validateEcommerceCoupon,
          {
            [params?.couponTitle]: values?.coupon,
            [params?.userSpentAmount]: values?.totalPrice,
          },
          {
            headers: {
              auth: token,
            },
          },
        );
        Log('validateEcommerceCoupon data', data);
        if (data?.data) {
          Snackbar.show({text: data?.message});
          setValues('applyCoupon', 'Applied');
          setValues('isLoadCoupon', false);
          let discountedAmount = 0;
          if (data?.data?.discountType == '%') {
            const discountPercentage = +data?.data?.discount;
            const discountAmount =
              (values?.totalPrice * discountPercentage) / 100;
            discountedAmount = discountAmount;

            if (discountedAmount > +data?.data?.couponUpTo) {
              discountedAmount = +data?.data?.couponUpTo;
            }
          }
          if (data?.data?.discountType == 'flat') {
            const flatDiscount = +data?.data?.discount;
            discountedAmount = flatDiscount;
          }
          setValues('couponAmount', discountedAmount);
          setValues('totalCost', values?.totalCost - discountedAmount);
        }
      } catch (error: any) {
        Log('validateEcommerceCoupon error', error?.response);
        setValues('isLoadCoupon', false);
        Snackbar.show({text: error?.response?.data?.message});
      }
    }
  };

  const onPressCheckOut = async () => {
    const fullName = selectedAddress?.addressDetails?.billing_name || '';
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const addressDetailsShippings = {
      billing_firstName: firstName,
      billing_lastName: lastName,
      billing_tel: selectedAddress?.addressDetails?.billing_tel || '',
      billing_email: selectedAddress?.addressDetails?.billing_email || '',
      billing_address: selectedAddress?.addressDetails?.billing_address || '',
      billing_locality: selectedAddress?.addressDetails?.billing_locality || '',
      billing_landmark: selectedAddress?.addressDetails?.billing_landmark || '',
      billing_zip: selectedAddress?.addressDetails?.billing_zip || '',
      billing_city: selectedAddress?.addressDetails?.billing_city || '',
      billing_state: selectedAddress?.addressDetails?.billing_state || '',
      billing_country: selectedAddress?.addressDetails?.billing_country || '',
    };

    if (!values?.selectedAddress?.addressDetails?.billing_address) {
      Snackbar.show({
        text: 'Please add address',
      });
    }

    setValues('loadCheckout', true);

    try {
      const {data} = await ecomInstance.post(
        constant.mobileCheckout,
        {
          [params?.couponTitle]:
            values?.applyCoupon === 'Applied' ? values?.coupon : '',
          [params?.deliveryFee]: values?.deliveryPrice,
          [params?.shippingDetails]: addressDetailsShippings,
        },
        {
          headers: {
            auth: token,
          },
        },
      );

      Log('addToCheckout data', data);
      if (data) {
        navigation.navigate('ecomPayment', {url: data?.formbody});
        setValues('loadCheckout', false);
      }
    } catch (error: any) {
      Log('addToCheckout error', error?.response);
      setValues('loadCheckout', false);
    }
  };

  const onPlus = async (item: any) => {
    if (item?.quantity >= item?.maximumPurchaseQty) return;

    try {
      const formData = {
        [params?.cartItemId]: item?._id,
        [params?.quantity]: item?.quantity + 1,
      };
      const {data} = await ecomInstance.post(
        constant.updateCartItem,
        formData,
        {headers: {auth: token}},
      );
      Log('updateCartItem data', data);
      getSubscriptionMembership();
      getLatestallApi();
    } catch (error) {
      Log('updateCartItem error', error);
    }
  };

  const onMinus = async (item: any) => {
    if (item?.quantity > 1) {
      try {
        const formData = {
          [params?.cartItemId]: item?._id,
          [params?.quantity]: item?.quantity - 1,
        };

        const {data} = await ecomInstance.post(
          constant.updateCartItem,
          formData,
          {headers: {auth: token}},
        );

        Log('updateCartItem data', data);
        getSubscriptionMembership();
        getLatestallApi();
      } catch (error) {
        Log('updateCartItem error', error);
      }
    }
  };

  const onDelete = async (item: CartDataProps) => {
    try {
      const list = values?.cartData?.filter(val => val?._id !== item?._id);
      setValues('cartData', [...list]);
      const {data} = await ecomInstance.post(
        constant.removeFromCart,
        {
          [params?.id]: item?._id,
        },
        {
          headers: {
            auth: token,
          },
        },
      );
      Log('removeFromCart data', data);
      dispatch(getCartList(token));
      getSubscriptionMembership();
      getAllCartApi(true);
    } catch (error) {
      Log('removeFromCart error', error);
    }
  };

  const onPressWishlist = () => {
    navigation.navigate('ecomHomePage');
  };

  const onPressAddAddress = () => {
    navigation.navigate('address', {address: values?.addresses});
  };

  const [wishlistLoading, setWishlistLoading] = useState<
    Record<string, boolean>
  >({});

  const onLike = async (cartItem: CartDataProps, index: any) => {
    const isVariantWishlisted = wishListAll.find((wishItem: any) => {
      return (
        wishItem?.attributeId === cartItem?.attributeId &&
        wishItem?.product?._id === cartItem?.productId?._id
      );
    });

    if (wishlistLoading[cartItem._id]) return;

    try {
      setWishlistLoading(prev => ({...prev, [cartItem._id]: true}));

      if (isVariantWishlisted) {
        await handleRemoveFromWishlist(isVariantWishlisted._id);
      } else {
        await handleAddToWishlist(cartItem);
      }
    } catch (error) {
      Log('Error in like operation:', error);
    } finally {
      setWishlistLoading(prev => ({...prev, [cartItem._id]: false}));
    }
  };

  const handleRemoveFromWishlist = async (wishlistId: string) => {
    try {
      const response = await ecomInstance.post(
        constant.removeFromWishlist,
        {[params.id]: wishlistId},
        {headers: {auth: token}},
      );

      Log('Removed from wishlist:', response.data);
      Vibration.vibrate(500);
      dispatch(getWishlist(token));
      Snackbar.show({
        text: 'Removed from wishlist',
      });
    } catch (error) {
      Log('Error removing from wishlist:', error);
      throw error;
    }
  };

  const handleAddToWishlist = async (product: any) => {
    try {
      const formData = {
        [params.productId]: product?.productId?._id,
        [params.attributeId]: product?.attributeId,
        [params.attribute]: {
          [params.color]: product?.attributes?.Color,
          [params.colorCode]: product?.attributes?.colorCode,
          [params.size]: product?.attributes?.Size,
        },
      };

      const response = await ecomInstance.post(
        constant.addToWislist,
        formData,
        {headers: {auth: token}},
      );

      dispatch(getWishlist(token));
      Vibration.vibrate(500);
      Log('Added to wishlist:', response.data);
      Snackbar.show({
        text: 'Added to wishlist',
      });
    } catch (error) {
      Log('Error adding to wishlist:', error);
      throw error;
    }
  };
  return {
    onPressCheckOut,
    values,
    onPlus,
    onMinus,
    onDelete,
    onPressWishlist,
    setValues,
    onApplyCoupon,
    onPressAddAddress,
    onLike,
    getDeliveryCharges,
    deliveryChargeUpdatedAt,
    getAllCartApi,
    onHeartPress,
    onLoad,
    showEmpty,
    notificationCount,
  };
};

export default useEcomCart;
