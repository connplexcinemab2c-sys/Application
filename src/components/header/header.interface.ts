import React from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native/types';

export interface HeaderProps {
  containerStyle?: StyleProp<ViewStyle>;
  backIcon?: boolean;
  onBack?: () => void;
  onRightIcon?: () => void;
  onSecondRightIcon?: () => void;
  rightIcon?: React.ComponentType;
  title?: string;
  backContainerStyle?: StyleProp<ViewStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  secondRightIcon?: React.ComponentType;
  withBackground?: boolean;
  rightText?: string;
  onRightText?: () => void;
  skip?: boolean;
  onSkip?: () => void;
  rightIconContainer?: StyleProp<ViewStyle>;
  isDisabled?: boolean;
}
