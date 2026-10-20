export interface CinemaListProps {
  item: ItemProps;
  cityData?: any;
  onPress: (item: ItemProps) => void;
}

export interface ItemProps {
  _id: string;
  poster: string;
  displayName: string;
  address: string;
  regionId?: string;
  emailId?: string;
  showExtendedDays: number;
}
