import {useEffect, useState} from 'react';
import constant from '../../services/config/constant';
import axiosInstance from '../../services/api';
import Snackbar from 'react-native-snackbar';
import {PermissionsAndroid, Platform} from 'react-native';
import Log from '../../utility/log';
import GetLocation from 'react-native-get-location';
import {getUserLocationIos} from '../../utility/getCurrentLocation';
import messaging from '@react-native-firebase/messaging';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {
  changeCityModalState,
  cityData,
} from '../../services/config/redux/userReducer/action';
import {
  useAppDispatch,
  useAppSelector,
} from '../../services/config/redux/useReduxHooks';

const selectCityModalController = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.UserReducer);
  const [visible, setVisible] = useState<boolean>(false);
  const [regionData, setRegionData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [locationSpinner, setLocationSpinner] = useState<boolean>(false);

  useEffect(() => {
    if (user?.cityModal && !user?.cityData) {
      setTimeout(() => {
        setVisible(true);
      }, 300);
    } else {
      dispatch(changeCityModalState(true));
    }
  }, [user?.cityData]);

  useEffect(() => {
    getRegionData();
    requestUserPermission();
  }, [user?.cityData]);

  const refreshCall = () => {
    setRefreshing(true);
    getRegionData();
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
    if (!user?.cityData) {
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
    } else {
      setVisible(false);
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
      // Snackbar.show({text: error?.message});
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

  const getRegionData = async (refresh?: boolean) => {
    /* API call for getting region data */
    try {
      setLoading(true);
      const {data} = await axiosInstance.get(constant.getRegion);
      setLoading(false);
      setRefreshing(false);
      setRegionData(data?.data);
    } catch (error: any) {
      setLoading(false);
      setRefreshing(false);
      setRegionData([]);
      // Snackbar.show({text: error?.response?.data?.message ?? error?.message});
    }
  };

  const navigateToCinemaScreen = (selectedCity: any) => {
    dispatch(cityData(selectedCity));
    setVisible(false);
  };

  return {
    visible,
    regionData,
    loading,
    locationPermission,
    locationSpinner,
    navigateToCinemaScreen,
    refreshing,
    refreshCall,
  };
};

export default selectCityModalController;
