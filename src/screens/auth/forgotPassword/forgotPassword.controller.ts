import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProps} from '../../../navigation/stacks/authStack';
import validationMessage from '../../../utility/validation/validationMessage';
import {checkEmail} from '../../../utility/validation/stringValidation';
import {ForgotPasswordControllerProps} from './forgotPassword.interface';
import params from '../../../services/config/params';
import axiosInstance from '../../../services/api';
import Snackbar from 'react-native-snackbar';
import constant from '../../../services/config/constant';

const forgotPasswordController = (): ForgotPasswordControllerProps => {
  const navigation = useNavigation<AuthNavigationProps>();
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const isNumeric = (num: number | string): boolean =>
    (typeof num === 'number' ||
      (typeof num === 'string' && num.trim() !== '')) &&
    !isNaN(num as number);

  const validateForgot = () => {
    let isValid = true;
    if (!email) {
      setEmailError(validationMessage.emptyEmail);
      isValid = false;
    } else if (!checkEmail(email)) {
      setEmailError(validationMessage.invalidEmail);
      isValid = false;
    } else {
      setEmailError('');
    }
    if (isValid) {
      onResetPassword();
    }
  };

  const onResetPassword = async () => {
    try {
      // const changeParams: boolean = isNumeric(email);
      const formData = {
        [params.email]: email,
      };
      setLoading(true);
      const {data} = await axiosInstance.post(
        constant.forgotPassword,
        formData,
      );
      setLoading(false);
      setEmail('');
      setLoading(false);
      Snackbar.show({text: data.message});
      navigation.navigate('verifyOtp', {id: data.data});
    } catch (e: any) {
      setLoading(false);
      Snackbar.show({text: e?.response?.data?.message});
    }
  };

  return {
    email,
    setEmail,
    emailError,
    setEmailError,
    validateForgot,
    onResetPassword,
    loading,
  };
};

export default forgotPasswordController;
