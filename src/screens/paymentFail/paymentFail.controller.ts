import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import {BackHandler} from 'react-native';

const PaymentFailController = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  useEffect(() => {
    const backAction = () => {
      onClickHome();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const onClick = () => {
    navigation.navigate('bottom', {screen: 'membership'});
  };

  const onDetail = () => {
    navigation.replace('bookingHistoryDetails', {
      transactionId: route?.params?.transactionId,
      screen: 'failPayment',
    });
  };

  const onClickHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'bottom'}],
    });
  };

  return {onClick, route, onClickHome, onDetail};
};

export default PaymentFailController;
