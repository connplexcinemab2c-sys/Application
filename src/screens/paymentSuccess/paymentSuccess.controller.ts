import {useNavigation, useRoute} from '@react-navigation/native';
import screenName from '../../navigation/screenName';

const paymentSuccessController = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const onClick = () => {
    navigation?.navigate(screenName.homeScreen);
  };

  return {onClick, route};
};

export default paymentSuccessController;
