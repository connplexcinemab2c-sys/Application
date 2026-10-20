import {useCallback, useEffect, useState} from 'react';
import {Vibration} from 'react-native';
import useAppState from '../../../hooks/useAppState';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {AuthParams} from '../../../navigation/stacks/authStack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import constant from '../../../services/config/constant';
import Log from '../../../utility/log';
import {ecomInstance} from '../../../services/api/api';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../services/config/redux/useReduxHooks';
import params from '../../../services/config/params';
import {
  AllCategories,
  AllProductsProps,
  GetWishlistProps,
  HomePageProps,
} from './ecomHomePageProps';
import Snackbar from 'react-native-snackbar';
import {
  getCartList,
  getWishlist,
  setFirstVisitDone,
  updateNotificationCount,
  updateNotificationData,
} from '../../../services/config/redux/userReducer/action';

const useEcomHomePage = () => {
  const navigation = useNavigation<NavigationProp<AuthParams>>();
  const {token, cartItem, wishlistData, notificationCount} = useAppSelector(
    state => state.UserReducer,
  );
  const [isHeartDisabled, setIsHeartDisabled] = useState(false);

  const dispatch = useAppDispatch();
  const drawerNavigation = useNavigation<DrawerNavigationProp<AuthParams>>();
  const [cartLoadingIndex, setCartLoadingIndex] = useState<number | null>(null);
  const [values, setValues] = useAppState<HomePageProps>({
    search: '',
    categories: [],
    selectedCategory: undefined,
    products: [],
    wishlistData: [],
    isLoading: false,
    bannerData: [],
    updateFlag: 0,
  });
  const onHeartPress = async () => {
    if (isHeartDisabled) return;

    setIsHeartDisabled(true);
    await onLike(item); // Make sure this is awaited
    setIsHeartDisabled(false);
  };
  const skipFields = ['productId', 'attributeId'];
  const filteredProducts = values.search
    ? values.products.filter(product =>
        product.name?.toLowerCase().includes(values.search.toLowerCase()),
      )
    : values.products;

  useEffect(() => {
    setValues('isLoading', true);
    getNotificationApi();
    dispatch(setFirstVisitDone(false));
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(getCartList(token));
      dispatch(getWishlist(token));
      getAllCategoriesApi();
      getWishlistApi();
      getBannerApi();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      getAllProductsApi();
      getWishlistApi();
    }, [cartItem, wishlistData, values?.updateFlag]),
  );

  const getAllCategoriesApi = async () => {
    try {
      const {data} = await ecomInstance.get(`${constant.getAllCategories}`);
      Log('getAllCategories data', JSON.stringify(data?.data));
      setValues('categories', data?.data);
    } catch (error) {
      Log('getAllCategories error', error);
      setValues('isLoading', false);
    }
  };

  const getAllProductsApi = async () => {
    try {
      const {data} = await ecomInstance.get(
        `${constant.getAllProducts}?page=1&limit=5`,
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
      setValues('products', list);
      setValues('isLoading', false);
    } catch (error) {
      Log('getAllProducts error', error);
      setValues('isLoading', false);
    }
  };

  const getWishlistApi = async () => {
    try {
      const {data} = await ecomInstance.get(constant.getWishlist, {
        headers: {
          auth: token,
        },
      });
      Log('getWishlist data', JSON.stringify(data?.data));
      setValues('wishlistData', data?.data);
    } catch (error) {
      Log('getWishlist error', error);
      setValues('isLoading', false);
    }
  };

  const getBannerApi = async () => {
    try {
      const {data} = await ecomInstance.get(constant.getAllBanner, {
        headers: {
          auth: token,
        },
      });
      Log('getAllBanner data', JSON.stringify(data?.data));
      setValues('bannerData', data?.data);
    } catch (error) {
      Log('getAllBanner error', error);
      setValues('isLoading', false);
    }
  };

  const getNotificationApi = async () => {
    try {
      const {data} = await ecomInstance.get(constant.getNotification, {
        headers: {
          auth: token,
        },
      });
      Log('getNotification data', JSON.stringify(data?.data));
      dispatch(updateNotificationCount(data?.data?.totalCount));
      dispatch(updateNotificationData(data?.data));
    } catch (error) {
      Log('getNotification error', error);
    }
  };

  const onLike = async (item: AllProductsProps) => {
    const updatedProducts = values.products.map(product =>
      product._id === item._id ? {...product, liked: !product.liked} : product,
    );

    setValues('products', updatedProducts);
    Vibration.vibrate(500);
    Snackbar.show({
      text: !item.liked ? 'Added to wishlist' : 'Removed from wishlist',
    });

    try {
      if (!item.liked) {
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

  const onCartPress = async (id: string, index: number) => {
    const product = values?.products[index];

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
      setCartLoadingIndex(null);
    }
  };
  const onPressProduct = (item: AllProductsProps) => {
    navigation.navigate('productDetails', {
      data: item,
    });
  };

  const onPressCart = () => {
    navigation.navigate('ecomCart');
  };

  const onPressNotification = () => {
    navigation.navigate('ecomNotification');
  };

  const showAllProducts = (name: string) => {
    navigation.navigate('allProducts', {
      category: name,
      data: values?.products,
    });
  };
  const showCategoryProducts = (name: string, data: AllCategories) => {
    setValues('selectedCategory', data);
    navigation.navigate('allProducts', {
      category: name,
      data: data,
      type: 'category',
    });
  };
  const onPressMenu = () => {
    drawerNavigation.openDrawer();
  };
  return {
    values,
    setValues,
    onPressProduct,
    onPressCart,
    onPressNotification,
    showAllProducts,
    onPressMenu,
    showCategoryProducts,
    onLike,
    onCartPress,
    cartItem,
    filteredProducts,
    isHeartDisabled,
    notificationCount,
  };
};

export default useEcomHomePage;
