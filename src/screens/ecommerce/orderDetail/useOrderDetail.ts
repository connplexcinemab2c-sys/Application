import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  AuthNavigationProps,
  AuthParams,
} from '../../../navigation/stacks/authStack';
import useAppState from '../../../hooks/useAppState';
import {useEffect, useState} from 'react';
import {ecomInstance} from '../../../services/api/api';
import constant from '../../../services/config/constant';
import {useAppSelector} from '../../../services/config/redux/useReduxHooks';
import {OrderDetailStateProps} from './orderDetailStateProps';
import Log from '../../../utility/log';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import RNFetchBlob from 'rn-fetch-blob';
import {PermissionsAndroid, Platform} from 'react-native';
import moment from 'moment';

const useOrderDetail = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const {token} = useAppSelector(state => state.UserReducer);
  const route = useRoute<RouteProp<AuthParams, 'orderDetail'>>();
  const [currentStepsss, setCurrentStepsss] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderDetailState, setOrderDetailState] =
    useAppState<OrderDetailStateProps>({
      currentStep: 1,
      isLoading: false,
      orderHistory: undefined,
      instructions: undefined,
    });
  useEffect(() => {
    setOrderDetailState('isLoading', true);
    getOrderHistoryApi();
    handleTracking();
  }, []);
  const waybill = orderDetailState?.orderHistory?.waybill;
  const staticStatuses = [
    {key: 'Manifest uploaded', label: 'Ordered'},
    {key: 'Out for delivery', label: 'Out For Delivery'},
    {key: 'Delivered to consignee', label: 'Delivered'},
  ];
  const handleTracking = async () => {
    try {
      const {data} = await ecomInstance.get(
        `${constant.getOrderTracking}?waybill=${waybill}&ref_ids=`,
        {
          headers: {
            auth: token,
          },
        },
      );

      const shipment = data?.data?.[0]?.Shipment;
      const scanItems = shipment?.Scans ?? [];

      const instructionKeys: string[] = scanItems
        .map((item: any) => item?.ScanDetail?.Instructions?.trim())
        .filter(Boolean); // Remove undefined/null

      // Match and find the highest index in staticStatuses
      let maxMatchedIndex = -1;

      staticStatuses.forEach((status, index) => {
        if (instructionKeys.includes(status.key)) {
          maxMatchedIndex = index;
        }
      });

      // Default to 0 if no match found
      const finalStep = maxMatchedIndex >= 0 ? maxMatchedIndex : 0;

      setCurrentStepsss(finalStep); // Your state for UI
      // Extract instructions from scans
      // const instructionKeys = scanItems.map(
      //   (item: any) => item?.ScanDetail?.Instructions,
      // );

      // // Determine the current step index based on last matching instruction
      // const matchedIndex = staticStatuses.reduce((maxIndex, status, index) => {
      //   return instructionKeys.includes(status.key) ? index : maxIndex;
      // }, 0);

      // setCurrentStepsss(matchedIndex);
    } catch (error) {
      Log('order tracking error', error);
    }
  };

  const getOrderHistoryApi = async () => {
    try {
      const productId = route?.params?.item?._id || route?.params?.orderId;
      const {data} = await ecomInstance.get(
        `${constant.getSingleOrder}?id=${productId}`,
        {
          headers: {
            auth: token,
          },
        },
      );

      Log('getSingleOrder data', JSON.stringify(data?.data));
      setOrderDetailState('orderHistory', data?.data);
      // let trackingStep
      //   data?.data?.shippingStatus === 'Order Confirmed'
      //     ? 0
      //     : data?.data?.shippingStatus === 'In process'
      //     ? 1
      //     : data?.data?.shippingStatus === 'Out for delivery'
      //     ? 2
      //     : 3;
      // setOrderDetailState('currentStep', trackingStep);
      setOrderDetailState('isLoading', false);
    } catch (error) {
      Log('getSingleOrder error', error);
      setOrderDetailState('isLoading', false);
    }
  };

  const handleInvoice = async () => {
    const order = orderDetailState?.orderHistory;
    const orderId = order?._id;
    const cartIdData = order?.cartId;
    const deliveryFee = order?.deliveryFee;
    const totalAmount = order?.totalAmount;
    const downloadUrl = `${constant.ecomBaseUrl}${constant.getDownloadInvoice}`;
    try {
      setLoading(true);
      const isAndroid = Platform.OS === 'android';

      if (isAndroid && Platform.Version < 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download invoice.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Snackbar.show({text: 'Permission Denied!', duration: 2000});
          return;
        }
      }

      const payload = new URLSearchParams();
      payload.append('orderId', orderId);
      payload.append('cartIdData', JSON.stringify(cartIdData));
      payload.append('deliveryFee', deliveryFee);
      payload.append('totalAmount', totalAmount);

      const dirs = RNFetchBlob.fs.dirs;
      const filePath = `${dirs.DownloadDir}/invoice_${orderId}.pdf`;

      // Step 2: Use RNFetchBlob to download PDF
      RNFetchBlob.config({
        fileCache: true,
        appendExt: 'pdf',
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: `Invoice_${orderId}.pdf`,
          path: filePath,
          description: 'Invoice downloaded by Connplex app',
        },
      })
        .fetch(
          'POST',
          downloadUrl,
          {
            'Content-Type': 'application/x-www-form-urlencoded',
            auth: token,
          },
          payload.toString(),
        )
        .then(res => {
          if (Platform.OS === 'ios') {
            RNFetchBlob.ios.previewDocument(res.path());
            setLoading(false);
          } else {
            Snackbar.show({
              text: 'Invoice downloaded successfully!',
              duration: 3000,
            });
            setLoading(false);
          }
        })
        .catch(error => {
          Log('Invoice download error:', error);
          Snackbar.show({
            text: 'Failed to download invoice.',
            duration: 3000,
          });
          setLoading(false);
        });
    } catch (error) {
      Log('Invoice API error:', error);
      Snackbar.show({
        text: 'Something went wrong.',
        duration: 3000,
      });
      setLoading(false);
    }
  };

  // const getOrderHistoryApi = async () => {
  //   try {
  //     const {data} = await ecomInstance.get(
  //       `${constant.getSingleOrder}?id=${route?.params?.item?._id}`,
  //       {
  //         headers: {
  //           auth: token,
  //         },
  //       },
  //     );
  //     Log('getSingleOrder data', JSON.stringify(data?.data));
  //     setOrderDetailState('orderHistory', data?.data);
  //     let trackingStep =
  //       data?.data?.shippingStatus === 'Order Confirmed'
  //         ? 0
  //         : data?.data?.shippingStatus === 'In process'
  //         ? 1
  //         : data?.data?.shippingStatus === 'Out for delivery'
  //         ? 2
  //         : 3;
  //     setOrderDetailState('currentStep', trackingStep);
  //     setOrderDetailState('isLoading', false);
  //   } catch (error) {
  //     Log('getSingleOrder error', error);
  //     setOrderDetailState('isLoading', false);
  //   }
  // };
  const onReturnOrder = () => {
    navigation.navigate('returnOrder', {item: orderDetailState?.orderHistory});
  };
  const onExchangeOrder = () => {
    navigation.navigate('exchangeOrder', {
      item: orderDetailState?.orderHistory,
    });
  };
  const onCancelOrder = () => {
    navigation.navigate('orderCancelled', {
      item: orderDetailState?.orderHistory,
    });
  };
  return {
    onReturnOrder,
    onExchangeOrder,
    onCancelOrder,
    orderDetailState,
    handleInvoice,
    currentStepsss,
    loading,
  };
};

export default useOrderDetail;
