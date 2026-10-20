export interface SearchMoviesControllerProps {
  search: string | undefined;
  moviesData: MoviesData[];
  loading?: boolean;
  handleSearch: (text: string) => void;
  onSearch: (id: string) => void;
  cinemaRegionData: any;
  onCinema: (item: any) => void;
  onBack: () => void;
  onClear: () => void;
  type: string;
  refreshing: boolean;
  refreshCall: () => void;
}

export interface MoviesData {
  _id: string;
  name: string;
}
