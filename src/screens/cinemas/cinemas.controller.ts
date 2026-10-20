import {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import axiosInstance from '../../services/api';
import {CinemasControllerProps} from './cinemas.interface';
import constant from '../../services/config/constant';
import {ItemProps} from '../../components/cards/cinemaList/cinemaList.interface';
import screenName from '../../navigation/screenName';
import {Keyboard} from 'react-native';
import {useAppSelector} from '../../services/config/redux/useReduxHooks';

const cinemasController = (): CinemasControllerProps => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();
  const {cityData} = useAppSelector(state => state.UserReducer);
  const [cinemaRegionData, setCinemaRegionData] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>();
  const [originalData, setOriginalData] = useState<ItemProps[]>([]);
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (cityData?._id) {
      getCinemaByRegion();
    }
    setSearch('');
    setSearchVisible(false);
  }, [cityData, isFocused]);

  const refreshJob = (): void => {
    setRefreshing(true);
    getCinemaByRegion(true);
  };

  const getCinemaByRegion = async (refresh?: boolean) => {
    /** Cinema Theaters List Api call */
    if (!refresh) {
      setLoading(true);
    }
    axiosInstance
      .get(`${constant.getCinemaByRegion}/${cityData?._id}`)
      .then(res => {

        setLoading(false);
        setRefreshing(false);
        setCinemaRegionData(res?.data?.data);
        setOriginalData(res?.data?.data);
      })
      .catch(e => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  const onSelectLocation = (): void => {
    navigation.navigate('selectCity', {flag: 'cinema'});
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const filter = originalData?.filter((item: any) => {
      const itemData = `${item?.cinemaName}`;
      const textData = text.toLowerCase();
      return itemData.toLowerCase().includes(textData);
    });
    setCinemaRegionData(filter);
  };

  const onCinema = (item: ItemProps) => {
    navigation.navigate('moviesPerCinema', {data: item});
  };

  const onClear = () => {
    setSearch('');
    Keyboard.dismiss();
    setCinemaRegionData(originalData);
  };

  const onLogoClick = () => {
    navigation.navigate(screenName.homeScreen);
  };

  return {
    handleSearch,
    search,
    setSearch,
    onSelectLocation,
    cinemaRegionData,
    setCinemaRegionData,
    loading,
    searchVisible,
    setSearchVisible,
    cityData,
    onCinema,
    refreshing,
    refreshJob,
    onLogoClick,
    onClear,
  };
};

export default cinemasController;
