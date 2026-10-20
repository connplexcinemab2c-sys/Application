import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useAppSelector} from '../../services/config/redux/useReduxHooks';
import Snackbar from 'react-native-snackbar';
import axiosInstance from '../../services/api';
import constant from '../../services/config/constant';
import {premiumDetailProps} from '../premiumDetail/premiumDetail.interface';

const useMemberShipDetails = (): premiumDetailProps => {
  const route = useRoute<any>();
  const {userData, token} = useAppSelector(state => state.UserReducer);
  const [detail, setDetail] = useState(route?.params?.data);
  const [imageSpinner, setImageSpinner] = useState<boolean>(false);
  const [durationText, setDurationText] = useState('');
  const [formattedDurationText, setFormattedDurationText] = useState('');
  const [premiumData, setPremiumData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getActivePlan();
    getPlanList();
  }, []);
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

  const getActivePlan = async () => {
    setLoading(true);
    try {
      const {data} = await axiosInstance.get(constant.activePlan, {
        headers: {
          auth: token,
        },
      });
      const activePlan = data?.data?.[0];
      setPremiumData(activePlan);

      // const start = new Date(activePlan?.subscriptionStartDate);
      // const end = new Date(activePlan?.subscriptionEndDate);

      // const diffInMs = end.getTime() - start.getTime();
      // const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      // setDurationText(diffInDays);
      // setFormattedDurationText(getMembershipDurationText(diffInDays));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Snackbar.show({text: error?.response?.data?.message ?? error?.message});
    }
  };

  const getPlanList = async () => {
    setLoading(true);
    try {
      const {data} = await axiosInstance.get(constant.transactionList, {
        headers: {
          auth: token,
        },
      });

      const transactions = data?.data?.transactions;

      if (transactions?.length) {
        const latestTransaction = transactions[0];
        setPremiumData(latestTransaction);

        const start = new Date(latestTransaction.subscriptionStartDate);
        const end = new Date(latestTransaction.subscriptionEndDate);

        const diffInMs = end.getTime() - start.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        setDurationText(diffInDays);
        setFormattedDurationText(getMembershipDurationText(diffInDays));
        setLoading(false);
      }
    } catch (error: any) {
      console.error('getPlanList error', error);
      Snackbar.show({text: error?.response?.data?.message ?? error?.message});
      setLoading(false);
    }
  };

  //  const getMemberShipList = async () => {
  //   try {
  //     const {data} = await axiosInstance.get(constant.subscriptionList);
  //     const duration = data.data[0].membershipDuration;
  //     setDurationText(duration);
  //     setFormattedDurationText(getMembershipDurationText(duration));
  //   } catch (error: any) {
  //     console.error('getMemberShipList error', error);
  //     Snackbar.show({text: error?.response?.data?.message ?? error?.message});
  //   }
  // };

  return {
    detail,
    userData,
    imageSpinner,
    setImageSpinner,
    formattedDurationText,
    premiumData,
    loading,
    getMembershipDurationText,
  };
};

export default useMemberShipDetails;
