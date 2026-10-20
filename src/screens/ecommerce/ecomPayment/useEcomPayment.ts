import {Alert, Linking} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {WebViewNavigation} from 'react-native-webview';
import {
  AuthNavigationProps,
  AuthParams,
} from '../../../navigation/stacks/authStack';
import constant from '../../../services/config/constant';
import {getCartList} from '../../../services/config/redux/userReducer/action';
import Log from '../../../utility/log';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../services/config/redux/useReduxHooks';

const useEcomPayment = () => {
  const navigation = useNavigation<AuthNavigationProps>();

  const {token, cartItem} = useAppSelector(state => state?.UserReducer);

  const dispatch = useAppDispatch();

  const route = useRoute<RouteProp<AuthParams, 'ecomPayment'>>();

  const injectedJavascript = `const meta = document.createElement('meta'); meta.setAttribute('name', 'viewport'); meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'); document.getElementsByTagName('head')[0].appendChild(meta);`;

  const handleNavigationState = (data: WebViewNavigation) => {
    
    if (data.url.includes('order-confirmation')) {
      navigation.navigate('successCheckout', {id: 2222222});
      dispatch(getCartList(token));
    }
    if (data.url.includes('fail')) {
      navigation.navigate('failCheckout');
    }
    if (data.url.includes('cancel')) {
      navigation.navigate('failCheckout');
    }
  };

  const handleShouldStartLoadWithRequest = (request: any) => {
    Log('request', request);
    const {url} = request;
    if (
      url.includes('phonepe://pay?') ||
      url.includes('paytmmp://pay?') ||
      url.includes('tez://upi/pay?') ||
      url.includes('upi://pay?')
    ) {
      Linking.openURL(url);
      return false;
    }
    return true;
  };

  return {
    cartItem,
    route,
    injectedJavascript,
    handleNavigationState,
    handleShouldStartLoadWithRequest,
  };
};

export default useEcomPayment;
