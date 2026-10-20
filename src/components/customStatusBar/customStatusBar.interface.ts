import {StyleProp, ViewStyle} from 'react-native/types';

export interface StatusBarProps {
  backgroundColor?: string | undefined;
  containerStyle?: StyleProp<ViewStyle> | undefined;
  transparent?: boolean;
  hidden?: boolean;
  barStyle?: any;
}
