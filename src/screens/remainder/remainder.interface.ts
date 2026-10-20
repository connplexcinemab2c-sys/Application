export interface RemainderProps {
  nowPlaying: boolean;
  upcomingMovies: boolean;
  upcomingBookings: boolean;
  onNowPlaying: (value: any) => void;
  onUpcomingMovies: (value: any) => void;
  onUpcomingBookings: (value: any) => void;
}

export interface FormDataProps {
  nowPlayingMovies: boolean;
  upCommingMovies: boolean;
  upCommingBookings: boolean;
  _id?: string;
}
