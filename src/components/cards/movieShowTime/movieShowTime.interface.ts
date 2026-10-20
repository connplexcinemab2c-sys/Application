import {StyleProp, ViewStyle} from 'react-native';

export interface MovieShowTimeProps {
  item: any;
  index?: number;
  showTime?: boolean;
  selectedTime?: string;
  onSelectTime?: (item: any, cinemaId: string, index: number) => void;
  theatreId?: string;
  onPress: (item: string[]) => void;
  containerStyle?: StyleProp<ViewStyle>;
}
