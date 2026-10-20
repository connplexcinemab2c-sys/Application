import {useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import Snackbar from 'react-native-snackbar';
import axiosInstance from '../../services/api';
import constant from '../../services/config/constant';
import params from '../../services/config/params';
import {useAppSelector} from '../../services/config/redux/useReduxHooks';
import {color} from '../../theme';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import Log from '../../utility/log';

const useWelcomeGift = () => {
  const [loading, setLoading] = useState(false);
  const {token} = useAppSelector(state => state.UserReducer);
  const currentDate = new Date();
  const {onBack} = commonFunctions();
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedCinema, setSelectedCinema] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [giftCard, setGiftCard] = useState<any>([]);
  const [cinemaList, setCinemaList] = useState<any>([]);
  const [filteredCinemas, setFilteredCinemas] = useState(cinemaList);
  const [cardId, setCardId] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    getUserWelcomeGift();
    getCinemaData();
  }, []);

  useEffect(() => {
    if (token) {
      getUserWelcomeGift();
      getCinemaData();
    }
  }, [isFocused, token]);

  useEffect(() => {
    getCinemaData();
    getUserWelcomeGift();
  }, []);

  const getUserWelcomeGift = async () => {
    try {
      setLoading(true);
      const {data} = await axiosInstance.get(constant.getUserWelcomeGift, {
        headers: {
          auth: token,
        },
      });

      setGiftCard(data?.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  const getCinemaData = async () => {
    try {
      setLoading(true);
      const {data} = await axiosInstance.get(constant.getAllCinema, {
        headers: {
          auth: token,
        },
      });
      setCinemaList(data?.data);
      setFilteredCinemas(data?.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  const onMarkGiftReceived = async () => {
    try {
      setLoading(true);
      const formData = {
        [params.id]: cardId,
        [params.cinemaId]: selectedCinema?._id,
      };
      const {data} = await axiosInstance.post(
        constant.markGiftReceived,
        formData,
        {
          headers: {
            auth: token,
          },
        },
      );
      await getUserWelcomeGift();
      await getCinemaData();
      Log('add response', data?.data);
      Snackbar.show({
        text: data?.message,
        duration: 3000,
        backgroundColor: color.green,
      });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Snackbar.show({
        text: error?.response?.data?.message ?? error?.message,
        duration: 3000,
      });

      Log('add error', error?.response?.data);
    }
  };

  const handleMarkAsReceived = (id: any) => {
    setCardId(id);
    setModalVisible(true);
  };

  const handleCinemaSelect = (item: any) => {
    setSelectedCinema(item);
    setModalVisible(false);
    setConfirmModalVisible(true);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = cinemaList.filter(item =>
      item.cinemaName?.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredCinemas(filtered);
  };

  const handleConfirmSubmit = () => {
    onMarkGiftReceived();
    setConfirmModalVisible(false);
  };

  return {
    loading,
    modalVisible,
    confirmModalVisible,
    selectedCinema,
    search,
    giftCard,
    cinemaList,
    filteredCinemas,
    cardId,
    handleMarkAsReceived,
    handleCinemaSelect,
    handleSearch,
    handleConfirmSubmit,
    onBack,
    setModalVisible,
    setConfirmModalVisible,
  };
};

export default useWelcomeGift;
