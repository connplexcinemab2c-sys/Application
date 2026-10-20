import {useIsFocused, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import screenName from '../../navigation/screenName';
import {axiosInstance} from '../../services/api/api';
import constant from '../../services/config/constant';
import {useAppSelector} from '../../services/config/redux/useReduxHooks';
import Log from '../../utility/log';
import {
  ComingSoonControllerProps,
  UpcomingMovies,
} from './comingSoon.interface';

const comingSoonController = (): ComingSoonControllerProps => {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const {cityData} = useAppSelector(state => state.UserReducer);
  const [search, setSearch] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [upcomingMovies, setUpcomingMovies] = useState<UpcomingMovies[]>([]);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<UpcomingMovies[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (isFocused) {
      setShowSearch(false);
      setSearch('');
      getUpcomingMovies();
    }
  }, [isFocused]);

  const refreshJob = (): void => {
    setRefreshing(true);
    getUpcomingMovies(true);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    let newData = filterData?.filter((item: UpcomingMovies) => {
      let search = [item?.name];
      let regex = search.toString().toLowerCase();
      return regex.includes(value.toLowerCase());
    });
    setUpcomingMovies(newData);
    if (value?.length == 0) {
      setShowSearch(false);
    }
  };

  const getUpcomingMovies = async (refresh?: boolean) => {
    /* API call for getting upcoming movies */
    try {
      if (!refresh) {
        setLoading(true);
      }
      const {data} = await axiosInstance.get(
        `${constant.getUpcomingMovies}?regionId=${cityData?._id}`,
      );
      console.log('data upcoming', JSON.stringify(data?.data));
      setLoading(false);
      setRefreshing(false);
      if (data?.data?.length != 0) {
        const list = data?.data
          ?.filter(
            (item: any) => item?.month === moment(Date()).format('MMM YYYY'),
          )[0]
          ?.movies?.filter((item: any) =>
            moment(Date()).isBefore(moment(item?.filmOpeningDate)),
          );
        const nextMonthList = data?.data
          ?.filter(
            (item: any) =>
              item?.month === moment().add(1, 'month').format('MMM YYYY'),
          )[0]
          ?.movies?.filter((item: any) =>
            moment(Date()).isBefore(moment(item?.filmOpeningDate)),
          );
        if (nextMonthList?.length > 0 && list?.length > 0) {
          setUpcomingMovies([...list, ...nextMonthList]);
          setFilterData([...list, ...nextMonthList]);
        } else {
          setUpcomingMovies(list?.length > 0 ? list : nextMonthList);
          setFilterData(list?.length > 0 ? list : nextMonthList);
        }
        // setUpcomingMovies(list?.length > 0 ? nextMonthList : nextMonthList);
      } else {
        setUpcomingMovies([]);
        setFilterData([]);
      }
    } catch (error: any) {
      Log('upcoming movies error', error?.response);
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onMovieDetails = (item: any) => {
    navigation.navigate('comingSoonDetails', {
      id: item?.linkedNowPlayingMovie ? item?.linkedNowPlayingMovie : item?._id,
      linkedNowPlayingMovie: item?.linkedNowPlayingMovie ? true : false,
    });
  };

  const handleSearchOpen = (): void => {
    setShowSearch(true);
  };

  const onBack = () => {
    navigation.navigate(screenName.homeScreen);
  };

  const onClear = () => {
    setSearch('');
    Keyboard.dismiss();
    setUpcomingMovies(filterData);
  };

  return {
    search,
    setSearch,
    loading,
    upcomingMovies,
    handleSearch,
    handleSearchOpen,
    showSearch,
    onMovieDetails,
    refreshing,
    refreshJob,
    onBack,
    onClear,
  };
};

export default comingSoonController;
