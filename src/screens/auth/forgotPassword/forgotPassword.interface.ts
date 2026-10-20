import React from 'react';
export interface ForgotPasswordControllerProps {
  email?: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  emailError?: string;
  setEmailError: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  validateForgot: () => void;
  onResetPassword: () => void;
}
