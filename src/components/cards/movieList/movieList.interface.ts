import {StyleProp, ViewStyle} from 'react-native/types';

export interface MovieListProps {
  item: ItemProps;
  onPress: (item: ItemProps) => void;
  containerstyle?: StyleProp<ViewStyle>;
  index: number;
}
export interface ItemProps {
  _id: string;
  averageRating: number;
  category: string;
  censorRating: string;
  cinemaObjectId: {
    _id: string;
    regionId: string;
  };
  duration: number;
  filmCode: string;
  filmOpeningDate: string;
  languages: string;
  likes: number;
  name: string;
  poster: string;
  rating: number;
  totalLikes: number;
  youtubeVideoUrl: string;
}
