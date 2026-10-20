import React from 'react';
import {
  ActivityIndicatorProps,
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native/types';

export interface ButtonProps {
  title?: string | undefined;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  buttonTouchable?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  buttonProps?: TouchableOpacityProps;
  indicatorProps?: ActivityIndicatorProps;
  gradient?: any;
  leftIcon?: React.ComponentType;
  nestedText?: string;
  mainContainer?: StyleProp<ViewStyle>;
  loginLabel?: string | undefined;
  useAngle?: boolean;
  angle?: number;
}
