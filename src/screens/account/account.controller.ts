import {useCallback, useEffect, useRef, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {AccountControllerProps} from './account.interface';
import {axiosInstance} from '../../services/api/api';
import constant from '../../services/config/constant';
import Log from '../../utility/log';
import {
  editProfiles,
  logoutSuccess,
  updateData,
} from '../../services/config/redux/userReducer/action';
import Snackbar from 'react-native-snackbar';
import screenName from '../../navigation/screenName';
import {ScrollView} from 'react-native';
import {
  useAppDispatch,
  useAppSelector,
} from '../../services/config/redux/useReduxHooks';
import moment from 'moment';

const accountController = (): AccountControllerProps => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const {userData, loginType, token} = useAppSelector(
    state => state.UserReducer,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [imageSpinner, setImageSpinner] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [getDetailSubscription, setGetDetailSubscription] = useState();
  const scrollRef = useRef<ScrollView>(null);
  const [durationText, setDurationText] = useState('');

  useFocusEffect(
    useCallback(() => {
      scrollRef.current?.scrollTo({y: 0, animated: true});
    }, []),
  );

  useEffect(() => {
    if (token) {
      getUserInfo();
      getActivePlan();
      getMemberShipList();
    }
  }, [isFocused, token]);

  const onRefresh = () => {
    setRefreshing(true);
    getUserInfo();
  };

  const getMembershipDurationText = (days: number) => {
    if (days >= 365) {
      const years = days / 365;
      const roundedYears = Math.round(years);
      const isWholeYear = Number.isInteger(years);

      if (isWholeYear) {
        return `${roundedYears} Year${roundedYears > 1 ? 's' : ''}`;
      } else {
        const formattedYears = years.toFixed(1);
        return `${formattedYears} Years`;
      }
    } else if (days >= 30) {
      const months = Math.round(days / 30);
      return `${months} Month${months > 1 ? 's' : ''}`;
    } else {
      return `${days} Day${days > 1 ? 's' : ''}`;
    }
  };

  const getMemberShipList = async () => {
    if (!token) {
      setLoading(true);
    }

    try {
      const {data} = await axiosInstance.get(constant.subscriptionList);

      const membershipArray = data?.data;

      if (!Array.isArray(membershipArray)) {
        throw new Error('membershipDuration is not an array');
      }

      // Sort by updatedAt descending
      const sortedMemberships = membershipArray.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );

      const latestMembership = sortedMemberships[0];

      // Now use the latest membership
      setDurationText(latestMembership.membershipDuration);
      getMembershipDurationText(latestMembership.membershipDuration);

      setRefreshing(false);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setRefreshing(false);
      console.error('getMemberShipList error', error);
      Snackbar.show({text: error?.response?.data?.message ?? error?.message});
    }
  };

  const getActivePlan = async () => {
    setLoading(true);
    try {
      const {data} = await axiosInstance.get(constant.activePlan, {
        headers: {
          auth: token,
        },
      });

      // Optional: if you only want to use the latest one
      const latestSubscription = data.data?.filter(item => {
        return item.isActive == true;
      })[0];

      setGetDetailSubscription(latestSubscription); // set a single object, not array
      setRefreshing(false);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setRefreshing(false);
      Snackbar.show({text: error?.response?.data?.message ?? error?.message});
    }
  };

  const getUserInfo = async () => {
    axiosInstance
      .get(`${constant.userInfo}` + '?' + new Date().getTime() + {}, {
        headers: {
          auth: token,
        },
      })
      .then(res => {
        setRefreshing(false);
        dispatch(editProfiles(res?.data?.data));
      })
      .catch((e: any) => {
        setRefreshing(false);
      });
  };

  const getReminders = async () => {
    /* API call for getting reminders */
    try {
      setLoading(true);
      const {data} = await axiosInstance.get(constant.getReminders, {
        headers: {auth: token},
      });
      setLoading(false);
      dispatch(updateData(data?.data));
      navigation.navigate('remainder');
      Log('get reminder', data?.data);
    } catch (error) {
      setLoading(false);
      Log('get reminder error', error);
    }
  };

  const onItemPress = (name: any, title: any): void => {
    if (title == 'Delete Account') {
      setVisible(true);
    } else {
      navigation.navigate(name, {title: title});
    }
  };

  const onClickLogout = async () => {
    /* API call for removing token */
    setIsLoad(true);
    dispatch(logoutSuccess());
    try {
      const {data} = await axiosInstance.post(constant.logout, undefined, {
        headers: {
          auth: token,
        },
      });
      setIsLoad(false);
      setTimeout(() => {
        Snackbar.show({
          text: 'You have successfully logged out!',
        });
      }, 300);
      if (loginType === 'google') {
        signOut();
      }
      navigation.navigate('homeScreen');
      Log('logout', data);
    } catch (error) {
      setIsLoad(false);
      Log('logouterror', error);
    }
  };

  const logout = async () => {
    /* API call for removing token */
    try {
      const {data} = await axiosInstance.post(constant.logout, undefined, {
        headers: {
          auth: token,
        },
      });
      Log('logout', data);
    } catch (error) {
      Log('logouterror', error);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      const data = await GoogleSignin.signOut();
    } catch (error: any) {
      // Snackbar.show({text: error});
    }
  };

  const onEditProfile = (): void => {
    navigation.navigate('editProfile');
  };

  const onRightIcon = (): void => {
    getReminders();
  };

  const onImageLoad = (): void => {
    setImageSpinner(false);
  };

  const onImageLoadStart = (): void => {
    setImageSpinner(true);
  };

  const onLogoClick = () => {
    navigation.navigate(screenName.homeScreen);
  };

  const onDelete = async () => {
    setLoad(true);
    try {
      const formData = {
        id: userData?._id,
      };
      const {data} = await axiosInstance.post(constant.deleteAccount, formData);
      setLoad(false);
      setVisible(false);
      Snackbar.show({
        text: data?.message,
        duration: 3000,
      });
      dispatch(logoutSuccess());
      logout();
      if (loginType === 'google') {
        signOut();
      }
      navigation.navigate('homeScreen');
    } catch (e: any) {
      setLoad(false);
      setVisible(false);
      Log('deleteAccount error', e);
      Snackbar.show({
        text: e?.response?.data?.message ?? e?.message,
        duration: 3000,
      });
    }
  };

  const onPremiumCall = () => {
    if (!getDetailSubscription) {
      return;
    }

    const temp = {
      subscriptionDetails: getDetailSubscription.subscriptionDetails,
      subscriptionId: {
        title: getDetailSubscription.subscriptionId?.title,
      },
      subscriptionEndDate: getDetailSubscription.subscriptionEndDate,
      subscriptionStartDate: getDetailSubscription.subscriptionStartDate,
      isActive: getDetailSubscription.isActive,
    };

    navigation.navigate('premiumDetail', {
      data: temp,
    });
  };

  return {
    onEditProfile,
    onClickLogout,
    setLoading,
    loading,
    userData,
    imageSpinner,
    onImageLoad,
    onImageLoadStart,
    onRightIcon,
    onRefresh,
    refreshing,
    onLogoClick,
    onItemPress,
    visible,
    setVisible,
    onDelete,
    load,
    isLoad,
    onPremiumCall,
    scrollRef,
    getDetailSubscription,
    getMembershipDurationText,
    durationText,
  };
};

export default accountController;
