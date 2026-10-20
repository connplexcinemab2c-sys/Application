import {ImageSourcePropType} from 'react-native/types';

export interface FeaturedCardProps {
  item: ItemProps;
}

export interface ItemProps {
  id: number;
  image: ImageSourcePropType;
  name: string;
  price: string;
  quantity: number;
}
