import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {BackHandler, Share} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {
  AuthNavigationProps,
  AuthParams,
} from '../../navigation/stacks/authStack';
import {axiosInstance} from '../../services/api/api';
import constant from '../../services/config/constant';
import {useAppSelector} from '../../services/config/redux/useReduxHooks';
import Log from '../../utility/log';
import {MovieTicketControllerProps} from './movieTicket.interface';

const movieTicketController = (): MovieTicketControllerProps => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageSpinner, setImageSpinner] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [details, setDetails] = useState<any>();
  const [convenienceFees, setConvenienceFees] = useState<number>(0);
  const [ticketCGST, setTicketCGST] = useState<number>(0);
  const [ticketSGST, setTicketSGST] = useState<number>(0);
  const [CGST3D, setCGST3D] = useState<number>(0);
  const [SGST3D, setSGST3D] = useState<number>(0);
  const [cinemaGSTToolTip, setCinemaGSTToolTip] = useState<boolean>(false);
  const [fnbGSTToolTip, setFnbGSTToolTip] = useState<boolean>(false);
  const [rewardTransaction, setRewardTransaction] = useState<any>(undefined);
  const {token} = useAppSelector(state => state.UserReducer);

  const navigation = useNavigation<AuthNavigationProps>();

  useEffect(() => {
    getMovieTicketDetails();
    getRewardByTransaction();
  }, []);

  // useEffect(() => {
  //   navigation.addListener('beforeRemove', nav => {
  //     // Prevent going back on swipe
  //     if (nav.data.action.type === 'GO_BACK' && !nav.data.action.source) {
  //       nav.preventDefault();
  //     }
  //   });
  // }, [navigation]);

  useEffect(() => {
    const backAction = () => {
      onBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const route = useRoute<RouteProp<AuthParams, 'movieTicket'>>();

  const transactionId = route?.params?.transactionId;

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

  const getRewardByTransaction = async () => {
    try {
      const {data} = await axiosInstance.get(
        `${constant.rewardByTransaction}?transId=${transactionId}`,
        {
          headers: {
            auth: token,
          },
        },
      );
      console.log('reward by transaction', data?.data);
      setRewardTransaction(data?.data);
    } catch (error) {}
  };

  const getMovieTicketDetails = async () => {
    /* API call for getting movie ticket details */
    try {
      setLoading(true);
      const formData = {
        initTransId: transactionId,
      };
      const {data} = await axiosInstance.post(
        constant.getBookingDetails,
        formData,
      );
      console.log('data movie ticket', data?.data);
      setDetails(data?.data);
      setConvenienceFees(data?.data?.cinemaId?.convenienceFees);
      setTicketCGST(data?.data?.commitBookingData?.curTicketsTax1);
      setTicketSGST(data?.data?.commitBookingData?.curTicketsTax2);
      Log('movie ticket details', JSON.stringify(data?.data));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Log('movie ticket details response', error?.response);
      Snackbar.show({text: error?.response?.data?.message});
    }
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

  const onMore = (): void => {
    setShowDetails(!showDetails);
  };

  const onBack = (): void => {
    navigation.reset({
      index: 0,
      routes: [{name: 'bottom'}],
    });
  };

  const onImageLoad = (): void => {
    setImageSpinner(false);
  };

  return {
    details,
    loading,
    onBack,
    onMore,
    showDetails,
    total,
    foodTotalWithGST,
    onShare,
    imageSpinner,
    onImageLoad,
    convenienceFees,
    totalTickets,
    ticketCGST,
    ticketSGST,
    CGST3D,
    SGST3D,
    cinemaGSTToolTip,
    setCinemaGSTToolTip,
    fnbGSTToolTip,
    setFnbGSTToolTip,
    rewardTransaction,
  };
};

export default movieTicketController;
