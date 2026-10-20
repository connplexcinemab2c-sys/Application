export interface ComingSoonControllerProps {
  search?: string;
  setSearch: React.SetStateAction<React.Dispatch<string | undefined>>;
  handleSearch: (value: string) => void;
  loading: boolean;
  upcomingMovies?: UpcomingMovies[];
  showSearch: boolean;
  handleSearchOpen: () => void;
  onMovieDetails: (item: any) => void;
  refreshing: boolean;
  refreshJob: () => void;
  onBack: () => void;
  onClear: () => void;
}

export interface UpcomingMovies {
  _id: string;
  cinemaObjectId: string;
  name: string;
  poster: string;
  languages: string;
  createdAt: string;
  updatedAt: string;
  filmOpeningDate: string;
  youtubeVideoUrl: string;
  starCast: [
    {
      starCastId: {
        _id: string;
        name: string;
      };
      _id: string;
    },
  ];
  category: string;
}
