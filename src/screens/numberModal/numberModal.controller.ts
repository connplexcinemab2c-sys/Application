import {useEffect, useRef, useState} from 'react';
import {Keyboard, TextInput, AppState} from 'react-native';
import Snackbar from 'react-native-snackbar';
import axiosInstance from '../../services/api';
import constant from '../../services/config/constant';
import {
  checkMobileNumber,
  checkNumeric,
} from '../../utility/validation/stringValidation';
import Log from '../../utility/log';
import {LoginModalControllerProps} from './numberModal.interface';
import {editProfiles} from '../../services/config/redux/userReducer/action';
import params from '../../services/config/params';
import validationMessage from '../../utility/validation/validationMessage';
import BackgroundTimer from 'react-native-background-timer';
import {
  getHash,
  removeListener,
  startOtpListener,
  useOtpVerify,
} from 'react-native-otp-verify';
import {
  useAppDispatch,
  useAppSelector,
} from '../../services/config/redux/useReduxHooks';

const numberModalController = (
  visible: boolean,
  onClose: () => void,
): LoginModalControllerProps => {
  const refOtp = useRef<TextInput>(null);
  const dispatch = useAppDispatch();
  const {token, userData} = useAppSelector(state => state.UserReducer);
  const [mobile, setMobile] = useState<string>('');
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [otpVisible, setOtpVisible] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('');
  const [timer, setTimer] = useState<number>(29);
  const [otpError, setOtpError] = useState<string>();
  const [resendSpinner, setResendSpinner] = useState<boolean>(false);
  const [numberData, setNumberData] = useState<any>('');

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setMobile('');
        setError('');
        setLoading(false);
        setOtpVisible(false);
        setTimer(29);
        setOtpCode('');
        setOtpError('');
        setNumberData('');
      }, 500);
    }
  }, [visible]);

  const validation = (): void => {
    Keyboard.dismiss();
    let isValid = true;
    if (!mobile) {
      isValid = false;
      setError(validationMessage.emptyMobileNo);
    } else if (!checkMobileNumber(mobile)) {
      isValid = false;
      setError(validationMessage.invalidMobileNo);
    } else if (mobile == '0000000000') {
      isValid = false;
      setError(validationMessage.invalidMobileNo);
    } else {
      setError('');
    }
    if (isValid) {
      onAddMobile();
    }
  };

  const onAddMobile = async () => {
    /* API call for updating email or mobile number */
    Keyboard.dismiss();
    setLoading(true);
    try {
      const formData = {
        [params.mobileNumber]: mobile,
      };
      const {data} = await axiosInstance.post(
        constant.editMobilenumber,
        formData,
        {
          headers: {
            auth: `${token}`,
          },
        },
      );
      setTimeout(() => {
        setNumberData(data?.data);
      }, 300);
      setLoading(false);
      Snackbar.show({text: data?.message});
      setOtpVisible(true);
    } catch (e: any) {
      setLoading(false);
      setOtpVisible(false);
      Snackbar.show({text: e?.response?.data?.message ?? e?.message});
    }
  };

  const {hash, otp, message, timeoutError, stopListener, startListener} =
    useOtpVerify({numberOfDigits: 4});

  useEffect(() => {
    if (otpVisible) {
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
    }
  }, []);

  useEffect(() => {
    /* Handle timer */
    if (otpVisible) {
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
    }
  }, [otpVisible]);

  const verifyOTP = async () => {
    /* API call for verifying OTP */
    try {
      const formData = {
        id: userData?._id,
        otp: otpCode,
        flag: 1,
        [params.mobileNumber]: mobile,
      };
      setLoading(true);
      const {data} = await axiosInstance.post(
        constant.otpVerification,
        formData,
      );
      setLoading(false);
      setOtpCode('');
      Snackbar.show({text: data?.message});
      getUserInfo(data?.data?.token || token);
      onClose();
    } catch (e: any) {
      setLoading(false);
      setOtpCode('');
      Snackbar.show({text: e?.response?.data?.message ?? e?.message});
    }
  };

  const otpValidation = (): void => {
    Keyboard.dismiss();
    let isValid = true;
    if (!otpCode) {
      isValid = false;
      setOtpError(validationMessage.emptyOtp);
    } else if (otpCode?.length != 4) {
      isValid = false;
      setOtpError(validationMessage.invalidOtp);
    } else if (!checkNumeric(otpCode)) {
      isValid = false;
      setOtpError(validationMessage.invalidOtp);
    } else {
      setOtpError('');
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

  const onBack = () => {
    setOtpVisible(false);
    setMobile('');
    setError('');
    setLoading(false);
    setTimer(29);
    setOtpCode('');
    setOtpError('');
    setNumberData('');
  };

  const resendOTP = async () => {
    /* API call for resend OTP */
    Keyboard.dismiss();
    try {
      setResendSpinner(true);
      const formData = {
        id: userData?._id,
        [params.mobileNumber]: mobile,
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
    setOtpError('');
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
    mobile,
    setMobile,
    error,
    validation,
    loading,
    otpVisible,
    otpCode,
    setOtpCode,
    timer,
    refOtp,
    otpError,
    resendCode,
    otpValidation,
    onBack,
    numberData,
  };
};

export default numberModalController;
