import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  AuthNavigationProps,
  AuthParams,
} from '../../../../navigation/stacks/authStack';
import useAppState from '../../../../hooks/useAppState';

const useExchangeOrderStep2 = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const route = useRoute<RouteProp<AuthParams, 'exchangeOrderStep2'>>();
  const [exchangeOrder2State, setExchangeOrder2State] = useAppState({
    currentStep: 1,
  });
  const productDetails = route?.params?.item;
  const onDone = () => {
    navigation.navigate('orderHistory');
  };
  return {productDetails, onDone, exchangeOrder2State, route};
};

export default useExchangeOrderStep2;
