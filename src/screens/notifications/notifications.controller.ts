import {useEffect, useState} from 'react';
import Snackbar from 'react-native-snackbar';
import {axiosInstance} from '../../services/api/api';
import constant from '../../services/config/constant';
import {useAppSelector} from '../../services/config/redux/useReduxHooks';

const notificationsController = () => {
  const [notifications, setNotifications] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {token} = useAppSelector(state => state.UserReducer);

  useEffect(() => {
    getNotifications();
  }, []);

  const refreshJob = () => {
    setRefreshing(true);
    getNotifications();
  };

  const getNotifications = async (refreshing?: boolean) => {
    /* API call for getting notifications */
    setLoading(true);
    try {
      const {data} = await axiosInstance.get(constant.getNotifications, {
        headers: {
          auth: token,
        },
      });
      setNotifications(data?.data);
      setLoading(false);
      setRefreshing(false);
    } catch (error: any) {
      setLoading(false);
      setRefreshing(false);
      Snackbar.show({text: error?.response?.data?.message});
    }
  };

  return {notifications, loading, refreshing, refreshJob};
};

export default notificationsController;
