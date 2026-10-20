import {UpcomingMovies} from '../../../screens/comingSoon/comingSoon.interface';

export interface ComingSoonCardProps {
  item: UpcomingMovies;
  onPress: (item: UpcomingMovies) => void;
  index: number;
}
