import React from 'react';
import {KeyboardTypeOptions} from 'react-native';
import {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native/types';

export interface InputProps {
  value: string | undefined;
  setValue: (value: string) => void;
  inputStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  visible?: boolean;
  error?: string;
  inputProps?: TextInputProps;
  inputContainer?: StyleProp<ViewStyle>;
  leftIcon?: React.ComponentType;
  rigthFilterIcon?: boolean;
  onPressRightFilterIcon?: () => void;
  rigthFilterIconStyle?: StyleProp<ViewStyle>;
  leftIconStyle?: StyleProp<ViewStyle>;
  inputMainContainer?: StyleProp<ViewStyle>;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions | undefined;
  multiline?: boolean | undefined;
  numberOfLines?: number | undefined;
  lable?: string | undefined;
  placeholderColor?: string;
  editable?: boolean;
  inputLabelStyle?: StyleProp<TextStyle>;
}

export interface InputControllerProps {
  isVisible: boolean;
  handleShow: () => void;
}
