import appleAuth from '@invertase/react-native-apple-authentication';
import messaging from '@react-native-firebase/messaging';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useEffect, useRef, useState} from 'react';
import {
  Alert,
  AppState,
  Keyboard,
  PermissionsAndroid,
  Platform,
  TextInput,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {
  getHash,
  removeListener,
  startOtpListener,
  useOtpVerify,
} from 'react-native-otp-verify';
import PushNotification from 'react-native-push-notification';
import Snackbar from 'react-native-snackbar';
import axiosInstance from '../../services/api';
import constant from '../../services/config/constant';
import params from '../../services/config/params';
import {
  useAppDispatch,
  useAppSelector,
} from '../../services/config/redux/useReduxHooks';
import {
  editProfiles,
  loginSuccess,
  setLoginType,
} from '../../services/config/redux/userReducer/action';
import Log from '../../utility/log';
import {
  checkMobileNumber,
  checkNumeric,
  emailRegex,
  mobileNumberPattern,
} from '../../utility/validation/stringValidation';
import validationMessage from '../../utility/validation/validationMessage';
import {LoginModalControllerProps} from './loginModal.interface';

const loginModalController = (
  visible: boolean,
  onClose: () => void,
): LoginModalControllerProps => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [socialSpinner, setSocialSpinner] = useState<boolean>(false);
  const [otpVisible, setOtpVisible] = useState<boolean>(false);
  const [deviceToken, setDeviceToken] = useState<string>('');
  const {token} = useAppSelector(state => state.UserReducer);
  const refOtp = useRef<TextInput>(null);
  const [otpCode, setOtpCode] = useState<string>('');
  const [timer, setTimer] = useState<number>(29);
  const [otpError, setOtpError] = useState<string>();
  const [resendSpinner, setResendSpinner] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<any>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);

  useEffect(() => {
    requestUserPermission();
    if (Platform.OS == 'android') {
      requestLocationPermission();
    }
  }, []);

  useEffect(() => {
    messaging()
      .hasPermission()
      .then(authStatus => {
        console.log('Permission status:', authStatus);
      });
  });

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      webClientId:
        '505953829852-s0cq4bbajrpqqi9md5919rura64n753j.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }, []);

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setEmail('');
        setError('');
        setDeviceToken('');
        setLoading(false);
        setSocialSpinner(false);
        setOtpVisible(false);
        setTimer(29);
        setOtpCode('');
        setOtpError('');
        setLoginData([]);
      }, 500);
    }
  }, [visible]);

  const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
    }
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getToken();
      //  Log('Authorization status', authStatus);
    }
  };

  useEffect(() => {
    if (deviceToken) {
      console.log('✅ Device token is ready:', deviceToken);
    }
  }, [deviceToken]);

  const getFreshFCMToken = async (): Promise<string> => {
    try {
      if (Platform.OS === 'ios') {
        await messaging().registerDeviceForRemoteMessages();
      }

      const token = await messaging().getToken();
      console.log('token', token);
      setDeviceToken(token);
      Log('Fresh FCM Token:', token);
      return token;
    } catch (error) {
      Log('Error fetching FCM token:', error);
      return '';
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert(
          'Location Permission Required',
          'Please allow access to your location to use this app.',
          [{text: 'OK'}],
        );
      }
    } catch (err) {}
  };

  const getToken = async () => {
    PushNotification.createChannel(
      {
        channelId: 'ConnplexChannel',
        channelName: 'Connplex Channel',
        channelDescription: 'A channel to categorise your notifications',
        playSound: false,
        soundName: 'default',
        vibrate: true,
        
      },
      created => Log('createChannel', `createChannel returned '${created}'`),
    );
    try {
      const token = await messaging().getToken();
      console.log('token', token);

      setDeviceToken(token);
      Log('FCM device token fetched:', token);
      return token;
    } catch (error) {
      Log('Error getting FCM token:', error);
    }
  };

  useEffect(() => {
    if (visible && !deviceToken) {
      getFreshFCMToken();
    }
  }, [visible]);

  const socialLogin = async (
    fname: string | null | undefined,
    lname: string | null | undefined,
    email: string | null | undefined,
    id: string | null | undefined,
    type: string | null | undefined,
  ) => {
    const formData = {
      firstName: fname,
      lastName: lname,
      email: email,
      providerId: id,
      source: type,
      login_type: Platform.OS === 'ios' ? 'iOS' : 'Android',
      fcmToken: deviceToken ? deviceToken : '',
    };

    try {
      const {data} = await axiosInstance.post(constant.socialLogin, formData);
      Log('social login data', data);
      setSocialSpinner(false);
      setIsLoad(false);
      dispatch(loginSuccess(data?.data));
      onClose();
      setTimeout(() => {
        Snackbar.show({text: 'Login successfully', duration: 3000});
      }, 300);
    } catch (e: any) {
      setSocialSpinner(false);
      setIsLoad(false);
      Snackbar.show({text: e?.response?.data?.message ?? e?.message});
      Log('social login error', e);
    }
  };

  const onGoogle = async () => {
    try {
      setSocialSpinner(true);
      setIsLoad(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        GoogleSignin.getTokens().then(({accessToken}) => {
          dispatch(setLoginType('google'));
          socialLogin(
            userInfo?.user?.givenName,
            userInfo?.user?.familyName,
            userInfo?.user?.email,
            userInfo?.user?.id,
            'google',
          );
        });
      }
    } catch (error: any) {
      Log('google login errror', error?.message);
      setSocialSpinner(false);
      setIsLoad(false);
      Snackbar.show({text: 'User cancelled google login'});
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const onApple = async () => {
    try {
      setSocialSpinner(true);
      setIsLoad(true);
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      const {user, email, fullName} = appleAuthRequestResponse;
      if (user) {
        dispatch(setLoginType('apple'));
        socialLogin(
          fullName?.givenName,
          fullName?.familyName,
          email,
          user,
          'apple',
        );
      }
    } catch (e) {
      setSocialSpinner(false);
      setIsLoad(false);
      Log('Apple sign in error', e);
    }
  };

  const onFacebook = async () => {
    // try {
    //   setSocialSpinner(true);
    // setIsLoad(true);
    //   const result = await LoginManager.logInWithPermissions([
    //     'public_profile',
    //     'email',
    //   ]);
    //   if (result.isCancelled) {
    //     Snackbar.show({text: 'Login cancelled'});
    //   } else {
    //     const data = await AccessToken.getCurrentAccessToken();
    //     if (data) {
    //       Log('Logged in with Facebook!', data.accessToken.toString());
    //       dispatch(setLoginType('facebook'));
    //       socialLogin(user, data.accessToken.toString(), 'facebook');
    //     }
    //   }
    // } catch (error) {
    //   setSocialSpinner(false);
    // setIsLoad(false);
    //   Log('Error logging in with Facebook:', error);
    // }
  };

  const isNumeric = (num: number | string): boolean =>
    (typeof num === 'number' ||
      (typeof num === 'string' && num.trim() !== '')) &&
    !isNaN(num as number);
  const match = isNumeric(email);

  const validation = (): void => {
    Keyboard.dismiss();
    let isValid = true;
    if (!email) {
      isValid = false;
      setError(validationMessage.emptyEmailCheck);
    } else if (emailRegex.test(email) == match) {
      isValid = false;
      setError(validationMessage.invalidEmail);
    } else if (!mobileNumberPattern.test(email) == match) {
      isValid = false;
      setError(validationMessage.invalidMobileNo);
    } else if (email == '0000000000') {
      isValid = false;
      setError(validationMessage.invalidMobileNo);
    } else {
      setError('');
    }
    if (isValid) {
      onSignup();
    }
  };

  const onSignup = async () => {
    if (!deviceToken) {
      await getFreshFCMToken();
      await getToken();
    }
    /* API call for user login */
    Keyboard.dismiss();
    setLoading(true);
    setIsLoad(true);
    try {
      const formData = {
        [match == true ? params.mobile : params.email]: email,
        login_type: Platform.OS === 'ios' ? 'iOS' : 'Android',
        fcmToken: deviceToken ? deviceToken : '',
      };

      const {data} = await axiosInstance.post(constant.login, formData);
      setTimeout(() => {
        setLoginData(data?.data);
      }, 300);
      setLoading(false);
      Snackbar.show({text: data?.message});
      dispatch(setLoginType('withoutSocial'));
      setIsLoad(false);
      setOtpVisible(true);
    } catch (e: any) {
      setLoading(false);
      setIsLoad(false);
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
        id: loginData?._id,
        otp: otpCode,
      };
      setLoading(true);
      const {data} = await axiosInstance.post(
        constant.otpVerification,
        formData,
      );
      setLoading(false);
      setOtpCode('');
      dispatch(loginSuccess(data?.data));
      getUserInfo(data?.data?.token || token);
      onClose();
      setTimeout(() => {
        Snackbar.show({text: 'Login successfully', duration: 3000});
      }, 300);
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
    setEmail('');
    setError('');
    setDeviceToken('');
    setLoading(false);
    setSocialSpinner(false);
    setTimer(29);
    setOtpCode('');
    setOtpError('');
    setLoginData([]);
  };

  const resendOTP = async () => {
    /* API call for resend OTP */
    Keyboard.dismiss();
    try {
      setResendSpinner(true);
      const formData = {
        id: loginData?._id,
        [`${
          checkMobileNumber(email?.toString())
            ? [params.mobileNumber]
            : [params.email]
        }`]: email,
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
    email,
    setEmail,
    error,
    validation,
    onSignup,
    loading,
    onGoogle,
    socialSpinner,
    onApple,
    onFacebook,
    otpVisible,
    otpCode,
    setOtpCode,
    timer,
    refOtp,
    otpError,
    resendCode,
    otpValidation,
    onBack,
    isLoad,
    match,
  };
};

export default loginModalController;
