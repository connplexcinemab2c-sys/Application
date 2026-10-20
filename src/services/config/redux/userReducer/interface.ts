export interface UserReducerState {
  userData?: UserObject;
  token: string | undefined;
  isLogin: boolean;
  cityData: any;
  editProfile: any;
  loginType?: string;
  showModal: boolean;
  cityModal?: boolean;
  updateSwitch?: any;
  cartItem: string[];
  selectedAddress?: any;
  wishlistData: string[];
  cartList: any;
  wishListAll: any;
  notificationCount: number;
  notifications?: any;
  firstVisitDone: boolean;
}

export interface UserObject {
  _id: string;
  token: string;
  subscriptionDetails?: any;
  mobileNumber: number;
  email: string;
  address: string;
  city: string;
  maritalStatus: string;
  accessToken: string;
  birthDate: null;
  createdAt: string;
  deletedStatus: number;
  fcmToken: string;
  firstName: string;
  id: string;
  isAccountVerified: number;
  isActive: false;
  lastName: string;
  login_type: string;
  otp: null;
  otpExpiryDate: string;
  profile: string;
  providerId: string;
  source: string;
  totalRewards: number;
  updatedAt: string;
}
