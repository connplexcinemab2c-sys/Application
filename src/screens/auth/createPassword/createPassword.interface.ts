import React from 'react';

export interface CreatePasswordControllerProps {
  password?: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordError?:string;
  setPasswordError: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword?: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPasswordError?: string;
  setConfirmPasswordError: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onNewPassword: () => void;
  handleValidation: () => void;
}
