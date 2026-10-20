import {useNavigation} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {ItemProps} from '../../components/cards/cinemaList/cinemaList.interface';
import TheatreSeats from '../../screens/theatreSeats/TheatreSeats';
import AboutUs from '../../screens/aboutUS/AboutUs';
import ApplyFranchise from '../../screens/applyFranchise/ApplyFranchise';
import CreatePassword from '../../screens/auth/createPassword/CreatePassword';
import ForgotPassword from '../../screens/auth/forgotPassword/ForgotPassword';
import SignupOtp from '../../screens/auth/signupOtp/SignupOtp';
import VerifyOtp from '../../screens/auth/verifyOtp/VerifyOtp';
import BookingHistory from '../../screens/bookingHistory/BookingHistory';
import BookingHistoryDetails from '../../screens/bookingHistoryDetails/BookingHistoryDetails';
import ComingSoonDetails from '../../screens/comingSoonDetails/ComingSoonDetails';
import ContactUs from '../../screens/contactUS/ContactUs';
import CouponList from '../../screens/CouponList/CouponList';
import Address from '../../screens/ecommerce/address/Address';
import AllProducts from '../../screens/ecommerce/allProducts/AllProducts';
import EcomCart from '../../screens/ecommerce/ecomCart/EcomCart';
import EcomNotification from '../../screens/ecommerce/ecomNotification/EcomNotification';
import EcomPayment from '../../screens/ecommerce/ecomPayment/EcomPayment';
import ExchangeOrder from '../../screens/ecommerce/exchangeOrder/ExchangeOrder';
import ExchangeOrderStep2 from '../../screens/ecommerce/exchangeOrder/exchangeOrderStep2/ExchangeOrderStep2';
import FailCheckout from '../../screens/ecommerce/failCheckout/FailCheckout';
import FailOrder from '../../screens/ecommerce/failOrder/FailOrder';
import OrderCancelled from '../../screens/ecommerce/orderCancelled/OrderCancelled';
import OrderDetail from '../../screens/ecommerce/orderDetail/OrderDetail';
import OrderHistory from '../../screens/ecommerce/orderHistory/OrderHistory';
import ProductDetails from '../../screens/ecommerce/productDetails/ProductDetails';
import ProductWishlist from '../../screens/ecommerce/productWishlist/ProductWishlist';
import ReturnOrder from '../../screens/ecommerce/returnOrder/ReturnOrder';
import ReturnOrderStep2 from '../../screens/ecommerce/returnOrder/returnOrderStep2/ReturnOrderStep2';
import SuccessCheckout from '../../screens/ecommerce/successCheckout/SuccessCheckout';
import EditProfile from '../../screens/editProfile/EditProfile';
import EmailAddress from '../../screens/emailAddress/EmailAddress';
import Filters from '../../screens/filters/Filters';
import HelpSupport from '../../screens/helpSupport/HelpSupport';
import InvestorSection from '../../screens/investorSection/InvestorSection';
import LegalNotice from '../../screens/legalNotice/LegalNotice';
import LoyaltyPoints from '../../screens/loyaltyPoints/LoyaltyPoints';
import Memebership from '../../screens/membership/Memebership';
import MemberShipDetails from '../../screens/membershipDetail/MemberShipDetails';
import MembershipList from '../../screens/membershipList/MembershipList';
import MovieDetails from '../../screens/movieDetails/MovieDetails';
import MoviesPerCinema from '../../screens/moviesPerCinema/MoviesPerCinema';
import MovieTicket from '../../screens/movieTicket/MovieTicket';
import MyProfile from '../../screens/myprofile/MyProfile';
import Notifications from '../../screens/notifications/Notifications';
import Payment from '../../screens/payment/Payment';
import PaymentFail from '../../screens/paymentFail/PaymentFail';
import PaymentSuccess from '../../screens/paymentSuccess/PaymentSuccess';
import PremiumDetail from '../../screens/premiumDetail/PremiumDetail';
import PrivacyPolicy from '../../screens/privacyPolicy/PrivacyPolicy';
import Remainder from '../../screens/remainder/Remainder';
import Rewards from '../../screens/rewards/Rewards';
import SearchMovies from '../../screens/searchMovies/SearchMovies';
import SeatBooking from '../../screens/seatBooking/SeatBooking';
import SelectCity from '../../screens/selectCity/SelectCity';
import SessionOut from '../../screens/sessionOut/SessionOut';
import TermsConditions from '../../screens/termsConditions/TermsConditions';
import TwentyMinutesFranchise from '../../screens/twentyMinutesFranchise/TwentyMinutesFranchise';
import WelcomeGift from '../../screens/welcomeGift/WelcomeGift';
import {useAppSelector} from '../../services/config/redux/useReduxHooks';
import BottomTab from '../bottomTab/BottomTab';
import ECommerceDrawer from '../drawer/ECommerceDrawer';
import screenName from '../screenName';

