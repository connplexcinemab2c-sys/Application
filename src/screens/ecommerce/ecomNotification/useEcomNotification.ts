import {useEffect, useState} from 'react';
import {notificationData} from './ecomNotification.const';
import moment from 'moment';
import {ecomInstance} from '../../../services/api/api';
import constant from '../../../services/config/constant';
import Log from '../../../utility/log';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../services/config/redux/useReduxHooks';
import useAppState from '../../../hooks/useAppState';
import params from '../../../services/config/params';
import {
  setFirstVisitDone,
  updateNotificationCount,
} from '../../../services/config/redux/userReducer/action';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProps} from '../../../navigation/stacks/authStack';
const useEcomNotification = () => {
  const [values, setValues] = useAppState<NotificationProps>({
    notificationData: [],
    isLoading: true,
    allData: undefined,
    isRefreshing: false,
  });
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isPagination, setIsPagination] = useState<boolean>(false);
  const {token, notifications, firstVisitDone} = useAppSelector(
    state => state.UserReducer,
  );

  const [data, setData] = useState<any>([
    {title: 'New', data: []},
    {title: 'This Week', data: []},
    {title: 'Old', data: []},
  ]);
  const navigation = useNavigation<AuthNavigationProps>();

  const dispatch = useAppDispatch();

  const shortAndFilter = () => {
    let updatedData: any = [
      {title: 'New', data: []},
      {title: 'This Week', data: []},
      {title: 'Old', data: []},
    ];

    notificationData.forEach((res: any) => {
      const diffDate = moment(res.createdAt).diff(moment(), 'days');
      if (diffDate === 0) {
        updatedData[0].data.push(res); // New
      } else if (diffDate <= -1 && diffDate > -7) {
        updatedData[1].data.push(res); // This Week
      } else if (diffDate <= -7) {
        updatedData[2].data.push(res); // Old
      }
    });
    updatedData = updatedData.filter((item: any) => item.data.length > 0);
    setData(updatedData);
  };

  useEffect(() => {
    shortAndFilter();
  }, [notificationData]);

  useEffect(() => {
    setValues('isRefreshing', true);
    getNotificationApi(1);
  }, []);

  const getNotificationApi = async (page: number) => {
    try {
      const limit = 10;

      // const isFirstTime = page === 1;

      const query: Record<string, any> = {
        [params.page]: page,
        [params.limit]: limit,
      };

      if (
        firstVisitDone &&
        notifications?.totalPages &&
        page >= notifications.totalPages
      ) {
        query.isComplete = true;
        Log('✅ Sending isComplete after knowing totalPages');
      } else {
        Log('not isComplete');
      }

      const {data} = await ecomInstance.get(constant.getNotification, {
        headers: {
          auth: token,
        },
        params: query,
      });

      const notification = data?.data?.notifications || [];

      setValues(
        'notificationData',
        page === 1
          ? notification
          : [...(values.notificationData || []), ...notification],
      );
      setValues('allData', data?.data);
      setIsPagination(false);
      setValues('isLoading', false);
      setValues('isRefreshing', false);
      dispatch(updateNotificationCount(data?.data?.totalCount));
      if (page === 1 && !firstVisitDone) {
        dispatch(setFirstVisitDone(true));
      }
    } catch (error) {
      Log('getNotification error', error);
      setIsPagination(false);
      setValues('isLoading', false);
      setValues('isRefreshing', false);
    }
  };

  const groupNotificationsByDate = (notifications: any[]) => {
    const grouped: Record<string, any[]> = {};

    notifications.forEach(item => {
      const date = moment(item.createdAt);

      let dateKey = '';
      if (date.isSame(moment(), 'day')) {
        dateKey = 'Today';
      } else if (date.isSame(moment().subtract(1, 'day'), 'day')) {
        dateKey = 'Yesterday';
      } else {
        dateKey = date.format('dddd, MMMM Do');
      }

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }

      grouped[dateKey].push(item);
    });

    return Object.keys(grouped).map(title => ({
      title,
      data: grouped[title],
    }));
  };
  const groupedData = groupNotificationsByDate(values?.notificationData);

 
  const loadMore = () => {
    if (isPagination) return;

    const nextPage = pageNumber + 1;
    const isLastPage =
      notifications?.totalPages && nextPage > notifications.totalPages;
    if (isLastPage) return;

    setIsPagination(true);
    getNotificationApi(nextPage); 
    setPageNumber(nextPage); 
  };

  const handleNotification = (item: any, index: number) => {
    navigation.navigate('orderDetail', {orderId: item?.orderId});
  };

  return {
    data,
    values,
    loadMore,
    groupedData,
    isPagination,
    handleNotification,
  };
};

export default useEcomNotification;
