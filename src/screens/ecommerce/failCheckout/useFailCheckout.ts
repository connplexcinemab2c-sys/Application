import {AuthNavigationProps} from '../../../navigation/stacks/authStack';
import {useNavigation} from '@react-navigation/native';

const useFailCheckout = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const onPressContinue = () => {
    navigation.navigate('ecomHomePage');
  };
  return {
    onPressContinue,
  };
};

export default useFailCheckout;