const Stack = createStackNavigator();

export type AuthParams = {
  signupOtp:
    | {data?: any; flag?: string; number?: string | undefined}
    | undefined;
  selectCity: {flag?: string} | undefined;
  homeScreen: {
    item?: any;
  };
  movieDetails: {movieId: any} | undefined;
  seatBooking:
    | {
        cinemaDetails: {cinemaId: string; cinemaNumberId: string};
        selectTime: string;
        movieDetail: any;
        movieName?: string;
        selectedDate?: string;
        flag?: string;
        area?: string;
      }
    | undefined;
  // seatBooking: {movieId: number} | undefined;
  payment:
    | {
        id: string;
        cinemaName: string;
        transactionId: string;
        movieId: string;
        totalTicket: number;
        ticketPrice: number;
        time: string;
        selectedSeat: string[];
        movieSessionId?: string;
        pGroupCode?: string;
        areaCatCode?: string;
        flag?: string;
        coupon?: any;
        language?: any;
      }
    | undefined;
  movieTicket: {transactionId?: string} | undefined;
  cinemas: undefined;
  bottom: undefined;
  bookingHistory: undefined;
  searchMovies: {type?: string} | undefined;
  filters: undefined;
  forgotPassowrd: undefined;
  createPassowrd: {
    userId: number;
  };
  verifyOtp: {
    id: number;
  };
  snacksList: undefined;
  editProfile: undefined;
  remainder: undefined;
  membership: undefined;
  loyaltyPoints: undefined;
  aboutUs: undefined;
  termsConditions: undefined;
  privacyPolicy: undefined;
  investorSection: undefined;
  helpSupport: undefined;
  legalNotice: undefined;
  contactUs: undefined;
  applyFranchise: undefined;
  bookingHistoryDetails: {transactionId: string; screen?: string} | undefined;
  theatreSeats:
    | {
        movieId?: string;
        movieName?: string;
        censorRating?: string;
        flag?: string;
        languages?: any;
        showExtendedDays?: number;
      }
    | undefined;
  emailAddress: {
    name: string;
  };
  moviesPerCinema: {data?: ItemProps} | undefined;
  twentyMinutesFranchise: undefined;
  comingSoonDetails: {id: string} | undefined;
  notifications: undefined;
  sessionOut: undefined;
  couponList: {data: any} | undefined;
  premiumDetail: {data: any} | undefined;
  membershipList: undefined;
  paymentSuccess: {data: any} | undefined;
  rewards: undefined;
  paymentFail: {transactionId?: string} | undefined;
  ecomHomePage: undefined;
  productDetails: {
    data: any;
  };
  ecomCart: undefined;
  successCheckout: {id: number} | undefined;
  ecomNotification: undefined;
  productWishlist: undefined;
  allProducts: {
    category: string;
    data?: any;
    type?: string;
  };
  address: {address?: any; selectedAddress?: any} | undefined;
  failCheckout: undefined;
  orderHistory: undefined;
  orderDetail: {item: any} | {orderId: string} | undefined;
  orderCancelled: {item: any} | undefined;
  returnOrder: {item: any} | undefined;
  returnOrderStep2: {item: any} | undefined;
  exchangeOrder: {item: any} | undefined;
  exchangeOrderStep2: {item: any; newSize: string} | undefined;
  ecomPayment: {url: string};
  welcomeGift: undefined;
};

