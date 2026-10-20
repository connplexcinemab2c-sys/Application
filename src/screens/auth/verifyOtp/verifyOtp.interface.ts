import {TextInput} from 'react-native';
import {AuthParams} from '../../../navigation/stacks/authStack';
import {RouteProp} from '@react-navigation/native';

export interface VerifyOtpProps {
  mobileOtp?: string;
  setMobileOtp?: React.Dispatch<React.SetStateAction<string>>;
  otp?: string;
  setOtp?: React.Dispatch<React.SetStateAction<string>>;
  otpCode?: string;
  setOtpCode?: React.Dispatch<React.SetStateAction<string>>;
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  refOtp: React.MutableRefObject<null | TextInput>;
  loading?: boolean;
  errorObject: ErrorObject;
  route: RouteProp<AuthParams, 'verifyOtp'>;
  resendCode: () => void;
   validationVerifyOtp: () => void;
}

export interface ErrorObject {
  mobileOtpError: string | undefined;
}

export interface VerifyHookProps {
  userId: string | undefined;
  userMobile: string | undefined;
}
