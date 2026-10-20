import {useEffect, useState} from 'react';
import Snackbar from 'react-native-snackbar';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProps} from '../../navigation/stacks/authStack';
import {axiosInstance} from '../../services/api/api';
import {
  BookingHistoryControllerProps,
  BookingHistoryProps,
} from './bookingHistory.interface';
import constant from '../../services/config/constant';
import Log from '../../utility/log';
import {useAppSelector} from '../../services/config/redux/useReduxHooks';

const bookingHistoryController = (): BookingHistoryControllerProps => {
  const [loading, setLoading] = useState<boolean>(false);
  const [bookingHistory, setBookingHistory] = useState<BookingHistoryProps[]>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {token} = useAppSelector(state => state.UserReducer);
  const navigation = useNavigation<AuthNavigationProps>();

  useEffect(() => {
    getBookingHistory();
  }, []);

  const refreshJob = (): void => {
    setRefreshing(true);
    getBookingHistory();
  };

  const getBookingHistory = async (refresh?: boolean) => {
    /* API call for getting booking history */
    try {
      setLoading(true);
      const {data} = await axiosInstance.get(constant.getBooking, {
        headers: {
          auth: token,
        },
      });
      setLoading(false);
      setRefreshing(false);
      if (data?.data?.length > 0) {
        setBookingHistory(data?.data);
      } else {
        setBookingHistory([]);
      }
    } catch (error: any) {
      setLoading(false);
      setRefreshing(false);
      Snackbar.show({text: error?.response?.data?.message ?? error?.message});
      Log('booking history error', error?.message);
    }
  };

  const onBookingHistory = (transactionId: string): void => {
    navigation.navigate('bookingHistoryDetails', {
      transactionId: transactionId,
    });
  };

  return {bookingHistory, loading, onBookingHistory, refreshing, refreshJob};
};

export default bookingHistoryController;
