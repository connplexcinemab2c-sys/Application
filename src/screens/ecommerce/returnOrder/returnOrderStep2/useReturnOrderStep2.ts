import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  AuthNavigationProps,
  AuthParams,
} from '../../../../navigation/stacks/authStack';
import useAppState from '../../../../hooks/useAppState';

const useReturnOrderStep2 = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const route = useRoute<RouteProp<AuthParams, 'returnOrderStep2'>>();
  const [returnOrder2State, setReturnOrder2State] = useAppState({
    currentStep: 1,
  });
  const productDetails = route?.params?.item;
  const onDone = () => {
    navigation.navigate('orderHistory');
  };
  return {productDetails, onDone, returnOrder2State};
};

export default useReturnOrderStep2;
