export interface OtherCitiesProps {
  item: ItemProps;
  index: number;
  onPress: (item: ItemProps) => void;
}

export interface ItemProps {
  id?: number;
  __v?: number;
  deletedStatus?: number;
  region?: string;
  createdAt?: string;
  updatedAt?: string;
  image?: string;
}
