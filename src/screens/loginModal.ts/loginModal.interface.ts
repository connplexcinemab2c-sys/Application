import React from 'react';
import {TextInput} from 'react-native';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

export interface LoginModalControllerProps {
  onSignup: () => void;
  onGoogle: () => void;
  onApple: () => void;
  onFacebook: () => void;
  validation: () => void;
  email?: any;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
  loading: boolean;
  socialSpinner: boolean;
  otpVisible: boolean;
  mobileOtp?: string;
  setMobileOtp?: React.Dispatch<React.SetStateAction<string>>;
  otpCode?: string;
  setOtpCode?: React.Dispatch<React.SetStateAction<string>>;
  timer: number;
  refOtp: React.MutableRefObject<null | TextInput>;
  otpError?: string;
  resendCode: () => void;
  otpValidation: () => void;
  onBack: () => void;
  isLoad: boolean;
  match: boolean;
}

export interface UserProps {
  email: string;
  familyName: string | null;
  givenName: string | null;
  id: string;
  name: string | null;
  photo: string | null;
}