export type AuthNavigationProps = StackNavigationProp<AuthParams>;

const AuthStack = () => {
  const {token, cityData} = useAppSelector(state => state.UserReducer);
  const navigation = useNavigation<AuthNavigationProps>();
  const [latestVersion, setLatestVersion] = useState<string>();
  const [storeUrl, setStoreUrl] = useState<string>();
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  // const currentVersion = VersionCheck.getCurrentVersion();
  let isUpdate = false;

  useEffect(() => {
    // getLatestVersion();
  }, []);

  const route = () => {
    /* Navigation auth */
    return screenName.bottom;
  };

  // const getLatestVersion = async () => {
  //   let latestVersion;
  //   if (Platform.OS === 'ios') {
  //     const packageName = VersionCheck.getPackageName();
  //     const countryName = 'in';
  //     latestVersion = await fetch(
  //       `https://itunes.apple.com/${countryName.toLowerCase()}/lookup?bundleId=${packageName}`,
  //     )
  //       .then(r => r.json())
  //       .then(res => {
  //         return res?.results[0]?.version;
  //       })
  //       .catch((e: any) => {
  //         Log('getLatestVersion error', e);
  //       });
  //     setLatestVersion(latestVersion);
  //   } else {
  //     try {
  //       latestVersion = await VersionCheck.getLatestVersion();
  //       setLatestVersion(latestVersion);
  //     } catch (e: any) {
  //       Log('android getLatestVersion error', e);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (latestVersion) {
  //     isUpdate =
  //       currentVersion !== latestVersion && currentVersion < latestVersion;
  //     setShowUpdate(isUpdate);
  //   }
  // }, [latestVersion]);

  // VersionCheck.getStoreUrl({
  //   appID: Platform.OS === 'ios' ? '6497171599' : undefined,
  //   packageName: Platform.OS === 'ios' ? 'com.app.connplex' : 'com.connplex',
  // })
  //   .then(url => {
  //     setStoreUrl(url);
  //   })
  //   .catch(error =>
  //     Snackbar.show({
  //       text: error,
  //     }),
  //   );

  // const onCancel = (): void => {
  //   setShowUpdate(false);
  // };

  // const onUpdate = (): void => {
  //   setShowUpdate(false);
  //   if (storeUrl) {
  //     Linking.openURL(storeUrl);
  //   }
  // };

  // const AppUpdateModal = () => {
  //   return (
  //     <AppUpdate visible={showUpdate} onCancel={onCancel} onUpdate={onUpdate} />
  //   );
  // };

  return (
    <Stack.Navigator
      initialRouteName={route()}
      detachInactiveScreens={true}
      screenOptions={{
        cardOverlayEnabled: true,
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={screenName.signupOtp} component={SignupOtp} />
      <Stack.Screen
        name={screenName.selectCity}
        component={SelectCity}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen name={screenName.bottom} component={BottomTab} />
      <Stack.Screen name={screenName.seatBooking} component={SeatBooking} />
      <Stack.Screen name={screenName.movieDetails} component={MovieDetails} />
      <Stack.Screen
        name={screenName.payment}
        component={Payment}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name={screenName.movieTicket}
        component={MovieTicket}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name={screenName.bookingHistory}
        component={BookingHistory}
      />
      <Stack.Screen
        name={screenName.bookingHistoryDetails}
        component={BookingHistoryDetails}
      />
      <Stack.Screen name={screenName.searchMovies} component={SearchMovies} />
      <Stack.Screen name={screenName.filters} component={Filters} />
      <Stack.Screen
        name={screenName.createPassowrd}
        component={CreatePassword}
      />
      <Stack.Screen
        name={screenName.forgotPassowrd}
        component={ForgotPassword}
      />
      <Stack.Screen name={screenName.verifyOtp} component={VerifyOtp} />
      <Stack.Screen name={screenName.editProfile} component={EditProfile} />
      <Stack.Screen name={screenName.remainder} component={Remainder} />
      <Stack.Screen name={screenName.membership} component={Memebership} />
      <Stack.Screen name={screenName.loyaltyPoints} component={LoyaltyPoints} />
      <Stack.Screen
        name={screenName.sessionOut}
        component={SessionOut}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen name={screenName.aboutUs} component={AboutUs} />
      <Stack.Screen
        name={screenName.termsConditions}
        component={TermsConditions}
      />
      <Stack.Screen name={screenName.privacyPolicy} component={PrivacyPolicy} />
      <Stack.Screen name={screenName.contactUs} component={ContactUs} />
      <Stack.Screen name={screenName.helpSupport} component={HelpSupport} />
      <Stack.Screen name={screenName.legalNotice} component={LegalNotice} />

      <Stack.Screen
        name={screenName.investorSection}
        component={InvestorSection}
      />
      <Stack.Screen
        name={screenName.applyFranchise}
        component={ApplyFranchise}
      />
      <Stack.Screen name={screenName.emailAddress} component={EmailAddress} />
      <Stack.Screen name={screenName.theatreSeats} component={TheatreSeats} />
      <Stack.Screen
        name={screenName.moviesPerCinema}
        component={MoviesPerCinema}
      />
      <Stack.Screen
        name={screenName.twentyMinutesFranchise}
        component={TwentyMinutesFranchise}
      />
      <Stack.Screen
        name={screenName.comingSoonDetails}
        component={ComingSoonDetails}
      />
      <Stack.Screen name={screenName.notifications} component={Notifications} />
      <Stack.Screen name={screenName.couponList} component={CouponList} />
      <Stack.Screen
        name={screenName.premiumDetail}
        component={PremiumDetail}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen name="memebrshipDetails" component={MemberShipDetails} />

      <Stack.Screen
        name={screenName.membershipList}
        component={MembershipList}
      />
      <Stack.Screen
        name={screenName.paymentSuccess}
        component={PaymentSuccess}
      />
      <Stack.Screen name={screenName.rewards} component={Rewards} />
      <Stack.Screen
        name={screenName.paymentFail}
        component={PaymentFail}
        options={{gestureEnabled: false}}
      />

      <Stack.Group>
        <Stack.Screen name="ecomHomePage" component={ECommerceDrawer} />
        <Stack.Screen name="productDetails" component={ProductDetails} />
        <Stack.Screen name="ecomCart" component={EcomCart} />
        <Stack.Screen name="successCheckout" component={SuccessCheckout} />
        <Stack.Screen name="ecomNotification" component={EcomNotification} />
        <Stack.Screen name="productWishlist" component={ProductWishlist} />
        <Stack.Screen name="allProducts" component={AllProducts} />
        <Stack.Screen name="address" component={Address} />
        <Stack.Screen name="failCheckout" component={FailCheckout} />
        <Stack.Screen name="orderHistory" component={OrderHistory} />
        <Stack.Screen name="orderDetail" component={OrderDetail} />
        <Stack.Screen name="orderCancelled" component={OrderCancelled} />
        <Stack.Screen name="returnOrder" component={ReturnOrder} />
        <Stack.Screen name="returnOrderStep2" component={ReturnOrderStep2} />
        <Stack.Screen name="exchangeOrder" component={ExchangeOrder} />
        <Stack.Screen
          name="exchangeOrderStep2"
          component={ExchangeOrderStep2}
        />
        <Stack.Screen name="ecomPayment" component={EcomPayment} />
        <Stack.Screen name="orderFail" component={FailOrder} />
        <Stack.Screen name="myProfile" component={MyProfile} />
        <Stack.Screen name="welcomeGift" component={WelcomeGift} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthStack;
