import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {axiosInstance} from '../../services/api/api';
import constant from '../../services/config/constant';
import {useAppSelector} from '../../services/config/redux/useReduxHooks';
import {MembershipListControllerProps} from './membershipList.interface';

const MembershipListController = (): MembershipListControllerProps => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<any[]>();
  const [staticList, setStaticList] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const {token} = useAppSelector(state => state.UserReducer);
  const navigation = useNavigation<any>();
  const [durationText, setDurationText] = useState('');
  const [formattedDurationText, setFormattedDurationText] =
    useState<string>('');
  useEffect(() => {
    getPlanList();
  }, []);

  const refreshJob = (): void => {
    setRefreshing(true);
    getPlanList();
  };

  useEffect(() => {
    if (isFocused) {
      Keyboard.dismiss();
      setSearch('');
      setList(staticList);
    }
  }, [isFocused]);

  const getMembershipDurationText = (days: number): string => {
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

  const handleSearch = (text: string) => {
    setSearch(text);
    const filter = staticList?.filter((item: any) => {
      const itemData = `${item?.subscription?.title} ${item?.subscription?.price}`;
      const textData = text.toLowerCase();
      return itemData.toLowerCase().includes(textData);
    });
    setList(filter);
  };

  const onClear = () => {
    setSearch('');
    setList(staticList);
  };

  const getPlanList = async () => {
    setLoading(true);
    try {
      const {data} = await axiosInstance.get(constant.transactionList, {
        headers: {
          auth: token,
        },
      });

      setList(data?.data?.transactions);
      setStaticList(data?.data?.transactions);

      setLoading(false);
      setRefreshing(false);
    } catch (error: any) {
      console.error('getPlanList error', error);

      setRefreshing(false);
      setLoading(false);
      Snackbar.show({text: error?.response?.data?.message ?? error?.message});
    }
  };

  const onClick = (item: any): void => {
    navigation.navigate('memebrshipDetails', {
      data: item,
    });
  };

  const onClickMembership = () => {
    navigation.navigate('bottom', {screen: 'membership'});
  };

  return {
    list,
    loading,
    onClick,
    refreshing,
    refreshJob,
    search,
    handleSearch,
    onClear,
    onClickMembership,
    formattedDurationText,
    getMembershipDurationText,
  };
};

export default MembershipListController;
