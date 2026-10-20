import messaging from '@react-native-firebase/messaging';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import PushNotification from 'react-native-push-notification';
import Snackbar from 'react-native-snackbar';
import {AuthNavigationProps} from '../../navigation/stacks/authStack';
import axiosInstance from '../../services/api';
import constant from '../../services/config/constant';
import {
  useAppDispatch,
  useAppSelector,
} from '../../services/config/redux/useReduxHooks';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import Log from '../../utility/log';
import {
  AdDataProps,
  HomeScreenControllerProps,
  HomeScreenProps,
} from './homeScreen.interface';

import {PermissionsAndroid, Platform} from 'react-native';
import {cityData as cityDataAction} from '../../services/config/redux/userReducer/action';

const homeScreenController = (): HomeScreenControllerProps => {
  const dispatch = useAppDispatch();
  const {token} = useAppSelector(state => state.UserReducer);
  const {extractVideoId} = commonFunctions();
  const isFocused = useIsFocused();
  const navigation = useNavigation<AuthNavigationProps>();
  const {cityData} = useAppSelector(state => state.UserReducer);
  const [cinemaData, setCinemaData] = useState<HomeScreenProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [videoSpinner, setVideoSpinner] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [videoID, setVideoID] = useState<string>();
  const [imageSpinner, setImageSpinner] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [adData, setAdData] = useState<AdDataProps[]>([]);
  const [load, setLoad] = useState<any>({});
  const [isAdLoad, setIsAdLoad] = useState<boolean>(false);

  useEffect(() => {
    if (cityData) {
      getAdBanner();
    }
  }, [cityData]);

  useEffect(() => {
    if (!cityData?._id) {
      getRegionData();
    } else {
      getCinemaData();
    }
  }, [cityData?._id]);

  useEffect(() => {
    /** Notification show when app is in foreground*/
    messaging().onMessage((remoteMessage: any) => {
      console.log('remoteMessage::::', remoteMessage);

      PushNotification.cancelAllLocalNotifications();
      PushNotification.localNotification({
        channelId: 'ConnplexChannel',
        title: remoteMessage?.notification?.title,
        message: remoteMessage?.notification?.body,
        bigPictureUrl: remoteMessage?.notification?.android?.imageUrl,
        picture: remoteMessage?.data?.fcm_options?.image,
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_notification',
        priority: 'high',
        importance: 'high',
      });

      // PushNotification.localNotification({
      //   channelId: 'ConnplexChannel',
      //   title: remoteMessage?.notification?.title,
      //   message: remoteMessage?.notification?.body,
      //   image: remoteMessage?.notification?.image,
      // });
      navigateToNotification();
    });
    /* Notification show when app is in background */
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      navigateToNotification();
    });
    /** Notification show when app is close (kill mode)*/
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('remote message kill mode', remoteMessage);
        if (remoteMessage) {
          navigateToNotification();
        }
      });
  }, []);

  useEffect(() => {
    requestUserPermission();
  }, [token]);

  const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
    }
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (Platform.OS == 'android') {
      const NotificationPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (NotificationPermission == PermissionsAndroid.RESULTS.GRANTED) {
        getToken();
      }
    }
    if (enabled) {
      getToken();
    }
  };

  const getToken = async () => {
    PushNotification.createChannel(
      {
        channelId: 'ConnplexChannel',
        channelName: 'Connplex Channel',
        channelDescription: 'A channel to categorise your notifications',
        playSound: false,
        soundName: 'default',
        vibrate: true,
      },
      created => {},
    );
    try {
      const FCMtoken = await messaging().getToken();
      addUpdateFCM(FCMtoken);
    } catch (error) {
      Log('Error getting FCM token:', error);
    }
  };

  const addUpdateFCM = (deviceToken: string) => {
    if (!token) return;
    const data = {fcmToken: deviceToken};
    axiosInstance
      .post(constant.updateFCM, data, {
        headers: {auth: token},
      })
      .then(res => {
        console.log('res', res);
      })
      .catch(e => {
        console.log('e', e);
      });
  };

  const getAdBanner = async () => {
    /* API call for getting ad sliders */
    if (!cityData?._id) return;
    if (!refreshing) {
      setIsAdLoad(true);
    }
    try {
      const {data} = await axiosInstance.get(
        `${constant.sliders}/${cityData?._id}/App`,
      );
      setAdData(data?.data);
    } catch (error: any) {
      setAdData([]);
      setRefreshing(false);
    } finally {
      setIsAdLoad(false);
      setRefreshing(false);
    }
  };

  const navigateToNotification = () => {
    PushNotification.configure({
      onNotification: notification => {
        // navigation.navigate('notifications');
      },
    });
  };

  const refreshJob = () => {
    /** Refresh the data using refresh control */
    setRefreshing(true);
    getAdBanner();
    getCinemaData();
  };

  const getCinemaData = async () => {
    if (!cityData?._id) return;
    try {
      setLoading(true);
      const {data} = await axiosInstance.get(
        `${constant.getCinema}/${cityData?._id}`,
      );
      Log('home cinema data', data?.data);

      setCinemaData(data?.data);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getVideoId = (url: string): void => {
    if (url) {
      setVideoSpinner(true);
      setVideoID(extractVideoId(url));
      setPlaying(true);
      setModalVisible(true);
    } else {
      Snackbar.show({text: 'No trailer available'});
    }
  };

  const getRegionData = async (refresh?: boolean) => {
    /* API call for getting region data */
    try {
      const {data} = await axiosInstance.get(constant.getRegion);
      if (data.data) {
        const selectedCity = data.data[0];
        dispatch(cityDataAction(selectedCity));
      }
    } catch (error: any) {
      // Snackbar.show({text: error?.response?.data?.message ?? error?.message});
    }
  };

  const onReadyVideo = (): void => {
    setVideoSpinner(false);
  };

  const threeWeeksAgo = new Date();
  threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21); // Three weeks = 7 days * 3

  // Filter the data based on the date
  const recentRelease = (cinemaData || []).filter(item => {
    const filmOpeningDate = new Date(item.filmOpeningDate);
    return filmOpeningDate >= threeWeeksAgo;
  });

  const onImageLoadStart = (): void => {
    setImageSpinner(true);
  };
  const onImageLoadEnd = (): void => {
    setImageSpinner(false);
  };

  const handleLoadStart = (index: number) => {
    setLoad(prev => ({...prev, [index]: true}));
  };
  const handleLoadEnd = (index: number) => {
    setLoad(prev => ({...prev, [index]: false}));
  };

  const onSearch = (): void => {
    navigation.navigate('searchMovies');
  };

  const onMoviesShow = (): void => {
    navigation.navigate('searchMovies', {type: 'movie'});
  };

  const onLocation = (): void => {
    navigation.navigate('selectCity', {flag: 'home'});
  };

  const onMovie = (item: any): void => {
    navigation.navigate('movieDetails', {
      movieId: item?._id,
    });
  };

  const onBookNow = (id: string): void => {
    navigation.navigate('movieDetails', {
      movieId: id,
    });
  };

  const onStateChange = useCallback((state: any) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const closeModal = (): void => {
    setModalVisible(false);
    setPlaying(false);
    setVideoID('');
  };

  return {
    onSearch,
    onMovie,
    onLocation,
    cinemaData,
    setCinemaData,
    loading,
    setLoading,
    getCinemaData,
    cityData,
    onMoviesShow,
    modalVisible,
    playing,
    setPlaying,
    onStateChange,
    videoID,
    onBookNow,
    getVideoId,
    closeModal,
    videoSpinner,
    imageSpinner,
    onImageLoadEnd,
    onImageLoadStart,
    recentRelease,
    onReadyVideo,
    refreshJob,
    refreshing,
    adData,
    load,
    handleLoadStart,
    handleLoadEnd,
    isAdLoad,
  };
};

export default homeScreenController;
