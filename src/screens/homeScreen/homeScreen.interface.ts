export interface HomeScreenControllerProps {
  onSearch: () => void;
  onMovie: (item: any) => void;
  onLocation: () => void;
  getCinemaData: () => void;
  onMoviesShow: () => void;
  closeModal: () => void;
  onStateChange: (state: any) => void;
  cinemaData: HomeScreenProps[];
  setCinemaData: React.Dispatch<React.SetStateAction<HomeScreenProps[]>>;
  loading?: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  videoID?: string;
  cityData?: any;
  modalVisible: boolean;
  videoSpinner: boolean;
  playing?: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  onReadyVideo: () => void;
  onBookNow: (id: string) => void;
  getVideoId: (url: string) => void;
  imageSpinner: boolean;
  onImageLoadStart: () => void;
  onImageLoadEnd: () => void;
  recentRelease: HomeScreenProps[];
  refreshJob: () => void;
  refreshing: boolean;
  adData: AdDataProps[];
  load: any;
  handleLoadStart: (index: number) => void;
  handleLoadEnd: (index: number) => void;
  isAdLoad: boolean;
}

export interface HomeScreenProps {
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

export interface AdDataProps {
  _id: string;
  image: string;
}
