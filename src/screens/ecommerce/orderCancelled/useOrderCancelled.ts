import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import useAppState from '../../../hooks/useAppState';
import {
  AuthNavigationProps,
  AuthParams,
} from '../../../navigation/stacks/authStack';
import {ecomInstance} from '../../../services/api/api';
import constant from '../../../services/config/constant';
import {useAppSelector} from '../../../services/config/redux/useReduxHooks';
import Log from '../../../utility/log';
import Snackbar from 'react-native-snackbar';

const useOrderCancelled = () => {
  const route = useRoute<RouteProp<AuthParams, 'orderCancelled'>>();
  const {token} = useAppSelector(state => state.UserReducer);
  const navigation = useNavigation<AuthNavigationProps>();
  const [orderCancelledState, setOrderCancelledState, resetState, setNewValue] =
    useAppState({
      orderCancel: true,
      selectedOption: '',
      additionalComments: '',
      selectedOptionError: '',
      additionalCommentsError: '',
    });
  const productDetails = route?.params?.item;
  const onDone = () => {
    navigation.goBack();
  };
  const validation = () => {
    let isValid = true;
    if (!orderCancelledState.selectedOption) {
      isValid = false;
      orderCancelledState.selectedOptionError =
        'Please select a Reason for Cancellation';
    } else {
      orderCancelledState.selectedOptionError = '';
    }
    if (!orderCancelledState.additionalComments) {
      isValid = false;
      orderCancelledState.additionalCommentsError =
        'Please enter Additional Comments';
    } else {
      orderCancelledState.additionalCommentsError = '';
    }
    setNewValue({...orderCancelledState});
    if (isValid) {
      onCancelOrder();
    }
  };
  const onCancelOrder = async () => {
    try {
      const {data} = await ecomInstance.post(
        constant.orderCancellation,
        {
          id: productDetails?._id,
          reasonForCancellation: orderCancelledState?.selectedOption,
          additionalComment: orderCancelledState?.additionalComments,
          orderCancelled: true,
        },
        {
          headers: {
            auth: token,
          },
        },
      );
      Log('orderCancellation data', data);
      setOrderCancelledState('orderCancel', false);
    } catch (error: any) {
      Log('orderCancellation error', error);
      Snackbar.show({
        text: error?.response?.data?.message ?? error?.message,
      });
    }
  };
  return {
    orderCancelledState,
    productDetails,
    setOrderCancelledState,
    onDone,
    validation,
  };
};

export default useOrderCancelled;
