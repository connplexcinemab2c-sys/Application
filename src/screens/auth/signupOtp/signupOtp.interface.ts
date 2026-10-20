import {TextInput} from 'react-native';

export interface SignupOtpProps {
  mobileOtp?: string;
  setMobileOtp?: React.Dispatch<React.SetStateAction<string>>;
  otpCode?: string;
  setOtpCode?: React.Dispatch<React.SetStateAction<string>>;
  timer: number;
  refOtp: React.MutableRefObject<null | TextInput>;
  loading?: boolean;
  error?: string;
  resendCode: () => void;
  validation: () => void;
  mobileNumber?: string;
  isNumber: any;
}

export interface VerifyHookProps {
  userId: string | undefined;
  userMobile: string | undefined;
}
