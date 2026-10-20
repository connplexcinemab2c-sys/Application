import {useEffect, useState} from 'react';
import {Platform, PermissionsAndroid, Keyboard} from 'react-native';
import GetLocation from 'react-native-get-location';
import messaging from '@react-native-firebase/messaging';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {RouteProp, useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {useRoute} from '@react-navigation/native';
import {
  AuthNavigationProps,
  AuthParams,
} from '../../navigation/stacks/authStack';
import axiosInstance from '../../services/api';
import {
  changeModalState,
  cityData,
} from '../../services/config/redux/userReducer/action';
import constant from '../../services/config/constant';
import Log from '../../utility/log';
import {SelectCityControllerProps, RegionData} from './selectCity.interface';
import {getUserLocationIos} from '../../utility/getCurrentLocation';
import {
  useAppDispatch,
  useAppSelector,
} from '../../services/config/redux/useReduxHooks';

const selectCityController = (): SelectCityControllerProps => {
  const navigation = useNavigation<AuthNavigationProps>();
  const route = useRoute<RouteProp<AuthParams, 'selectCity'>>();
  const user = useAppSelector(state => state.UserReducer);
  const flag = route?.params?.flag;
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>();
  const [regionData, setRegionData] = useState<RegionData[]>([]);
  const [originalData, setOriginalData] = useState<RegionData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [locationSpinner, setLocationSpinner] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    getRegionData();
    if (
      flag === 'login' ||
      (flag !== 'login' && flag !== 'cinema' && flag !== 'home')
    ) {
      requestUserPermission();
    }
  }, []);

  const refreshJob = (): void => {
    setRefreshing(true);
    getRegionData(true);
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    const data = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  };

  const locationPermission = async () => {
    /* Permission for getting user location */
    try {
      if (Platform.OS == 'android') {
        const data =
          await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
          });
        if (data === 'enabled' || data === 'already-enabled') {
          setLocationSpinner(true);
          getUserLocation();
        } else {
          setLocationSpinner(false);
        }
      } else {
        let lat = await getUserLocationIos();
        if (lat?.latitude && lat?.longitude) {
          setLocationSpinner(true);
          getCurrentLocation(lat?.latitude, lat?.longitude);
        } else {
          Snackbar.show({text: 'Access Denied.'});
        }
      }
    } catch (error: any) {
      setLocationSpinner(false);
      Snackbar.show({text: 'Access Denied.'});
    }
  };

  const getUserLocation = async () => {
    /* Getting user's current location */
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted) {
        const {latitude, longitude} = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        });
        if (latitude && longitude) {
          getCurrentLocation(latitude, longitude);
        }
      } else {
        setLocationSpinner(false);
        await requestLocationPermission();
      }
    } catch (error: any) {
      setLocationSpinner(false);
      Snackbar.show({text: error?.message});
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Log('check Permission', 'Location permission granted.');
        setLocationSpinner(true);
        getUserLocation();
      } else {
        Log('check Permission', 'Location permission granted.');
        Snackbar.show({
          text: 'Location permission is required to use this feature.',
        });
      }
    } catch (error: any) {
      Log('Error while requesting location permission:', error);
      setLocationSpinner(false);
      Snackbar.show({text: 'Access Denied.'});
    }
  };

  const getCurrentLocation = async (latitude: number, longitude: number) => {
    /* API call for getting near by region */
    try {
      const {data} = await axiosInstance.get(
        `${constant.getNearByRegion}/${latitude}/${longitude}`,
      );
      setLocationSpinner(false);
      Log('get near by region', data?.data);
      navigateToCinemaScreen(data?.data);
    } catch (error: any) {
      setLocationSpinner(false);
      Snackbar.show({text: error?.response?.data?.message ?? error?.message});
      Log('current location error', error?.response);
    }
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', nav => {
      // Prevent going back on swipe
      if (nav.data.action.type === 'GO_BACK' && !nav.data.action.source) {
        nav.preventDefault();
      }
    });
  }, [navigation]);

  const getRegionData = async (refresh?: boolean) => {
    /* API call for getting region data */
    try {
      if (!refresh) {
        setLoading(true);
      }
      const {data} = await axiosInstance.get(constant.getRegion);
      setLoading(false);
      setRefreshing(false);
      setRegionData(data?.data);
      setOriginalData(data?.data);
    } catch (error: any) {
      setLoading(false);
      setRefreshing(false);
      setRegionData([]);
      setOriginalData([]);
      // Snackbar.show({text: error?.response?.data?.message ?? error?.message});
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const filter = originalData?.filter((item: any) => {
      const itemData = `${item?.region}`;
      const textData = text.toLowerCase();
      return itemData.toLowerCase().includes(textData);
    });
    setRegionData(filter);
  };

  const navigateToCinemaScreen = (selectedCity: any) => {
    if (flag === 'cinema') {
      dispatch(cityData(selectedCity));
      navigation.navigate('cinemas');
    } else {
      dispatch(cityData(selectedCity));
      if (flag !== 'login' && flag !== 'cinema' && flag !== 'home') {
        dispatch(changeModalState(true));
      }
      if (flag === 'login') {
        navigation.reset({
          index: 0,
          routes: [{name: 'bottom'}],
        });
      } else {
        navigation.navigate('bottom');
      }
    }
  };

  const onBack = () => {
    if (!user?.cityData) {
      locationPermission();
    } else {
      navigation.navigate('bottom');
    }
  };

  const onClear = () => {
    setSearch('');
    Keyboard.dismiss();
    setRegionData(originalData);
  };

  return {
    setSearch,
    search,
    regionData,
    setRegionData,
    loading,
    setLoading,
    getRegionData,
    originalData,
    setOriginalData,
    handleSearch,
    navigateToCinemaScreen,
    locationPermission,
    locationSpinner,
    refreshing,
    refreshJob,
    onBack,
    onClear,
  };
};

export default selectCityController;
