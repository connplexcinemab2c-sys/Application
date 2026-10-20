import {
  AuthNavigationProps,
  AuthParams,
} from '../../../navigation/stacks/authStack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

const useSuccessCheckout = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const route = useRoute<RouteProp<AuthParams, 'successCheckout'>>();
  const onPressContinue = () => {
    navigation.navigate('ecomHomePage');
  };
  const onPressOrderDetail = () => {
    navigation.navigate('orderHistory');
  };
  return {
    onPressContinue,
    onPressOrderDetail,
  };
};

export default useSuccessCheckout;
