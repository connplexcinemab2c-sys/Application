import {useEffect, useState} from 'react';
import Snackbar from 'react-native-snackbar';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  AuthNavigationProps,
  AuthParams,
} from '../../navigation/stacks/authStack';
import axiosInstance from '../../services/api';
import constant from '../../services/config/constant';
import {
  MoviesData,
  SearchMoviesControllerProps,
} from './searchMovies.interface';
import {Keyboard} from 'react-native';
import {useAppSelector} from '../../services/config/redux/useReduxHooks';

const searchMoviesController = (): SearchMoviesControllerProps => {
  const route: any = useRoute<RouteProp<AuthParams, 'searchMovies'>>();
  const navigation = useNavigation<AuthNavigationProps>();
  const isFocused = useIsFocused();
  const cityData = useAppSelector(state => state.UserReducer.cityData);
  const type = route?.params?.type;
  const [search, setSearch] = useState<string>('');
  const [moviesData, setMoviesData] = useState<MoviesData[]>([]);
  const [originalData, setOriginalData] = useState<MoviesData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cinemaRegionData, setCinemaRegionData] = useState<any>([]);
  const [originalCinemaData, setOriginalCinemaData] = useState<any>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    setSearch('');
    setLoading(true);
    getMoviesData();
  }, [isFocused]);

  const getMoviesData = async () => {
    /* API call for getting search movie data */
    try {
      const {data} = await axiosInstance.get(
        `${constant.getCinema}/${cityData?._id}` + '?' + new Date().getTime(),
      );
      setMoviesData(data?.data);
      setOriginalData(data?.data);
      if (type != 'movie') {
        getCinemaByRegion();
      } else {
        setLoading(false);
        setRefreshing(false);
      }
    } catch (error: any) {
      setLoading(false);
      setRefreshing(false);
      Snackbar.show({text: error?.response?.data?.message ?? error?.message});
    }
  };

  const getCinemaByRegion = async (refresh?: boolean) => {
    /** Cinema Theaters List Api call */
    try {
      const {data} = await axiosInstance.get(
        `${constant.getCinemaByRegion}/${cityData?._id}`,
      );
      setLoading(false);
      setRefreshing(false);
      setCinemaRegionData(data?.data);
      setOriginalCinemaData(data?.data);
    } catch (error: any) {
      setLoading(false);
      setRefreshing(false);
      Snackbar.show({text: error?.response?.data?.message ?? error?.message});
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const filter = originalData?.filter((item: any) => {
      const itemData = `${item?.name}`;
      const textData = text.toLowerCase();
      return itemData.toLowerCase().includes(textData);
    });
    setMoviesData(filter);
    const filterCinema = originalCinemaData?.filter((item: any) => {
      const itemData = `${item?.displayName}`;
      const textData = text.toLowerCase();
      return itemData.toLowerCase().includes(textData);
    });
    setCinemaRegionData(filterCinema);
  };

  const onSearch = (id: string): void => {
    navigation.navigate('movieDetails', {movieId: id});
  };

  const onCinema = (item: any) => {
    navigation.navigate('moviesPerCinema', {data: item});
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onClear = () => {
    setSearch('');
    Keyboard.dismiss();
    setMoviesData(originalData);
    setCinemaRegionData(originalCinemaData);
  };

  const refreshCall = () => {
    setSearch('');
    setRefreshing(true);
    getMoviesData();
  };

  return {
    search,
    moviesData,
    loading,
    handleSearch,
    onSearch,
    cinemaRegionData,
    onCinema,
    onBack,
    onClear,
    type,
    refreshing,
    refreshCall,
  };
};

export default searchMoviesController;
