import {ScrollViewProps, StyleProp, ViewStyle} from 'react-native';
import {StatusBarProps} from '../customStatusBar/customStatusBar.interface';
import {HeaderProps} from '../header/header.interface';

export interface ContainerProps extends StatusBarProps, HeaderProps {
  hideHeader?: boolean;
  children?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  isHeaderWithoutScroll?: boolean;
  scrollContentContainerStyle?: StyleProp<ViewStyle>;
  scrollViewProps?: ScrollViewProps;
  isStatusbar?: boolean;
}
