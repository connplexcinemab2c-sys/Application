import {StyleProp, ViewStyle} from 'react-native';
import {StatusBarProps} from '../customStatusBar/customStatusBar.interface';

export interface ImageContainerProps extends StatusBarProps {
  headerShow?: boolean;
  headerTitle?: string;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  isTransparent?: boolean;
}
