import {ImageSourcePropType} from 'react-native/types';

export interface SnacksProps {
  item: ItemProps;
  index: number;
  addQuantity?: () => void;
  increaseQuantity?: () => void;
  decreaseQuantity?: () => void;
}

export interface ItemProps {
  id: number;
  image: ImageSourcePropType;
  name: string;
  price: number;
  quantity: number;
}
