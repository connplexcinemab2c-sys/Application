import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  AuthNavigationProps,
  AuthParams,
} from '../../../navigation/stacks/authStack';
import useAppState from '../../../hooks/useAppState';
import {useAppSelector} from '../../../services/config/redux/useReduxHooks';
import {ecomInstance} from '../../../services/api/api';
import constant from '../../../services/config/constant';
import Log from '../../../utility/log';
import Snackbar from 'react-native-snackbar';

const useExchangeOrder = () => {
  const route = useRoute<RouteProp<AuthParams, 'exchangeOrder'>>();
  const navigation = useNavigation<AuthNavigationProps>();
  const {token, userData} = useAppSelector(state => state.UserReducer);
  const [exchangeOrderState, setExchangeOrderState, resetState, setNewValue] =
    useAppState({
      exchangeStep: 1,
      selectedOption: '',
      additionalComments: '',
      checked: false,
      activeProductSize: '',
      activeProductSizeError: '',
      selectedOptionError: '',
      additionalCommentsError: '',
      checkedError: '',
    });
  const productDetails = route?.params?.item;
  const validation = () => {
    let isValid = true;
    if (!exchangeOrderState.activeProductSize) {
      isValid = false;
      exchangeOrderState.activeProductSizeError =
        'Please select an Exchanging size';
    } else {
      exchangeOrderState.activeProductSizeError = '';
    }
    if (!exchangeOrderState.selectedOption) {
      isValid = false;
      exchangeOrderState.selectedOptionError =
        'Please select a Reason for Returning';
    } else {
      exchangeOrderState.selectedOptionError = '';
    }
    if (!exchangeOrderState.additionalComments) {
      isValid = false;
      exchangeOrderState.additionalCommentsError =
        'Please enter Additional Comments';
    } else {
      exchangeOrderState.additionalCommentsError = '';
    }
    if (!exchangeOrderState?.checked) {
      isValid = false;
      exchangeOrderState.checkedError = 'Please confirm';
    } else {
      exchangeOrderState.checkedError = '';
    }
    setNewValue({...exchangeOrderState});
    if (isValid) {
      setExchangeOrderState('exchangeStep', 2);
    }
  };
  const onSelectAddress = async () => {
    try {
      const formData = {
        id: productDetails?._id,
        reasonForExchanging: exchangeOrderState?.selectedOption,
        additionalComment: exchangeOrderState?.additionalComments,
      };
      const {data} = await ecomInstance?.post(
        constant.exchangeOrder,
        formData,
        {
          headers: {
            auth: token,
          },
        },
      );
      Log('exchangeOrder data', data);
      if (data?.data) {
        navigation.navigate('exchangeOrderStep2', {
          item: route?.params?.item,
          newSize: exchangeOrderState?.activeProductSize,
        });
      }
    } catch (error: any) {
      Log('exchangeOrder error', error?.response);
      Snackbar.show({
        text: error?.response?.data?.message ?? error?.message,
      });
    }
  };
  return {
    exchangeOrderState,
    setExchangeOrderState,
    productDetails,
    validation,
    onSelectAddress,
    userData,
  };
};

export default useExchangeOrder;
