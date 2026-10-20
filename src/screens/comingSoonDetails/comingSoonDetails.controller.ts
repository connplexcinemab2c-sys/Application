import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, Easing, Share} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {ItemProps} from '../../components/cards/movieList/movieList.interface';
import screenName from '../../navigation/screenName';
import {AuthParams} from '../../navigation/stacks/authStack';
import axiosInstance from '../../services/api';
import constant from '../../services/config/constant';
import params from '../../services/config/params';
import {useAppSelector} from '../../services/config/redux/useReduxHooks';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import Log from '../../utility/log';

const comingSoonDetailsController = () => {
  const {extractVideoId} = commonFunctions();
  const navigation = useNavigation<any>();
  const route: any = useRoute<RouteProp<AuthParams, 'movieDetails'>>();
  const {cityData, userData, token} = useAppSelector(
    state => state.UserReducer,
  );
  const [movieId, setMovieId] = useState<string>(route?.params?.id);
  const [moviesData, setMoviesData] = useState<ItemProps[]>([]);
  const [moviesDetails, setMoviesDetails] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [movieCategory, setMovieCategory] = useState<string[]>([]);
  const [videoId, setVideoId] = useState<string>();
  const [likes, setLikes] = useState<boolean>(false);
  const [isInterested, setIsInterested] = useState<boolean>(false);
  const [readMore, setReadMore] = useState<boolean>(false);
  const [totalLikes, setTotalLikes] = useState<number>(0);
  const [isReviewed, setIsReviewed] = useState<boolean>(true);
  const [videoSpinner, setVideoSpinner] = useState<boolean>(false);
  const [expanded, setExpanded] = useState(false);
  const [textHeight, setTextHeight] = useState(0);
  const [interested, setInterested] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const textRef = useRef(null);

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    getMoviesDetails('details');
  }, [movieId]);

  useEffect(() => {
    if (token) {
      getMovieInterestList();
    }
  }, []);

  useEffect(() => {
    if (route?.params?.id) {
      setMovieId(route?.params?.id);
    }
  }, [route?.params?.id]);

  const onRefreshCall = () => {
    setRefreshing(true);
    getMovies();
    getMoviesDetails('details');
    getMovieInterestList();
  };

  const animationHeight = useRef(new Animated.Value(45))?.current;

  const onTextLayout = (event: any): void => {
    setTextHeight(event.nativeEvent.layout.height);
  };

  const toggleExpansion = () => {
    setExpanded(!expanded);
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
        toValue: 45,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [expanded]);

  const description = moviesDetails?.description
    ? moviesDetails?.description?.length > 90 && !readMore
      ? moviesDetails?.description?.slice(0, 90)
      : moviesDetails?.description
    : 'N/A';

  const onReadMore = (): void => {
    if (moviesDetails?.description && moviesDetails?.description?.length > 90) {
      setReadMore(!readMore);
      toggleExpansion();
    }
  };

  const onMovie = (): void => {
    if (route?.params?.linkedNowPlayingMovie) {
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
    } else {
      navigation.navigate('theatreSeats', {
        movieId: movieId,
        movieName: moviesDetails?.name,
        censorRating: moviesDetails?.censorRating,
        flag: 'comingSoon',
        showExtendedDays: moviesDetails?.showExtendedDays,
      });
    }
  };

  const getMoviesDetails = async (type: string) => {
    /* API call for getting movie details */
    if (type !== 'review') {
      setLoading(true);
    }
    try {
      const params = {
        movieId: movieId,
        userId: userData?._id,
      };
      const {data} = await axiosInstance.get(constant.movieDetails, {
        params: params,
      });
      setTimeout(() => {
        setLoading(false);
      }, 600);
      setRefreshing(false);
      if (data?.data) {
        setMoviesDetails(data?.data);
        const categories = data?.data?.category.split(', ');
        setMovieCategory(categories);
        if (data?.data?.youtubeVideoUrl) {
          setVideoId(extractVideoId(data?.data?.youtubeVideoUrl));
        }
        setTotalLikes(data?.data?.likes);
        setIsReviewed(data?.data?.isAlreadyRated);
        setLikes(data?.data?.isLiked ? true : false);
      }
      Log('moviedetails', JSON.stringify(data?.data));
    } catch (error: any) {
      setLoading(false);
      setRefreshing(false);
      Snackbar.show({text: error?.response?.data?.message ?? error?.message});
    }
  };

  const getMovies = async () => {
    /* API call for getting movie list */
    try {
      setLoading(true);
      const {data} = await axiosInstance.get(
        `${constant.getCinema}/${cityData?._id}`,
      );
      setLoading(false);
      setRefreshing(false);
      const threeWeeksAgo = new Date();
      threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21); // Three weeks = 7 days * 3
      const recentRelease = data?.data.filter((item: any) => {
        const filmOpeningDate = new Date(item.filmOpeningDate);
        return filmOpeningDate >= threeWeeksAgo;
      });
      setMoviesData(recentRelease);
    } catch (error: any) {
      setLoading(false);
      setRefreshing(false);
      Snackbar.show({text: error?.response?.data?.message ?? error?.message});
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

  const onOtherMovies = (item: any): void => {
    navigation.navigate('movieDetails', {movieId: item?._id});
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

  const onInterestCall = async () => {
    if (token) {
      setInterested(!interested);
      const formData = {
        [params.movieId]: moviesDetails?._id,
        [params.isInterested]: !interested,
      };
      try {
        const {data} = await axiosInstance.post(
          constant.interestedMovie,
          formData,
          {
            headers: {
              auth: token,
            },
          },
        );
        Snackbar.show({text: data?.message});
        getMovieInterestList();
        Log('movie isInterested', JSON.stringify(data?.data));
      } catch (error: any) {
        Log('movie isInterested error', error?.response);
      }
    } else {
      setVisible(true);
    }
  };

  const getMovieInterestList = async () => {
    /* API call for getMovieInterestList */
    if (token) {
      const formData = {
        [params.movieId]: movieId,
        [params.userId]: userData?._id,
      };
      try {
        const {data} = await axiosInstance.post(
          constant.movieInterested,
          formData,
          {
            headers: {
              auth: token,
            },
          },
        );
        setRefreshing(false);
        setInterested(data?.data?.isInterested);
      } catch (error: any) {
        setRefreshing(false);
        // Snackbar.show({text: error?.response?.data?.message ?? error?.message});
        Log('getMovieovie interested error', error?.response);
      }
    } else {
      setVisible(true);
    }
  };

  const likeDislikeMovies = async () => {
    /* API call for liking/disliking movie */
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
        Snackbar.show({text: error?.response?.data?.message ?? error?.message});
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

  const onLogoClick = () => {
    navigation.navigate(screenName.homeScreen);
  };

  return {
    onMovie,
    moviesData,
    moviesDetails,
    loading,
    modalVisible,
    playing,
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
    likeDislikeMovies,
    isReviewed,
    totalLikes,
    animationHeight,
    isInterested,
    videoSpinner,
    onReadyVideo,
    onTextLayout,
    textRef,
    onSearch,
    onLocation,
    cityData,
    onInterestCall,
    interested,
    refreshing,
    onRefreshCall,
    onLogoClick,
    visible,
    setVisible,
  };
};

export default comingSoonDetailsController;
