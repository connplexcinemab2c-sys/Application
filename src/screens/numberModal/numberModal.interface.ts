import React from 'react';
import {TextInput} from 'react-native';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

export interface LoginModalControllerProps {
  validation: () => void;
  mobile?: any;
  setMobile: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
  loading: boolean;
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
  numberData: string;
}

export interface UserProps {
  email: string;
  familyName: string | null;
  givenName: string | null;
  id: string;
  name: string | null;
  photo: string | null;
}
