import {ImageSourcePropType} from 'react-native/types';

export interface PaymentCardProps {
  item: ItemProps;
  index: number;
  lastIndex: number;
  onPress: (item: ItemProps) => void;
  isSelected: boolean;
}

export interface ItemProps {
  id: number;
  image: ImageSourcePropType;
  name: string;
  number?: string;
}
