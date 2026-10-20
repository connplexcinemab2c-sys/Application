import {useEffect, useRef, useState} from 'react';
import {AppState, Keyboard, TextInput} from 'react-native';
import {
  getHash,
  removeListener,
  startOtpListener,
  useOtpVerify,
} from 'react-native-otp-verify';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {
  AuthNavigationProps,
  AuthParams,
} from '../../../navigation/stacks/authStack';
import axiosInstance from '../../../services/api';
import {
  checkMobileNumber,
  checkNumeric,
} from '../../../utility/validation/stringValidation';
import constant from '../../../services/config/constant';
import {
  editProfiles,
  loginSuccess,
} from '../../../services/config/redux/userReducer/action';
import Log from '../../../utility/log';
import params from '../../../services/config/params';
import {SignupOtpProps} from './signupOtp.interface';
import validationMessage from '../../../utility/validation/validationMessage';
import BackgroundTimer from 'react-native-background-timer';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../services/config/redux/useReduxHooks';

const signupOtpController = (): SignupOtpProps => {
  const navigation = useNavigation<AuthNavigationProps>();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<AuthParams, 'signupOtp'>>();
  const {userData, token}: any = useAppSelector(state => state.UserReducer);
  const refOtp = useRef<TextInput>(null);
  const [mobileOtp, setMobileOtp] = useState<string>('');
  const [otpCode, setOtpCode] = useState<string>('');
  const [timer, setTimer] = useState<number>(29);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [resendSpinner, setResendSpinner] = useState<boolean>(false);
  const flag = route?.params?.flag;
  const editData = route?.params?.data?.data;
  const dataRoute = route.params?.data;
  const mobileNumber = route?.params?.number?.toString();
  //@ts-ignore
  const isNumber = checkMobileNumber(mobileNumber);

  const {hash, otp, message, timeoutError, stopListener, startListener} =
    useOtpVerify({numberOfDigits: 4});

  useEffect(() => {
    getHash()
      .then(hash => {
        Log('HASH KEY::', hash);
        // ["kvDLxvsBi2R"]
      })
      .catch(err => {
        Log('HASH KEY ERROR::', err);
      });

    startOtpListener(message => {
      // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
      const otp: any = /(\d{4})/g.exec(message)?.[1];
      setOtpCode(otp);
    });
    return () => removeListener();
  }, []);

  useEffect(() => {
    /* Handle timer */
    let interval = BackgroundTimer.setInterval(() => {
      setTimer((lastTimerCount: any) => {
        if (lastTimerCount <= 1) {
          BackgroundTimer.clearInterval(interval);
        }
        if (AppState.currentState === 'background') {
          return lastTimerCount - 1;
        }
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => BackgroundTimer.clearInterval(interval);
  }, []);

  const verifyOTP = async () => {
    /* API call for verifying OTP */
    try {
      const formData = flag
        ? {
            id: userData?._id,
            otp: otpCode,
            flag: 1,
            [flag === 'editMobile' ? params.mobileNumber : params.email]:
              editData,
          }
        : {
            id: dataRoute?.data?._id,
            otp: otpCode,
          };
      setLoading(true);
      const {data} = await axiosInstance.post(
        constant.otpVerification,
        formData,
      );
      setLoading(false);
      setOtpCode('');
      Snackbar.show({text: data?.message});
      if (!flag) {
        dispatch(loginSuccess(data?.data));
      }
      getUserInfo(data?.data?.token || token);
      if (!flag) {
        navigation.navigate('selectCity', {flag: 'login'});
      } else {
        navigation.navigate('editProfile');
      }
    } catch (e: any) {
      setLoading(false);
      setOtpCode('');
      Snackbar.show({text: e?.response?.data?.message ?? e?.message});
    }
  };

  const validation = (): void => {
    Keyboard.dismiss();
    let isValid = true;
    if (!otpCode) {
      isValid = false;
      setError(validationMessage.emptyOtp);
    } else if (otpCode?.length != 4) {
      isValid = false;
      setError(validationMessage.invalidOtp);
    } else if (!checkNumeric(otpCode)) {
      isValid = false;
      setError(validationMessage.invalidOtp);
    } else {
      setError('');
    }
    if (isValid) {
      verifyOTP();
    }
  };

  const getUserInfo = async (token: any) => {
    axiosInstance
      .get(`${constant.userInfo}` + '?' + new Date().getTime() + {}, {
        headers: {
          auth: token,
        },
      })
      .then(res => {
        dispatch(editProfiles(res?.data?.data));
      })
      .catch((e: any) => {});
  };

  const resendOTP = async () => {
    /* API call for resend OTP */
    try {
      setResendSpinner(true);
      const formData = flag
        ? {
            id: userData?._id,
            [flag === 'editMobile' ? params.mobileNumber : params.email]:
              editData,
          }
        : {
            id: route?.params?.data?.data?._id,
            [`${isNumber ? [params.mobileNumber] : [params.email]}`]:
              mobileNumber,
          };
      const {data} = await axiosInstance.post(constant.resendOTP, formData);
      Snackbar.show({text: data?.message});
      setResendSpinner(false);
    } catch (error: any) {
      setResendSpinner(false);
      Snackbar.show({text: error?.response?.data?.message ?? error?.message});
    }
  };

  const resendCode = () => {
    setError('');
    resendOTP();
    setOtpCode('');
    /* Handle the timer while resend the code */
    setTimer(29);
    let interval = BackgroundTimer.setInterval(() => {
      setTimer((lastTimerCount: any) => {
        if (lastTimerCount <= 1) {
          setTimer(0);
          BackgroundTimer.clearInterval(interval);
        }
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => BackgroundTimer.clearInterval(interval);
  };

  return {
    mobileOtp,
    setMobileOtp,
    otpCode,
    setOtpCode,
    timer,
    refOtp,
    loading,
    error,
    resendCode,
    validation,
    mobileNumber,
    isNumber,
  };
};

export default signupOtpController;
