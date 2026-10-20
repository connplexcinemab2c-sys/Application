import {useEffect, useRef, useState} from 'react';
import {ErrorObject, VerifyOtpProps} from './verifyotp.interface';
import {
  AuthNavigationProps,
  AuthParams,
} from '../../../navigation/stacks/authStack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {TextInput} from 'react-native';
import validationMessage from '../../../utility/validation/validationMessage';
import constant from '../../../services/config/constant';
import axiosInstance from '../../../services/api';
import params from '../../../services/config/params';
import Snackbar from 'react-native-snackbar';

const verifyOtpController = (): VerifyOtpProps => {
  const navigation = useNavigation<AuthNavigationProps>();
  const route: any = useRoute<RouteProp<AuthParams, 'verifyOtp'>>();
  const [mobileOtp, setMobileOtp] = useState<string>('');
  const refOtp = useRef<TextInput>(null);
  const [otpCode, setOtpCode] = useState<string>('');
  const [timer, setTimer] = useState<number>(59);
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>(route?.params?.otp);
  const [errorObject, setErrorObject] = useState<ErrorObject>({
    mobileOtpError: undefined,
  });

  useEffect(() => {
    resendCode();
  }, []);

  const resendCode = async () => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount: number) => {
        if (lastTimerCount <= 1) {
          setTimer(0);
          clearInterval(interval);
        }
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  };

  const validationVerifyOtp = () => {
    let isValidate = true;
    if (!otpCode) {
      isValidate = false;
      errorObject.mobileOtpError = validationMessage.emptyOtp;
    } else if (otpCode?.length !== 4) {
      isValidate = false;
      errorObject.mobileOtpError = validationMessage.invalidOtp;
    } else {
      errorObject.mobileOtpError = undefined;
    }
    setErrorObject({...errorObject});
    if (isValidate) {
      onVerifyOtp();
    }
  };

  const onVerifyOtp = async () => {
    try {
      // const changeParams: boolean = isNumeric(email);
      const formData = {
        [params.id]: route.params.id._id,
        [params.otp]: otpCode,
      };
      setLoading(true);
      const {data} = await axiosInstance.post(constant.verifyOtp, formData);
      setLoading(false);
      setOtp('');
      setLoading(false);
      Snackbar.show({text: data?.message});
      navigation.navigate('createPassowrd', {userId: data?.data?._id});
    } catch (e: any) {
      setLoading(false);
      Snackbar.show({text: e?.response?.data?.message});
    }
  };

  return {
    otp,
    mobileOtp,
    setMobileOtp,
    otpCode,
    setOtpCode,
    timer,
    setTimer,
    refOtp,
    loading,
    errorObject,
    route,
    resendCode,
    validationVerifyOtp,
  };
};

export default verifyOtpController;
