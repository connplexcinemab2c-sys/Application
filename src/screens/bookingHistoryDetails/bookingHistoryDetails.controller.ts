import {useEffect, useState} from 'react';
import {BackHandler, Share} from 'react-native';
import moment from 'moment';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {
  AuthNavigationProps,
  AuthParams,
} from '../../navigation/stacks/authStack';
import {axiosInstance} from '../../services/api/api';
import {BookingHistoryDetailsControllerProps} from './bookingHistoryDetails.interface';
import constant from '../../services/config/constant';
import Log from '../../utility/log';

const bookingHistoryDetailsController =
  (): BookingHistoryDetailsControllerProps => {
    const navigation = useNavigation<any>();
    const route = useRoute<RouteProp<AuthParams, 'bookingHistoryDetails'>>();
    const transactionId = route?.params?.transactionId;
    const [loading, setLoading] = useState<boolean>(false);
    const [imageSpinner, setImageSpinner] = useState<boolean>(false);
    const [details, setDetails] = useState<any>();
    const [convenienceFees, setConvenienceFees] = useState<number>(0);
    const [ticketCGST, setTicketCGST] = useState<number>(0);
    const [ticketSGST, setTicketSGST] = useState<number>(0);
    const [CGST3D, setCGST3D] = useState<number>(0);
    const [SGST3D, setSGST3D] = useState<number>(0);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [cinemaGSTToolTip, setCinemaGSTToolTip] = useState<boolean>(false);
    const [fnbGSTToolTip, setFnbGSTToolTip] = useState<boolean>(false);

    useEffect(() => {
      getMovieTicketDetails();
    }, []);

    useEffect(() => {
      const backAction = () => {
        onBackCall();
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, []);

    const refreshCall = () => {
      setRefreshing(true);
      getMovieTicketDetails();
    };

    const totalTickets = details?.setSeatData?.strSeatInfo
      ?.split('-')[1]
      ?.split(',')?.length;

    const ticketsTotal =
      details?.commitBookingData?.curTicketsTotal +
      convenienceFees * totalTickets;

    const foodTotalWithGST =
      details?.foodAndBvgResponse?.curFoodTotal +
      details?.foodAndBvgResponse?.curFoodTotal * (5 / 100);

    const total: number = foodTotalWithGST
      ? ticketsTotal + foodTotalWithGST
      : ticketsTotal;

    const onBackCall = () => {
      if (route?.params?.screen === 'failPayment') {
        navigation.reset({
          index: 0,
          routes: [{name: 'bottom'}],
        });
      } else {
        navigation.goBack();
      }
    };

    const getMovieTicketDetails = async () => {
      /* API call for getting booking history details */
      setLoading(true);
      try {
        const formData = {
          initTransId: transactionId,
        };
        const {data} = await axiosInstance.post(
          constant.getBookingDetails,
          formData,
        );
        setLoading(false);
        setRefreshing(false);
        setDetails(data?.data);
        setConvenienceFees(data?.data?.cinemaId?.convenienceFees);
        setTicketCGST(data?.data?.commitBookingData?.curTicketsTax1);
        setTicketSGST(data?.data?.commitBookingData?.curTicketsTax2);
        Log('movie ticket details', JSON.stringify(data?.data));
      } catch (error: any) {
        setLoading(false);
        setRefreshing(false);
        Log('movie ticket details response', error?.response);
        Snackbar.show({text: error?.response?.data?.message ?? error?.message});
      }
    };

    const onImageLoad = (): void => {
      setImageSpinner(false);
    };

    const onShare = async () => {
      try {
        await Share.share({
          title: 'Connplex' + ' ',
          message: `Movie Title: ${details?.movieId?.name}\nShowtime: ${moment(
            details?.showId?.sessionRealShow,
          ).format('MMM DD, YYYY | hh: mm A')}\n${
            constant.myBookingDetail
          }?transId=${transactionId}`,
          url: `${constant.myBookingDetail}?transId=${transactionId}`,
        });
      } catch (error) {
        Log('SHARE ERROR :', error);
      }
    };

    return {
      details,
      loading,
      total,
      foodTotalWithGST,
      imageSpinner,
      onImageLoad,
      onShare,
      convenienceFees,
      totalTickets,
      ticketCGST,
      ticketSGST,
      CGST3D,
      SGST3D,
      refreshing,
      refreshCall,
      onBackCall,
      cinemaGSTToolTip,
      setCinemaGSTToolTip,
      fnbGSTToolTip,
      setFnbGSTToolTip,
    };
  };

export default bookingHistoryDetailsController;
