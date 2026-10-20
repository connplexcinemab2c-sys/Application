import {Vibration} from 'react-native';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  AuthNavigationProps,
  AuthParams,
} from '../../../navigation/stacks/authStack';
import {useCallback, useEffect, useState} from 'react';
import constant from '../../../services/config/constant';
import Log from '../../../utility/log';
import useAppState from '../../../hooks/useAppState';
import {ecomInstance} from '../../../services/api/api';
import params from '../../../services/config/params';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../services/config/redux/useReduxHooks';
import {
  AllProductsProps,
  GetWishlistProps,
} from '../ecomHomePage/ecomHomePageProps';
import Snackbar from 'react-native-snackbar';
import {
  clearNotification,
  getCartList,
  getWishlist,
} from '../../../services/config/redux/userReducer/action';

const useAllProducts = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const route = useRoute<RouteProp<AuthParams, 'allProducts'>>();
  const dispatch = useAppDispatch();
  const {token, cartItem, wishlistData, notificationCount} = useAppSelector(
    state => state.UserReducer,
  );
  const category = route?.params?.category;
  const [cartLoadingIndex, setCartLoadingIndex] = useState<number | null>(null);
  const [values, setValues] = useAppState<AllProductsValueProps>({
    products: [],
    allCategoryProducts: [],
    page: 1,
    isPagination: false,
    isLoading: true,
    isRefreshing: false,
    wishlistData: undefined,
  });

  useFocusEffect(
    useCallback(() => {
      getWishlistApi();
    }, []),
  );
  useFocusEffect(
    useCallback(() => {
      if (category === 'All') {
        getAllCategoryProductsApi();
      } else {
        getAllProductsApi();
      }
    }, [cartItem, category]),
  );
  useEffect(() => {
    if (category !== 'All') {
      getAllProductsApi();
    }
  }, [values?.page, category]);

  const getAllCategoryProductsApi = async () => {
    try {
      const {data} = await ecomInstance.get(
        `${constant.getAllProducts}?page=1&limit=30`,
      );
      Log('getAllProducts data', JSON.stringify(data?.data));
      const list = data?.data?.products?.map(item => {
        const isAdded = cartItem?.includes(item?._id);
        const isWishlisted = wishlistData?.includes(item?._id);
        return {
          ...item,
          liked: isWishlisted,
          addedToCart: isAdded,
        };
      });
      setValues('allCategoryProducts', list);
      setValues('isLoading', false);
    } catch (error) {
      Log('getAllProducts error', error);
      setValues('isLoading', false);
    }
  };

  const getAllProductsApi = async () => {
    try {
      const queryParams = {
        [params.page]: values?.page,
        [params.limit]: 10,
      };
      if (route?.params?.type === 'category') {
        queryParams[params.categories] = route?.params?.data?._id;
      }
      Log('query params', queryParams);
      const {data} = await ecomInstance.get(constant.getAllProducts, {
        params: queryParams,
      });
      const list = data?.data?.products?.map(item => {
        const isAdded = cartItem?.includes(item?._id);
        const isWishlisted = wishlistData?.includes(item?._id);
        return {
          ...item,
          liked: isWishlisted,
          addedToCart: isAdded,
        };
      });
      if (list) {
        if (values?.page === 1) {
          setValues('products', list);
        } else {
          setValues('products', [...values?.products, ...list]);
        }
      }
      setValues('isLoading', false);
      setValues('isRefreshing', false);
      setValues('isPagination', false);
    } catch (error: any) {
      Log('getAllProducts error', error);
      setValues('isLoading', false);
      setValues('isRefreshing', false);
      setValues('isPagination', false);
      Snackbar.show({text: error?.response?.data?.message});
    }
  };

  const getWishlistApi = async () => {
    /* API call for getting wishlist data */
    try {
      const {data} = await ecomInstance.get(constant.getWishlist, {
        headers: {
          auth: token,
        },
      });
      Log('getWishlist data', data);
      setValues('wishlistData', data?.data);
    } catch (error) {
      Log('getWishlist error', error);
    }
  };

  const onAllLike = async (item: AllProductsProps, index: number) => {
    
    const updatedProducts = [...values.allCategoryProducts];
    
    const isCurrentlyLiked = updatedProducts[index].liked;
    // Toggle like status locally
    updatedProducts[index].liked = !isCurrentlyLiked;
    setValues('products', updatedProducts);
    Vibration.vibrate(500);
    Snackbar.show({
      text: !isCurrentlyLiked ? 'Added to wishlist' : 'Removed from wishlist',
    });
    try {
      if (!isCurrentlyLiked) {
        // Add to wishlist
        const formData = {
          [params.productId]: item._id,
          [params.attributeId]: item.attributes?.[0]?._id,
          [params.attribute]: {
            [params.color]: item.attributes?.[0]?.Color,
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
        // Remove from wishlist
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
          Log('Removed from wishlist', data);
        }
      }

      // Refresh wishlist
      getWishlistApi();
      dispatch(getWishlist(token));
    } catch (error) {
      Log('Wishlist error', error);
    }
  };

  const onAllCartPress = async (id: string, index: number) => {
    const product = values?.allCategoryProducts[index];

    // Prevent if already added OR API call in progress
    if (product?.addedToCart || cartLoadingIndex === index) {
      navigation.navigate('ecomCart');
      return;
    }

    setCartLoadingIndex(index);
    try {
      const {data} = await ecomInstance.post(
        constant.addToCart,
        {
          [params?.productId]: id,
        },
        {
          headers: {
            auth: token,
          },
        },
      );
      Log('addToCart data', data);
      const list = [...values?.allCategoryProducts];
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


  const onLike = async (item: AllProductsProps, index: number) => {
    
    const updatedProducts = [...values.products];
    
    const isCurrentlyLiked = updatedProducts[index].liked;
    // Toggle like status locally
    updatedProducts[index].liked = !isCurrentlyLiked;
    setValues('products', updatedProducts);
    Vibration.vibrate(500);
    Snackbar.show({
      text: !isCurrentlyLiked ? 'Added to wishlist' : 'Removed from wishlist',
    });
    try {
      if (!isCurrentlyLiked) {
        // Add to wishlist
        const formData = {
          [params.productId]: item._id,
          [params.attributeId]: item.attributes?.[0]?._id,
          [params.attribute]: {
            [params.color]: item.attributes?.[0]?.Color,
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
        // Remove from wishlist
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
          Log('Removed from wishlist', data);
        }
      }

      // Refresh wishlist
      getWishlistApi();
      dispatch(getWishlist(token));
    } catch (error) {
      Log('Wishlist error', error);
    }
  };

  const onCartPress = async (id: string, index: number) => {
    const product = values?.products[index];

    // Prevent if already added OR API call in progress
    if (product?.addedToCart || cartLoadingIndex === index) {
      navigation.navigate('ecomCart');
      return;
    }

    setCartLoadingIndex(index);
    try {
      const {data} = await ecomInstance.post(
        constant.addToCart,
        {
          [params?.productId]: id,
        },
        {
          headers: {
            auth: token,
          },
        },
      );
      Log('addToCart data', data);
      const list = [...values?.products];
      list[index].addedToCart = true;
      setValues('products', list);
      Snackbar.show({text: 'Added to cart'});
      dispatch(getCartList(token));
    } catch (error) {
      Log('addToCart error', error);
    } finally {
      setCartLoadingIndex(null); // Allow future presses
    }
  };

  // const onLike = async (item: AllProductsProps, index: number) => {
  //   const temp = [...values?.products];
  //   temp[index].liked = temp[index]?.liked ? false : true;
  //   setValues('products', [...temp]);
  //   Vibration.vibrate(500);
  //   Snackbar.show({
  //     text: temp[index]?.liked ? 'Added to wishlist' : 'Removed from wishlist',
  //   });
  //   if (!item?.liked) {
  //     try {
  //       const formData = {
  //         [params?.productId]: item?._id,
  //         [params?.attributeId]: item?.attributes[0]?._id,
  //         [params?.attribute]: {
  //           [params?.color]: item?.attributes[0]?.Color,
  //           [params?.colorCode]: item?.attributes[0]?.colorCode,
  //           [params?.size]: item?.attributes[0]?.Size,
  //         },
  //       };
  //       const {data} = await ecomInstance.post(
  //         constant.addToWislist,
  //         formData,
  //         {headers: {auth: token}},
  //       );
  //       Log('addToWislist data', data);
  //       getWishlistApi();
  //     } catch (error) {
  //       Log('addToWislist error', error);
  //     }
  //   } else {
  //     try {
  //       let matchId = values?.wishlistData?.find(
  //         (item: GetWishlistProps) => item?.product?._id == item?._id,
  //       );
  //       const {data} = await ecomInstance.post(
  //         constant.removeFromWishlist,
  //         {
  //           [params?.id]: matchId,
  //         },
  //         {headers: {auth: token}},
  //       );
  //       Log('removeFromWishlist data', data);
  //       getWishlistApi();
  //     } catch (error) {
  //       Log('removeFromWishlist error', error);
  //     }
  //   }
  // };

  // const onCartPress = async (id: string, index: number) => {
  //   if (cartItem?.includes(id)) {
  //     navigation.navigate('ecomCart');
  //   } else {
  //     const list = [...values?.products];
  //     list[index].addedToCart = list[index]?.addedToCart ? false : true;
  //     setValues('products', [...list]);
  //     Vibration.vibrate(500);
  //     Snackbar.show({
  //       text: 'Added to cart',
  //     });
  //     try {
  //       const formData = {
  //         [params?.productId]: id,
  //       };
  //       const {data} = await ecomInstance.post(constant.addToCart, formData, {
  //         headers: {
  //           auth: token,
  //         },
  //       });
  //       dispatch(getCartList(token));
  //       Log('addToCart data', JSON.stringify(data?.data));
  //     } catch (error) {
  //       Log('addToCart error', error);
  //     }
  //   }
  // };

  const onPressProduct = (item: AllProductsProps) => {
    navigation.navigate('productDetails', {
      data: item,
    });
    dispatch(clearNotification());
  };

  const onEndReached = useCallback(
    (info: {distanceFromEnd: number}) => {
      if (!isNaN(info?.distanceFromEnd)) {
        setValues('isPagination', true);
        setValues('page', values?.page + 1);
      }
    },
    [values?.page],
  );

  const handleRefresh = useCallback(() => {
    setValues('isRefreshing', true);
    setValues('page', 1);
  }, []);

  return {
    category,
    onPressProduct,
    values,
    onLike,
    onCartPress,
    onEndReached,
    handleRefresh,
    notificationCount,
    onAllLike,
    onAllCartPress,
  };
};

export default useAllProducts;
