import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  AuthNavigationProps,
  AuthParams,
} from '../../../navigation/stacks/authStack';
import useAppState from '../../../hooks/useAppState';
import {ecomInstance} from '../../../services/api/api';
import {useAppSelector} from '../../../services/config/redux/useReduxHooks';
import constant from '../../../services/config/constant';
import Log from '../../../utility/log';
import Snackbar from 'react-native-snackbar';

const useReturnOrder = () => {
  const route = useRoute<RouteProp<AuthParams, 'returnOrder'>>();
  const navigation = useNavigation<AuthNavigationProps>();
  const {token, userData} = useAppSelector(state => state.UserReducer);
  const [returnOrderState, setReturnOrderState, resetState, setNewValue] =
    useAppState({
      returnStep: 1,
      selectedOption: '',
      additionalComments: '',
      checked: false,
      selectedOptionError: '',
      additionalCommentsError: '',
      checkedError: '',
    });
  const productDetails = route?.params?.item;

  const validation = () => {
    let isValid = true;
    if (!returnOrderState.selectedOption) {
      isValid = false;
      returnOrderState.selectedOptionError =
        'Please select a Reason for Returning';
    } else {
      returnOrderState.selectedOptionError = '';
    }
    if (!returnOrderState.additionalComments) {
      isValid = false;
      returnOrderState.additionalCommentsError =
        'Please enter Additional Comments';
    } else {
      returnOrderState.additionalCommentsError = '';
    }
    if (!returnOrderState?.checked) {
      isValid = false;
      returnOrderState.checkedError = 'Please confirm';
    } else {
      returnOrderState.checkedError = '';
    }
    setNewValue({...returnOrderState});
    if (isValid) {
      setReturnOrderState('returnStep', 2);
    }
  };
  const onSelectAddress = async () => {
    try {
      const {data} = await ecomInstance?.post(
        constant.returnOrder,
        {
          id: productDetails?._id,
          reasonForReturn: returnOrderState?.selectedOption,
        },
        {
          headers: {
            auth: token,
          },
        },
      );
      if (data?.data) {
        navigation.navigate('returnOrderStep2', {item: route?.params?.item});
      }
    } catch (error: any) {
      Log('returnOrder error', error);
      Snackbar.show({
        text: error?.response?.data?.message ?? error?.message,
      });
    }
  };
  return {
    returnOrderState,
    setReturnOrderState,
    productDetails,
    validation,
    userData,
    onSelectAddress,
  };
};

export default useReturnOrder;
