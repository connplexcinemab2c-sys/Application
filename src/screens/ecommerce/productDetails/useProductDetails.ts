import {Vibration} from 'react-native';
import {
  RouteProp,
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  AuthNavigationProps,
  AuthParams,
} from '../../../navigation/stacks/authStack';
import useAppState from '../../../hooks/useAppState';
import {useCallback, useEffect, useState} from 'react';
import {ecomInstance} from '../../../services/api/api';
import constant from '../../../services/config/constant';
import Log from '../../../utility/log';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../services/config/redux/useReduxHooks';
import params from '../../../services/config/params';
import {
  AllProductsProps,
  AttributesProps,
  GetWishlistProps,
} from '../ecomHomePage/ecomHomePageProps';
import Snackbar from 'react-native-snackbar';
import {
  getCartList,
  getWishlist,
} from '../../../services/config/redux/userReducer/action';
import ProductDetails from './ProductDetails';
import {duration} from 'moment';

const useProductDetails = () => {
  const route = useRoute<RouteProp<AuthParams, 'productDetails'>>();
  const {token, cartItem, cartList, wishListAll, wishlistData} = useAppSelector(
    state => state?.UserReducer,
  );
  const [newLoad, setNewLoad] = useState<any>(false);
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const [cartLoadingIndex, setCartLoadingIndex] = useState<number | null>(null);
  const [attributeFilter, setAttributeFilter] = useState<any>({});
  const [variantDetail, setVariantDetail] = useState<any>(null);
  const [isCartExist, setIsCartExist] = useState<any>(false);
  const [values, setValues] = useAppState<ProductDetailsProps>({
    products: [],
    productDetail: route.params?.data,
    isWhistListed: false,
    activeProductImage: route.params?.data?.attributes?.[0]?.images[0],
    activeProductId: route.params?.data?.attributes?.[0]?._id,
    activeProductColor: route.params?.data?.attributes?.[0]?.Color,
    activeProductSize:
      route.params?.data?.attributes?.find(attr => attr.Size?.length)
        ?.Size?.[0] ?? '',
    relatedProducts: [],
    activeColor: 0,
    wishlistData: undefined,
    cartData: [],
    applyPincode: undefined,
    pincode: '',
    provideStatus: false,
    pincodeSpinner: false,
    addToCartSpinner: false,
    quantity: 1,
    pinMessage: '',
    pinStatus: false,
    activeVariantId: '',
    attributeFilter: '',
    variantDetail: {},
    isLoading: true,
    isRefreshing: false,
    isPagination: false,
    extractedData: [],
    cartQuantity: 1,
  });

  const currentAttribute =
    values?.productDetail?.attributes?.[values?.activeColor];
  const discountedPrice =
    (currentAttribute?.discountedPrice || 0) * values.quantity;
  const productPrice = (currentAttribute?.price || 0) * values.quantity;
  const navigation = useNavigation<AuthNavigationProps>();
  const skipFields = ['_id', 'price', 'discountedPrice', 'stock', 'images'];
  const attributeIds = cartList.map(item => item.attributes);

  const isVariantInCart = values.cartData.some(item => {
    const itemSize = item.attributes?.Size;
    const itemColor = item.attributes?.Color;

    const hasSize = !!itemSize;
    const hasColor = !!itemColor;

    const matchesSize = itemSize === values.activeProductSize;
    const matchesColor = itemColor === values.activeProductColor;
    const matchesVariant = item.attributeId === values.activeVariantId;

    if (hasSize && hasColor) {
      return matchesSize && matchesVariant;
    } else if (!hasSize) {
      return matchesVariant;
    } else if (hasColor) {
      return matchesColor && matchesVariant;
    } else {
      return matchesVariant;
    }
  });

  useEffect(() => {
    getWishlistApi();
    getAllCartApi();
    getSingleProduct();
    getSimilarProducts();
  }, []);

  useEffect(() => {
    getWishlistApi();
  }, [values.activeVariantId]);

  useEffect(() => {
    if (isFocused) {
      getSimilarProducts();
    }
  }, [values.relatedProducts]);
  useEffect(() => {
    if (values?.wishlistData !== undefined) {
      let tempValue = values?.products?.map((item: AllProductsProps) => {
        return {
          ...item,
          liked: values?.wishlistData?.some(
            (wishlistItem: GetWishlistProps) =>
              wishlistItem?.product?._id == item?._id,
          ),
        };
      });
      setValues('products', tempValue);
    }
  }, [values?.wishlistData]);

  useEffect(() => {
    if (variantDetail?.Size?.length > 0 && !values?.activeProductSize) {
      const defaultSize = variantDetail.Size[0];
      setValues('activeProductSize', defaultSize);
      setValues('attributeFilter', {
        ...values.attributeFilter,
        Size: defaultSize,
      });
    }

    if (
      values?.productDetail?.attributes?.length > 0 &&
      !values?.activeVariantId
    ) {
      const defaultAttr = values.productDetail.attributes[0];
      const defaultSize = defaultAttr?.Size?.[0];

      setValues('activeVariantId', defaultAttr._id);
      setValues('activeColor', 0);
      setValues('activeProductImage', defaultAttr?.images?.[0]);
      setValues('activeProductSize', defaultSize);
      setValues('variantDetail', defaultAttr);
      setValues('attributeFilter', {
        ...values.attributeFilter,
        Color: defaultAttr.Color,
        Size: defaultSize,
      });
    }
  }, [variantDetail, values.productDetail?.attributes]);

  useEffect(() => {
    const matchingCartItem = values.extractedData?.find(item => {
      const hasSize =
        values.activeProductSize && item.size && item.size !== 'N/A';

      if (hasSize) {
        return (
          item.attributeid === values.activeVariantId &&
          item.size?.toLowerCase?.() ===
            values.activeProductSize?.toLowerCase?.()
        );
      } else {
        return item.attributeid === values.activeVariantId;
      }
    });

    if (matchingCartItem) {
      setValues('quantity', matchingCartItem.quantity);
    } else {
      setValues('quantity', 1);
    }
  }, [values.activeVariantId, values.activeProductSize, values.extractedData]);

  useFocusEffect(
    useCallback(() => {
      getAllCartApi();
    }, []),
  );
  const getSimilarProducts = async () => {
    try {
      const {data} = await ecomInstance.get(
        `${constant.getSimilarProduct}?category=${route?.params?.data?.category?._id}&productId=${route?.params?.data?._id}`,
        {
          headers: {
            auth: token,
          },
        },
      );
      Log('getSimilarProducts data', JSON.stringify(data?.data));

      const currentProductId = values?.productDetail?._id;
      const list = data?.data
        ?.filter(item => item?._id !== currentProductId)
        ?.map(item => {
          const isAdded = cartItem?.includes(item?._id);
          const isWishlisted = wishlistData?.includes(item?._id);
          return {
            ...item,
            liked: isWishlisted,
            addedToCart: isAdded,
          };
        });

      setValues('relatedProducts', list);
    } catch (error) {
      Log('get similar error', error);
    }
  };

  const getAllCartApi = async () => {
    try {
      const {data} = await ecomInstance.get(constant.getAllCart, {
        headers: {
          auth: token,
        },
      });
      Log('getAllCart data', JSON.stringify(data?.data));
      setValues('cartData', data?.data?.cartItems);
      const extractedData = data?.data.cartItems?.map(item => {
        return {
          attributeid: item.attributeId,
          cartItemId: item._id,
          quantity: item.quantity,
          size: item.attributes?.Size || 'N/A',
        };
      });
      setValues('extractedData', extractedData);
      getCartQuantity();
      updateQuantity('');
    } catch (error) {
      Log('getAllCart error', error);
    }
  };
  const getCartQuantity = () => {
    const matchingCartItem = values.extractedData.find(
      item =>
        item.attributeid === values.activeVariantId &&
        item.size === values.activeProductSize,
    );

    if (matchingCartItem) {
      setValues('cartQuantity', matchingCartItem.quantity);
      return matchingCartItem.quantity;
    } else {
      setValues('cartQuantity', 1);
      return 1;
    }
  };

  const updateQuantity = async (type: any) => {
    const currentQty = values.quantity;
    const maxQty =
      values?.productDetail?.maximumPurchaseQty ||
      values?.productDetail?.attributes?.[values?.activeColor]?.stock;

    const isIncrement = type === 'plus';
    const newQty = isIncrement ? currentQty + 1 : currentQty - 1;

    if (
      (!isIncrement && currentQty <= 1) ||
      (isIncrement && currentQty >= maxQty)
    ) {
      return;
    }

    try {
      const matchedCartItem = values.extractedData.find(
        item => item.attributeid === values.activeVariantId,
      );

      if (matchedCartItem) {
        const formData = {
          [params?.cartItemId]: matchedCartItem.cartItemId,
          [params?.quantity]: newQty,
          [params?.attributeId]: values.activeVariantId,
        };

        const {data} = await ecomInstance.post(
          constant.updateCartItem,
          formData,
          {headers: {auth: token}},
        );

        setValues('quantity', data?.data?.quantity || newQty);
        Log('updateCartItem data', data);
      } else {
        setValues('quantity', newQty);
      }
    } catch (error) {
      Log('updateCartItem error', error);
    }
  };

  const onPlus = () => updateQuantity('plus');
  const onMinus = () => updateQuantity('minus');

  const getSingleProduct = async () => {
    try {
      const {data} = await ecomInstance.get(
        `${constant.getSingleProduct}?id=${route?.params?.data?._id}`,
        {
          headers: {
            auth: token,
          },
        },
      );

      Log('getSingle  data', JSON.stringify(data?.data));

      if (data?.data?.attributes?.length > 0) {
        let variant = data?.data?.attributes[0];

        setVariantDetail(variant); // async update

        let tempObj: any = {};

        Object.entries(variant).forEach(([key, value]: any) => {
          if (!skipFields.includes(key)) {
            tempObj[key] = Array.isArray(value) ? value[0] : value;
          }
        });

        setAttributeFilter(tempObj);
      } else {
        Log('No attributes found for this product.', data?.data);
      }

      setValues('productDetail', data?.data);
    } catch (error) {
      Log('getAllCart error', error);
    }
  };
  const verifyPincode = async () => {
    if (values?.pincode === '') {
      Snackbar.show({
        text: 'Please enter Pincode to check delivery availability',
      });
    } else {
      try {
        setValues('pincodeSpinner', true);
        const {data} = await ecomInstance.get(
          `${constant.sellerVerifyPincode}?destination_pincode=${values?.pincode}`,
        );
        Log('sellerVerifyPincode data', data);
        // Snackbar.show({text: data?.message});
        setValues('provideStatus', data?.isAvailable);
        setValues('pinStatus', data?.isAvailable);
        setValues('pincodeSpinner', false);
        setValues('pinMessage', data?.message || 'We deliver to your pincode!');
      } catch (error) {
        Log('sellerVerifyPincode error', error);
        setValues('pincodeSpinner', false);
        setValues('pinStatus', false);
        setValues(
          'pinMessage',
          error?.response ||
            'Sorry, we dont deliver to this pincode. Please try another.',
        );
      }
    }
  };
  const getWishlistApi = async () => {
    try {
      const {data} = await ecomInstance.get(constant.getWishlist, {
        headers: {
          auth: token,
        },
      });

      Log('getWishlist data', data?.data);
      setValues('wishlistData', data?.data);

      if (route?.params?.data?._id) {
        let match = data?.data?.find((item: GetWishlistProps) => {
          return item?.attributeId == values.activeVariantId;
          // return (
          //   item?.product?._id == route?.params?.data?._id &&
          //   item?.attributeId == values.activeVariantId ||
          // );
        });
        setValues('isWhistListed', match !== undefined);
      }
    } catch (error) {
      Log('getWishlist error', error);
    }
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  const onLikeClick = async () => {
    setValues('isWhistListed', !values.isWhistListed);
    Vibration.vibrate(500);
    Snackbar.show({
      text: !values.isWhistListed
        ? 'Added to wishlist'
        : 'Removed from wishlist',
    });
    const cred = {
      Color: values?.variantDetail?.Color,
      Size: values.activeProductSize,
      colorCode: values?.variantDetail?.colorCode,
    };

    if (!values.isWhistListed) {
      try {
        const {data} = await ecomInstance.post(
          constant.addToWislist,
          {
            [params?.attribute]: cred,
            [params?.attributeId]: values?.activeVariantId,
            [params?.productId]: values?.productDetail?._id,
          },
          {
            headers: {
              auth: token,
            },
          },
        );
        Log('addToWislist data', data);
        getWishlistApi();
      } catch (error) {
        Log('addToWislist error', error);
      }
    } else {
      try {
        let matchId = values?.wishlistData?.find(
          (item: GetWishlistProps) =>
            item?.product?._id == values?.productDetail?._id,
        );
        const {data} = await ecomInstance.post(
          constant.removeFromWishlist,
          {
            [params?.id]: matchId?._id,
          },
          {
            headers: {
              auth: token,
            },
          },
        );
        Log('removeFromWishlist data', data);
        getWishlistApi();
      } catch (error) {
        Log('removeFromWishlist error', error);
      }
    }
  };

  const onLike = async (item: AllProductsProps, index: number) => {
    const updatedProducts = [...values.relatedProducts];
    const isCurrentlyLiked = updatedProducts[index].liked;
    updatedProducts[index].liked = !isCurrentlyLiked;
    setValues('products', updatedProducts);
    Vibration.vibrate(500);
    Snackbar.show({
      text: !isCurrentlyLiked ? 'Added to wishlist' : 'Removed from wishlist',
    });

    try {
      if (!isCurrentlyLiked) {
        const formData = {
          [params.productId]: item._id,
          [params.attributeId]: item.attributes?.[0]?._id,
          [params.attribute]: {
            [params.color]: item?.attributes?.[0]?.Color,
            [params.colorCode]: item.attributes?.[0]?.colorCode,
            [params.size]: item.attributes?.[0]?.Size,
          },
        };

        const {data} = await ecomInstance.post(
          constant.addToWislist,
          formData,
          {headers: {auth: token}},
        );
        dispatch(getWishlist(token));

        Log('Added to wishlist', data);
      } else {
        const match = values.wishlistData?.find(
          (wishlistItem: GetWishlistProps) =>
            wishlistItem.product?._id === item._id,
        );

        if (match) {
          const {data} = await ecomInstance.post(
            constant.removeFromWishlist,
            {[params.id]: match._id},
            {headers: {auth: token}},
          );

          dispatch(getWishlist(token));
          Log('Removed from wishlist', data);
        }
      }
      getWishlistApi();
    } catch (error) {
      Log('Wishlist error', error);
    }
  };

  const validation = () => {
    let isValid = true;

    if (isValid) {
      handleCart();
    }
  };

  const handleCart = async () => {
    try {
      setValues('addToCartSpinner', true);

      const formData = {
        [params?.productId]: values?.productDetail?._id,
        [params?.attributeId]: values.activeVariantId,
        [params?.price]: discountedPrice,
        [params?.quantity]: values.quantity,
        [params?.image]: values.variantDetail.images[0],
        attributes: {
          [params?.color]: values.variantDetail.Color,
          [params?.colorCode]: values.variantDetail?.colorCode,
          [params?.size]: values.activeProductSize,
        },
      };

      const {data} = await ecomInstance.post(constant.addToCart, formData, {
        headers: {auth: token},
      });
      Log('api cart response', data);

      dispatch(getCartList(token));
      setValues('addToCartSpinner', false);
      navigation.navigate('ecomCart');
    } catch (error: any) {
      Log('addToCartSpinner', error);

      Snackbar.show({text: error?.response?.data?.message});
      setValues('addToCartSpinner', false);
    }
  };

  const handleColor = useCallback((hex: AttributesProps, index: number) => {
    setValues('activeProductColor', hex?.Color?.toLowerCase());
    setValues('activeColor', index);
    setValues('activeProductImage', hex?.images[0]);
    setValues('quantity', 1);
    setValues('activeProductSize', hex?.Size?.[0] ?? '');
  }, []);

  const handleProductImage = useCallback((image: string) => {
    setValues('activeProductImage', image);
  }, []);
  const onApplyButton = () => {
    if (values?.applyPincode === 'Checked') {
      setValues('applyPincode', 'Check');
    } else {
      setValues('applyPincode', 'Checked');
    }
  };

  const incrementQuantity = () => {
    setValues('quantity', values.quantity + 1);
  };

  const decrementQuantity = () => {
    setValues('quantity', values.quantity > 1 ? values.quantity - 1 : 1);
  };

  const onCartPress = async (item: string, index: number) => {
    const product = values?.relatedProducts[index];

    if (product?.addedToCart || cartLoadingIndex === index) {
      navigation.navigate('ecomCart');
      return;
    }

    setCartLoadingIndex(index);
    try {
      const {data} = await ecomInstance.post(
        constant.addToCart,
        {
          [params?.productId]: item?._id,
        },
        {
          headers: {
            auth: token,
          },
        },
      );
      Log('addToCart data', data);

      const list = [...values?.relatedProducts];
      list[index].addedToCart = true;
      setValues('products', list);
      Snackbar.show({text: 'Added to cart'});
      dispatch(getCartList(token));
    } catch (error) {
      Log('addToCart error', error);
    } finally {
      setCartLoadingIndex(null);
    }
  };

  const updateProductDetail = async (product: AllProductsProps) => {
    try {
      setNewLoad(true);

      const {data} = await ecomInstance.get(
        `${constant.getSingleProduct}?id=${product._id}`,
        {headers: {auth: token}},
      );

      const productData = data?.data;
      const variant = productData?.attributes?.[0];

      const isWishlisted = wishlistData?.includes(productData._id);
      setValues('isWhistListed', isWishlisted);

      const updatedProduct = {...productData, liked: isWishlisted};

      const tempObj: any = {};
      Object.entries(variant || {})?.forEach(([key, value]: any) => {
        if (!skipFields.includes(key)) {
          tempObj[key] = Array.isArray(value) ? value[0] : value;
        }
      });
      setAttributeFilter(tempObj);

      setValues('productDetail', productData);

      setVariantDetail(variant);
      setValues('activeVariantId', variant._id);
      setValues('activeColor', 0);
      setValues('activeProductImage', variant?.images?.[0]);
      setValues(
        'activeProductSize',
        Array.isArray(variant?.Size) ? variant.Size[0] : '',
      );
      setValues('variantDetail', variant);
      setValues('attributeFilter', tempObj);
      setValues('quantity', 1);
      setValues('pincode', '');
      setValues('pinStatus', false);
      setValues('provideStatus', false);
      setValues('pinMessage', '');
      setNewLoad(false);
    } catch (error) {
      Log('Error updating product detail', error);
      setNewLoad(false);
    } finally {
      setValues('isLoading', false);
      setNewLoad(false);
    }
  };
  const onPressProduct = async (item: AllProductsProps, scrollRef: any) => {
    try {
      setValues('isLoading', true);
      scrollRef?.current?.scrollTo({y: 0, animated: true});
      updateProductDetail(item);
    } catch (error) {
      Log('Error updating product detail', error);
    } finally {
      setValues('isLoading', false);
    }
  };

  const handleChangeVariant = (
    index: number,
    product: any,
    key: string,
    value: string,
    attributeId: string,
    isFilter?: boolean,
  ) => {
    setValues('activeProductId', attributeId);

    if (isFilter) {
      setValues('activeColor', index);

      const variant = product?.attributes?.find(
        attr => attr[key] === value && attr?._id === attributeId,
      );

      if (variant) {
        setAttributeFilter(prev => ({
          ...prev,
          [key]: value,
          colorCode: variant?.colorCode || '#',
        }));
      }

      return;
    }

    if (!isFilter) {
      const mainKeys = Object.entries(attributeFilter || {}).find(
        ([newKey]) => newKey !== key,
      );

      const [mainKey, mainValue] = mainKeys || [];

      setAttributeFilter(prev => ({
        ...prev,
        [key]: value,
      }));

      return;
    }
    const variant = product?.attributes?.find(
      attr => attr[key] === value && attr?._id === attributeId,
    );

    setVariantDetail(variant);

    const subKeys = Object.entries(attributeFilter || {}).find(
      ([newKey]) => newKey !== key,
    );

    const [subAttrKey] = subKeys || [];

    if (subAttrKey && variant?.[subAttrKey]) {
      setAttributeFilter(prev => ({
        ...prev,
        [key]: value,
        [subAttrKey]: variant[subAttrKey][0],
      }));
    } else {
      setAttributeFilter(prev => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handleGoToCart = () => {
    navigation.navigate('ecomCart');
  };

  const onEndReached = useCallback(
    (info: {distanceFromEnd: number}) => {
      if (!isNaN(info?.distanceFromEnd)) {
        setValues('isPagination', true);
      }
    },
    [values?.page],
  );

  const handleRefresh = useCallback(() => {
    setValues('isRefreshing', true);
  }, []);

  return {
    onPressBack,
    values,
    setValues,
    onLikeClick,
    validation,
    handleColor,
    handleProductImage,
    cartItem,
    onApplyButton,
    verifyPincode,
    incrementQuantity,
    decrementQuantity,
    skipFields,
    attributeFilter,
    handleChangeVariant,
    variantDetail,
    discountedPrice,
    productPrice,
    isCartExist,
    handleGoToCart,
    attributeIds,
    getWishlistApi,
    onPressProduct,
    onCartPress,
    handleRefresh,
    onEndReached,
    onLike,
    onPlus,
    onMinus,
    isVariantInCart,
    newLoad,
  };
};

export default useProductDetails;
