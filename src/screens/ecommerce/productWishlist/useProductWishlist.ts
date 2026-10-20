import {Vibration} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {AuthNavigationProps} from '../../../navigation/stacks/authStack';
import useAppState from '../../../hooks/useAppState';
import {useCallback, useEffect} from 'react';
import {ecomInstance} from '../../../services/api/api';
import constant from '../../../services/config/constant';
import Log from '../../../utility/log';
import params from '../../../services/config/params';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../services/config/redux/useReduxHooks';
import {
  GetWishlistProps,
  WishListProducts,
} from '../ecomHomePage/ecomHomePageProps';
import Snackbar from 'react-native-snackbar';
import {getCartList} from '../../../services/config/redux/userReducer/action';

interface ProductWishlistProps {
  productWishlist: GetWishlistProps[];
  isLoading: boolean;
}
const useProductWishlist = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const {token, cartItem, notificationCount} = useAppSelector(
    state => state.UserReducer,
  );
  const dispatch = useAppDispatch();
  const [values, setValues] = useAppState<ProductWishlistProps>({
    productWishlist: [],
    isLoading: false,
  });

  useEffect(() => {
    setValues('isLoading', true);
  }, []);

  useFocusEffect(
    useCallback(() => {
      getWishlistApi();
    }, []),
  );

  const getWishlistApi = async () => {
    try {
      const {data} = await ecomInstance.get(constant.getWishlist, {
        headers: {
          auth: token,
        },
      });

      const list = data?.data?.map((item: GetWishlistProps) => {
        const isAdded = cartItem?.includes(item?.product?._id);
        return {
          ...item,
          objectId: item?._id,
          liked: true,
          addedToCart: isAdded,
        };
      });

      setValues('productWishlist', list);
      setValues('isLoading', false);
    } catch (error: any) {
      Log('getWishlist error', error.response.data);
      setValues('isLoading', false);
    }
  };
  const onRemoveWishlist = async (id: string) => {
    const list = values?.productWishlist?.filter(item => item?.objectId !== id);
    setValues('productWishlist', [...list]);
    try {
      const {data} = await ecomInstance.post(
        constant.removeFromWishlist,
        {
          [params?.id]: id,
        },
        {headers: {auth: token}},
      );
      Log('removeFromWishlist data', data);
      getWishlistApi();
    } catch (error) {
      Log('removeFromWishlist error', error);
    }
  };

  const onCartPress = async (id: string, index: number) => {
    if (cartItem?.includes(id)) {
      navigation.navigate('ecomCart');
    } else {
      try {
        const list = [...values?.productWishlist];
        list[index].addedToCart = list[index]?.addedToCart ? false : true;
        setValues('productWishlist', [...list]);
        Vibration.vibrate(500);
        Snackbar.show({
          text: 'Added to cart',
        });
        const {data} = await ecomInstance.post(
          constant.addToCart,
          {
            [params?.productId]: id,
          },
          {headers: {auth: token}},
        );
        Log('addToCart data', data);
        dispatch(getCartList(token));
      } catch (error) {
        Log('addToCart error', error);
      }
    }
  };

  const onPressProduct = (item: WishListProducts) => {
    navigation.navigate('productDetails', {
      data: item?.product,
    });
  };

  const onPressWishlist = () => {
    navigation.goBack();
  };

  return {
    onPressProduct,
    onPressWishlist,
    values,
    onRemoveWishlist,
    onCartPress,
    notificationCount,
  };
};

export default useProductWishlist;
