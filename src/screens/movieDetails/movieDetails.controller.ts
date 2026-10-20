import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, Easing, Share} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Snackbar from 'react-native-snackbar';
import {ItemProps} from '../../components/cards/movieList/movieList.interface';
import {AuthParams} from '../../navigation/stacks/authStack';
import axiosInstance from '../../services/api';
import constant from '../../services/config/constant';
import {useAppSelector} from '../../services/config/redux/useReduxHooks';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import Log from '../../utility/log';
import {StringValidation} from '../../utility/validation/stringValidation';
import validationMessage from '../../utility/validation/validationMessage';
import {
  MovieDetailsControllerProps,
  MoviesDetails,
} from './movieDetails.interface';

const movieDetailsController = (): MovieDetailsControllerProps => {
  const isFocused = useIsFocused();
  const {extractVideoId} = commonFunctions();
  const navigation = useNavigation<any>();
  const route: any = useRoute<RouteProp<AuthParams, 'movieDetails'>>();
  const {cityData, userData, token} = useAppSelector(
    state => state.UserReducer,
  );
  const [reviewSpinner, setReviewSpinner] = useState<boolean>(false);
  const [movieId, setMovieId] = useState<string>(route?.params?.movieId);
  const [moviesData, setMoviesData] = useState<ItemProps[]>([]);
  const [moviesDetails, setMoviesDetails] = useState<MoviesDetails>();
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [movieCategory, setMovieCategory] = useState<string[]>([]);
  const [videoId, setVideoId] = useState<string>();
  const [likes, setLikes] = useState<boolean>(false);
  const [videoSpinner, setVideoSpinner] = useState<boolean>(false);
  const [readMore, setReadMore] = useState<boolean>(false);
  const [review, setReview] = useState<string>();
  const [error, setError] = useState<string>();
  const [movieRating, setMovieRating] = useState<number>(0);
  const [theatreRating, setTheatreRating] = useState<number>(0);
  const [totalLikes, setTotalLikes] = useState<number>(0);
  const [isReviewed, setIsReviewed] = useState<boolean>(true);
  const [expanded, setExpanded] = useState(false);
  const [otherMoviesSpinner, setOtherMoviesSpinner] = useState(false);
  const [textHeight, setTextHeight] = useState(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const refRBSheet = useRef<RBSheet>();
  const reviewSheet = useRef<RBSheet>();
  const textRef = useRef(null);
  const scaleValue = useRef(new Animated.Value(1)).current;

  const openSheet = (): void => {
    if (token) {
      refRBSheet?.current?.open();
    } else {
      setVisible(true);
    }
  };

  const animationHeight = useRef(new Animated.Value(60))?.current;

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const onTextLayout = (event: any): void => {
    setTextHeight(event.nativeEvent.layout.height);
  };

  useEffect(() => {
    if (expanded) {
      Animated.timing(animationHeight, {
        duration: 400,
        toValue: textHeight + 20,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animationHeight, {
        duration: 200,
        toValue: 60,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [expanded]);

  const closeSheet = (): void => {
    refRBSheet?.current?.close();
    setMovieRating(0);
    setTheatreRating(0);
    setReview(undefined);
    setError(undefined);
  };

  const clearState = () => {
    setMovieRating(0);
    setTheatreRating(0);
    setReview(undefined);
    setError(undefined);
  };

  const openReviewSheet = (): void => {
    reviewSheet?.current?.open();
  };

  const handleMovieRating = (value: number) => {
    const rating = parseInt(value.toFixed(0));
    setMovieRating(value);
  };

  const handleTheatreRating = (value: number) => {
    // const rating = parseInt(value.toFixed(0));
    setTheatreRating(value);
  };

  const closeReviewSheet = (): void => {
    reviewSheet?.current?.close();
  };

  const description = moviesDetails?.description
    ? moviesDetails?.description?.length > 90 && !readMore && !expanded
      ? moviesDetails?.description?.slice(0, 90)
      : moviesDetails?.description
    : 'N/A';

  const onReadMore = (): void => {
    if (moviesDetails?.description && moviesDetails?.description?.length > 90) {
      setReadMore(!readMore);
      toggleExpansion();
    }
  };

  useEffect(() => {
    getMoviesDetails('details');
    getMovies();
    setReadMore(false);
    setExpanded(false);
  }, [movieId]);

  const onRefreshCall = () => {
    setRefreshing(true);
    getMoviesDetails('details');
    getMovies();
    setReadMore(false);
    setExpanded(false);
  };

  const getMoviesDetails = async (type: string) => {
    /* API call for getting movie details */
    // if (type !== 'review') {
    setLoading(true);
    // }
    try {
      const {data} = await axiosInstance.get(
        `${constant.movieDetails}?movieId=${movieId}&userId=${userData?._id}` +
          `&timestamp=${new Date().getTime()}`,
      );

      setTimeout(() => {
        setLoading(false);
      }, 500);
      setRefreshing(false);
      if (data?.data) {
        setTimeout(() => {
          setMoviesDetails(data?.data);
        }, 500);
        if (data?.data?.category && data?.data?.category != '') {
          const categories = data?.data?.category
            .split(/\r?\n,\r?\n/)
            .map((category: any) => category.trim());
          setMovieCategory(categories);
        } else {
          setMovieCategory([]);
        }
        if (data?.data?.youtubeVideoUrl) {
          setVideoId(extractVideoId(data?.data?.youtubeVideoUrl));
        }
        setTotalLikes(
          data?.data?.likes >= data?.data?.totalLikes - data?.data?.likes
            ? data?.data?.likes
            : data?.data?.totalLikes,
        );
        setLikes(data?.data?.isLiked ? true : false);
      }
      Log('moviedetails:::::::', JSON.stringify(data?.data));
    } catch (error: any) {
      setLoading(false);
      setRefreshing(false);
      Snackbar.show({
        text: error?.response?.data?.message ?? error?.message,
        duration: 3000,
      });
      if (error?.response?.data?.status == 409) {
        navigation.navigate('bottom', {screen: 'homeScreen'});
      }
    }
  };

  const getMovies = async () => {
    /* API call for getting movie list */
    try {
      setOtherMoviesSpinner(true);
      const {data} = await axiosInstance.get(
        `${constant.getCinema}/${cityData?._id}`,
      );
      setOtherMoviesSpinner(false);
      setRefreshing(false);
      const threeWeeksAgo = new Date();
      threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21); // Three weeks = 7 days * 3
      const recentRelease = data?.data.filter((item: any) => {
        const filmOpeningDate = new Date(item.filmOpeningDate);
        return filmOpeningDate >= threeWeeksAgo && item?._id !== movieId;
      });
      setMoviesData(recentRelease);
    } catch (error: any) {
      setOtherMoviesSpinner(false);
      setRefreshing(false);
      Snackbar.show({text: error?.response?.data?.message});
    }
  };

  const onStateChange = useCallback((state: any) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const openModal = (): void => {
    setVideoSpinner(true);
    setModalVisible(true);
    setPlaying(true);
  };

  const onReadyVideo = (): void => {
    setVideoSpinner(false);
  };

  const closeModal = (): void => {
    setModalVisible(false);
    setPlaying(false);
  };

  const onMovie = (): void => {
    navigation.navigate('theatreSeats', {
      movieId: movieId,
      movieName: moviesDetails?.name,
      censorRating: moviesDetails?.censorRating,
      flag: 'moviesDetail',
      languages: moviesDetails?.languages,
      filmCode: moviesDetails?.filmCode,
      filmOpeningDate: moviesDetails?.filmOpeningDate,
      showExtendedDays: moviesDetails?.showExtendedDays,
    });
  };

  const onOtherMovies = (item: any): void => {
    setMovieId(item?._id);
  };

  const onShare = async () => {
    try {
      await Share.share({
        title: 'Connplex' + ' ',
        message: `Movie Title: ${moviesDetails?.name}\nDescription: ${
          moviesDetails?.description ? moviesDetails?.description : '-'
        }\n${constant.myMovieDetail}?mId=${movieId}`,
      });
    } catch (error) {
      Log('SHARE ERROR :', error);
    }
  };

  const validation = (): void => {
    let isValid = true;
    if (!review) {
      isValid = false;
      setError(validationMessage.emptyReview);
    } else if (!StringValidation(review)) {
      isValid = false;
      setError(validationMessage.invalidReview);
    } else {
      setError(undefined);
    }
    if (review?.length) {
      if (movieRating === 0 && theatreRating == 0) {
        isValid = false;
        Snackbar.show({text: 'Please add movie & connplex rating'});
      } else if (movieRating === 0) {
        isValid = false;
        Snackbar.show({text: 'Please add movie rating'});
      } else if (theatreRating == 0) {
        isValid = false;
        Snackbar.show({text: 'Please add connplex rating'});
      }
    }
    if (isValid) {
      movieReview();
    }
  };

  const movieReview = async () => {
    /* API call for movie and cinema Review from user */
    try {
      setReviewSpinner(true);
      const formData = new URLSearchParams();
      formData.append('movieId', movieId);
      //@ts-ignore
      formData.append('movieRate', movieRating);
      if (review) {
        formData.append('movieReview', review);
      }
      //@ts-ignore
      formData.append('connplexRate', theatreRating);
      const {data} = await axiosInstance.post(
        constant.userReview,
        formData?.toString(),
        {
          headers: {
            auth: token,
          },
        },
      );
      setReviewSpinner(false);
      Snackbar.show({text: data?.message, duration: 9000});
      setTimeout(() => {
        closeSheet();
      }, 200);
      getMoviesDetails('review');
    } catch (error: any) {
      setReviewSpinner(false);
      Snackbar.show({text: error?.response?.data?.message ?? error?.message});
    }
  };

  const likeDislikeMovies = async () => {
    /* API call for liking/disliking movie */
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    if (token) {
      try {
        const formData = {
          movieId: movieId,
        };
        setLikes(!likes);
        setTotalLikes(e => (!likes ? e + 1 : e - 1));
        const {data} = await axiosInstance.post(
          constant.userLikeDislike,
          formData,
          {
            headers: {
              auth: token,
            },
          },
        );
        // setTotalLikes(data?.data?.totalLikes);
      } catch (error: any) {
        Snackbar.show({text: error?.response?.data?.message});
      }
    } else {
      setVisible(true);
    }
  };

  const onSearch = (): void => {
    navigation.navigate('searchMovies');
  };

  const onLocation = (): void => {
    navigation.navigate('selectCity', {flag: 'home'});
  };

  return {
    moviesData,
    setMoviesData,
    moviesDetails,
    setLoading,
    loading,
    modalVisible,
    playing,
    setPlaying,
    onMovie,
    openModal,
    closeModal,
    onStateChange,
    videoId,
    movieCategory,
    onReadMore,
    description,
    readMore,
    onOtherMovies,
    onShare,
    likes,
    closeSheet,
    openSheet,
    refRBSheet,
    review,
    setReview,
    error,
    validation,
    movieRating,
    theatreRating,
    reviewSpinner,
    likeDislikeMovies,
    totalLikes,
    closeReviewSheet,
    openReviewSheet,
    reviewSheet,
    handleMovieRating,
    handleTheatreRating,
    animationHeight,
    expanded,
    videoSpinner,
    onReadyVideo,
    onTextLayout,
    textRef,
    otherMoviesSpinner,
    onSearch,
    onLocation,
    cityData,
    refreshing,
    onRefreshCall,
    clearState,
    visible,
    setVisible,
    scaleValue,
  };
};

export default movieDetailsController;
