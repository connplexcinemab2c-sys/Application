import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProps} from '../../../navigation/stacks/authStack';
import {useEffect} from 'react';
import {ecomInstance} from '../../../services/api/api';
import constant from '../../../services/config/constant';
import {useAppSelector} from '../../../services/config/redux/useReduxHooks';
import useAppState from '../../../hooks/useAppState';
import Log from '../../../utility/log';

const useOrderHistory = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const {token, notificationCount} = useAppSelector(state => state.UserReducer);
  const [values, setValues] = useAppState({
    orderHistory: undefined,
    isLoading: false,
    isRefreshing: false,
  });
  useEffect(() => {
    setValues('isLoading', true);
    getOrderHistoryApi();
  }, []);
  const getOrderHistoryApi = async () => {
    try {
      const {data} = await ecomInstance.get(constant.userGetOrder, {
        headers: {
          auth: token,
        },
      });
      Log('userGetOrder data', JSON.stringify(data?.data));
      setValues('orderHistory', data?.data);
      setValues('isLoading', false);
      setValues('isRefreshing', false);
    } catch (error) {
      Log('userGetOrder error', error);
      setValues('isLoading', false);
      setValues('isRefreshing', false);
    }
  };
  const onOrderDetails = (item: any) => {
    navigation.navigate('orderDetail', {item});
  };
  const onPressWishlist = () => {
    navigation.goBack();
  };
  const onRefreshData = () => {
    setValues('isRefreshing', true);
    getOrderHistoryApi();
  };
  return {
    values,
    onOrderDetails,
    onPressWishlist,
    onRefreshData,
    notificationCount,
  };
};

export default useOrderHistory;
