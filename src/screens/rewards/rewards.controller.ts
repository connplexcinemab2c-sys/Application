import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {AuthNavigationProps} from '../../navigation/stacks/authStack';
import {axiosInstance} from '../../services/api/api';
import constant from '../../services/config/constant';
import {useAppSelector} from '../../services/config/redux/useReduxHooks';
import Log from '../../utility/log';
import {RewardsControllerProps} from './rewards.interface';

const RewardsController = (): RewardsControllerProps => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [list, setList] = useState<any[]>([]);
  const [staticList, setStaticList] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Earned' | 'Redeemed'>('All');
  const {token} = useAppSelector(state => state.UserReducer);
  const navigation = useNavigation<AuthNavigationProps>();

  const totalEarned = staticList
    .filter((i: any) => i?.type?.toLowerCase() === 'earned')
    .reduce((sum: number, i: any) => sum + (Number(i?.coins) || 0), 0);

  const totalRedeemed = staticList
    .filter((i: any) => i?.type?.toLowerCase() === 'redeemed')
    .reduce((sum: number, i: any) => sum + (Number(i?.coins) || 0), 0);

  const availableBalance = totalEarned - totalRedeemed;

  const applyFilters = (searchText: string, filter: string, data: any[]) => {
    let filtered = data;
    if (filter !== 'All') {
      filtered = filtered.filter(
        (i: any) => i?.type?.toLowerCase() === filter.toLowerCase(),
      );
    }
    if (searchText?.trim()) {
      filtered = filtered.filter((i: any) => {
        const d = `${i?.transactionId?.movieId?.name ?? ''} ${
          i?.transactionId?.initTransId ?? ''
        }`;
        return d.toLowerCase().includes(searchText.toLowerCase());
      });
    }
    setList(filtered);
  };

  const onFilterChange = (filter: 'All' | 'Earned' | 'Redeemed') => {
    setActiveFilter(filter);
    applyFilters(search, filter, staticList);
  };

  useEffect(() => {
    getRewardList();
  }, []);

  const refreshJob = (): void => {
    setRefreshing(true);
    getRewardList();
  };

  useEffect(() => {
    if (isFocused) {
      Keyboard.dismiss();
      setSearch('');
      setList(staticList);
    }
  }, [isFocused]);



  const handleSearch = (text: string) => {
    setSearch(text);
    applyFilters(text, activeFilter, staticList);
  };

  const onClear = () => {
    setSearch('');
    applyFilters('', activeFilter, staticList);
  };

  const getRewardList = async () => {
    setLoading(true);
    try {
      const {data} = await axiosInstance.get(constant.getRewards, {
        headers: {
          auth: token,
        },
      });
      console.log('data rewardss', JSON.stringify(data?.data));
      const responseData = data?.data ?? [];
      setStaticList(responseData);
      applyFilters(search, activeFilter, responseData);
      setLoading(false);
      setRefreshing(false);
    } catch (error: any) {
      setLoading(false);
      setRefreshing(false);
      Snackbar.show({text: error?.response?.data?.message ?? error?.message});
      Log(
        'getRewardList error',
        error?.response?.data?.message ?? error?.message,
      );
    }
  };

  const onClick = (item: any): void => {};

  return {
    list,
    loading,
    onClick,
    refreshing,
    refreshJob,
    search,
    handleSearch,
    onClear,
    activeFilter,
    onFilterChange,
    totalEarned,
    totalRedeemed,
    availableBalance,
  };
};

export default RewardsController;
