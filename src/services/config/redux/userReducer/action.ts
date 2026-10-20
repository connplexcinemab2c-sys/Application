import {GetWishlistProps} from '../../../../screens/ecommerce/ecomHomePage/ecomHomePageProps';
import Log from '../../../../utility/log';
import axiosInstance from '../../../api';
import {ecomInstance} from '../../../api/api';
import constant from '../../constant';
import {UserReducerState} from './interface';
import types from './types';

export const loginSuccess = (payload: any) => ({
  type: types.loginSuccess,
  payload,
});


export const activePlan = (payload: any) => ({
  type: types.activePlan,
  payload,
});


export const setLoginType = (payload: any) => ({
  type: types.setLoginType,
  payload,
});

export const changeModalState = (payload: any) => ({
  type: types.modalState,
  payload,
});

export const changeCityModalState = (payload: any) => ({
  type: types.cityModalState,
  payload,
});

export const logoutSuccess = () => ({
  type: types.logout,
});

export const cityData = (payload: UserReducerState) => ({
  type: types.cityData,
  payload,
});

export const editProfiles = (payload: any) => ({
  type: types.editProfile,
  payload,
});

export const updateCartData = (payload: any) => ({
  type: types.cartData,
  payload,
});
export const updateCartList = (payload: any) => ({
  type: types.cartItems,
  payload,
});

export const updateWishlist = (payload: any) => ({
  type: types.wishlistData,
  payload,
});
export const updateWishListData = (payload: any) => ({
  type: types.wishListAll,
  payload,
});

export const updateData = (payload: any) => ({
  type: types.updateState,
  payload,
});
export const updateSelectedAddress = (payload: any) => ({
  type: types.selectedAddress,
  payload,
});

export const updateNotificationData = (payload: any) => ({
  type: types.setNotificationData,
  payload,
});
export const updateNotificationCount = (payload: number) => ({
  type: types.setNotificationCount,
  payload,
});

export const clearNotification = () => ({
  type: types.clearNotificationCount,
});

export const setFirstVisitDone = (payload: boolean) => ({
  type: types.setFirstVisitDone,
  payload,
});

export const getUserDetail = (token?: string) => {
  return (dispatch: any) => {
    axiosInstance
      .get(constant.userInfo, {
        headers: {
          auth: `${token}`,
        },
      })
      .then(res => {
        dispatch(editProfiles(res?.data?.data));
      })
      .catch(e => {});
  };
};

export const getCartList = (token?: string) => {
  /* API call for getting cart list */
  return async (dispatch: any) => {
    try {
      const {data} = await ecomInstance.get(constant.getAllCart, {
        headers: {
          auth: `${token}`,
        },
      });
      const list = data?.data?.cartItems?.map(item => item?.productId?._id);
      const cartItems = data?.data?.cartItems;
      dispatch(updateCartData(list));
      dispatch(updateCartList(cartItems));
    } catch (error) {
      Log('cart list error', error);
    }
  };
};

export const getWishlist = (token?: string) => {
  /* API call for getting wishlist */
  return async (dispatch: any) => {
    try {
      const {data} = await ecomInstance.get(constant.getWishlist, {
        headers: {
          auth: token,
        },
      });
      Log('getWishlist data', data?.data);
      const list = data?.data?.map(
        (item: GetWishlistProps) => item?.product?._id,
      );
      const wishList = data?.data;
      dispatch(updateWishlist(list));
      dispatch(updateWishListData(wishList));
    } catch (error) {
      Log('getWishlist error', error);
    }
  };
};
