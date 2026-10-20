import {notificationData} from '../../../../screens/ecommerce/ecomNotification/ecomNotification.const';
import {UserReducerState} from './interface';
import types from './types';

const initialState: UserReducerState = {
  userData: undefined,
  loginType: undefined,
  token: undefined,
  isLogin: false,
  cityData: undefined,
  editProfile: undefined,
  showModal: true,
  cityModal: true,
  updateSwitch: undefined,
  cartItem: [],
  cartList: [],
  selectedAddress: undefined,
  wishlistData: [],
  wishListAll: [],
  notificationCount: 0,
  notifications: undefined,
  firstVisitDone: false,
};

const UserReducer = (state: UserReducerState = initialState, action: any) => {
  switch (action.type) {
    case types.loginSuccess:
      return {
        ...state,
        userData: action.payload,
        token: action.payload.token,
        isLogin: true,
      };
    case types.cityData:
      return {
        ...state,
        cityData: action.payload,
      };
    case types.editProfile:
      return {
        ...state,
        userData: action.payload,
      };
    case types.setLoginType:
      return {
        ...state,
        loginType: action.payload,
      };
    case types.modalState:
      return {
        ...state,
        showModal: action.payload,
      };
    case types.cityModalState:
      return {
        ...state,
        cityModal: action.payload,
      };
    case types.updateState:
      return {
        ...state,
        updateSwitch: action.payload,
      };
    case types.selectedAddress:
      return {
        ...state,
        selectedAddress: action.payload,
      };
    case types.cartData:
      return {
        ...state,
        cartItem: action.payload,
      };
    case types.cartItems:
      return {
        ...state,
        cartList: action.payload,
      };
    case types.wishlistData:
      return {
        ...state,
        wishlistData: action.payload,
      };
    case types.wishListAll:
      return {
        ...state,
        wishListAll: action.payload,
      };
    case types.setNotificationData:
      return {
        ...state,
        notifications: action.payload,
      };
    case types.setNotificationCount:
      return {
        ...state,
        notificationCount: action.payload,
      };
    case types.clearNotificationCount:
      return {
        ...state,
        notificationCount: 0,
      };
    case types.setFirstVisitDone:
      return {
        ...state,
        firstVisitDone: action.payload,
      };
    // case types.logout:
    //   return initialState;
    case types.logout:
      return {
        ...initialState,
        firstVisitDone: false,
      };
    default:
      return state;
  }
};

export default UserReducer;
