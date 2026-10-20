export interface MoviesPerCinemaCardProps {
  item: any;
  onSelectTime: (item: any, movieDetails: any) => void;
  selectedTime: string;
  movieId?: string;
}
