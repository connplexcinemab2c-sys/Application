import {useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AuthNavigationProps, AuthParams} from '../../../navigation/stacks/authStack';
import {CreatePasswordControllerProps} from './createPassword.interface';
import validationMessage from '../../../utility/validation/validationMessage';
import Snackbar from 'react-native-snackbar';
import params from '../../../services/config/params';
import axiosInstance from '../../../services/api';
import constant from '../../../services/config/constant';

const createPasswordController = (): CreatePasswordControllerProps => {
  const navigation = useNavigation<AuthNavigationProps>();
  const [password, setPassword] = useState<string>('');
  const newId: any = useRoute<RouteProp<AuthParams, 'createPassowrd'>>();
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleValidation = () => {
    setPasswordError('');
    setConfirmPasswordError('');
    let isValid = true;
    if (password.length < 6) {
      setPasswordError(validationMessage.emptyPassword);
      isValid = false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError(validationMessage.passwordNotConfirm);
      isValid = false;
    }
    if (isValid) {
      onNewPassword();
    }
  };

  const onNewPassword = async () => {
    /** NewPassword api call*/
    try {
      const formData = {
        [params.userId]: newId?.params?.userId,
        [params.newPassword]: password,
        [params.confirmPassword]: confirmPassword,
      };
      setLoading(true);
      const {data} = await axiosInstance.post(
        constant.resetPassword,
        formData,
      );
      setLoading(false);
      Snackbar.show({text: data.message});
      navigation.navigate('bottom');
    } catch (e: any) {
      setLoading(false);
      Snackbar.show({text: e?.response?.data?.message});
    }
  };


  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passwordError,
    loading, 
    setLoading,
    setPasswordError,
    confirmPasswordError,
    setConfirmPasswordError,
    handleValidation,
    onNewPassword,
  };
};

export default createPasswordController;
