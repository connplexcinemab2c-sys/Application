import {ItemProps} from '../../components/cards/movieList/movieList.interface';

export interface MovieDetailsControllerProps {
  onMovie: () => void;
  openModal: () => void;
  closeModal: () => void;
  onStateChange: (state: any) => void;
  moviesData: ItemProps[];
  setMoviesData: React.Dispatch<React.SetStateAction<ItemProps[]>>;
  moviesDetails?: any;
  loading?: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
  playing?: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  videoId?: string;
  movieCategory: string[];
  readMore?: boolean;
  description?: string;
  onReadMore: () => void;
  onOtherMovies: (item: any) => void;
  onShare: () => void;
  likes: boolean;
  refRBSheet: any;
  reviewSheet: any;
  openSheet: () => void;
  closeSheet: () => void;
  review?: string;
  setReview: React.Dispatch<React.SetStateAction<string | undefined>>;
  movieRating: number;
  theatreRating: number;
  error?: string;
  validation: () => void;
  reviewSpinner: boolean;
  likeDislikeMovies: () => void;
  totalLikes: number;
  openReviewSheet: () => void;
  closeReviewSheet: () => void;
  handleMovieRating: (value: number) => void;
  handleTheatreRating: (value: number) => void;
  animationHeight: any;
  expanded: any;
  videoSpinner: boolean;
  onReadyVideo: () => void;
  textRef: any;
  onTextLayout: (event: any) => void;
  otherMoviesSpinner: boolean;
  onSearch: () => void;
  onLocation: () => void;
  cityData: any;
  refreshing: boolean;
  onRefreshCall: () => void;
  clearState: () => void;
  visible: boolean;
  setVisible: any;
  scaleValue: any;
}

export interface TheatersProps {
  id: number;
  cinemaName: string;
  cinemaId: number;
}

export interface MoviesDetails {
  __v: number;
  _id: string;
  cast: string;
  category: string;
  censorRating: string;
  children: string;
  cinemaId: string;
  cinemaObjectId: string;
  convenienceFees: number;
  convenienceGST: number;
  createdAt: string;
  deletedStatus: number;
  description: string;
  duration: number;
  filmCategoryCode: string;
  filmCategoryShortName: string;
  filmCode: string;
  filmContent: string;
  filmDescriptionLong: string;
  filmFeatureFlag: string;
  filmNowShowingFlag: string;
  filmOpeningDate: string;
  filmSignSequence: number;
  filmStatus: string;
  filmUpcomingFlag: string;
  showExtendedDays: number;
  images: string[];
  languages: string;
  name: string;
  poster: string;
  shortName: string;
  signText: string;
  starCast: StarCastProps[];
  crew: StarCastProps[];
  status: number;
  topFour: number;
  trending: number;
  updatedAt: string;
  youtubeVideoUrl: string;
  rating: number;
  likes: number;
  rateAndReviews: any;
}

export interface StarCastProps {
  _id: string;
  starCastId: {
    __v: number;
    _id: string;
    about: string;
    category: string;
    createdAt: string;
    deletedStatus: number;
    name: string;
    profile: string;
    type: string;
    updatedAt: string;
  };
}
