import React, {memo, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
  Alert,
  Linking,
} from 'react-native';
import {BookingHistoryListProps} from './bookingHistoryList.interface';
import constant from '../../../services/config/constant';
import svg from '../../../assets/svgIndex';
import style from './bookingHistoryList.style';
import image from '../../../assets/imageIndex';
import {color} from '../../../theme';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import commonFunctions from '../../../utility/functions/commonFunctions/commonFunctions';
import Snackbar from 'react-native-snackbar';
import Log from '../../../utility/log';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';

const BookingHistoryList: React.FC<BookingHistoryListProps> = ({
  item,
  onPress,
}) => {
  const isFloatNumber = (input: string): boolean => {
    const pattern = /^\d+\.\d+$/;
    return pattern.test(input);
  };
  const [isHide, setIsHide] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // const {handleStoragePermissionAndDownload} = commonFunctions();

  // const handleDownload = async () => {
  //   await handleStoragePermissionAndDownload(item, setLoading);
  // };

  const handleDownload = async () => {
    /* Permission for getting Storage */
    if (Platform.OS == 'ios') {
      setLoading(true);
      onDownload();
    } else {
      if (Platform.OS == 'android' && Platform.Version < 33) {
        try {
          if (Platform.OS == 'android') {
            const writePermission = await PermissionsAndroid.check(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            );
            if (!writePermission) {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                  title: 'Storage Permission Required',
                  message: 'This app needs storage permission to save files.',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
                },
              );
              if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                await requestStoragePermission();
                Log('checked Permission', 'Permission denied');
                return;
              } else {
                permissionSuccess();
              }
            } else {
              permissionSuccess();
            }
          }
        } catch (error: any) {
          Snackbar.show({text: error?.message});
        }
      } else {
        permissionSuccess();
      }
    }
  };

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'This app needs storage permission to save files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        permissionSuccess();
      } else {
        Snackbar.show({
          text: 'Storage permission is required to use this feature.',
        });
        openSettings();
        Log('check Permission', 'Storage permission granted.');
      }
    } catch (error: any) {
      Snackbar.show({text: 'Access Denied.'});
      Log('Error while requesting storage permission:', error);
    }
  };

  const permissionSuccess = () => {
    const folderPath = `${RNFS.ExternalStorageDirectoryPath}/Download/Connplex`;
    RNFS.mkdir(folderPath)
      .then(res => {
        onDownload();
      })
      .catch(err => {});
  };

  const openSettings = () => {
    Alert.alert(
      'Permission Required',
      'Please enable storage permission in app settings to continue using the app.',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Open Settings',
          onPress: () => Linking.openSettings(),
        },
      ],
      {cancelable: false},
    );
  };

  const onDownload = () => {
    const dirs = RNFetchBlob.fs.dirs;
    let url = `${constant.baseURL}/user/download-ticket-pdf/${item?.initTransId}/ticket.pdf`;

    var filename = `${item?.initTransId}${url?.substring(
      url?.lastIndexOf('/') + 1,
    )}`;
    // var filename = `${item?.transactionId}${url?.substring(
    //   url?.lastIndexOf('/') + 1,
    // )}`;
    const dirToSave =
      Platform.OS == 'ios'
        ? `${dirs.DocumentDir}/${filename}`
        : `${RNFS.ExternalStorageDirectoryPath}/Download/Connplex/${filename}`;
    const configs = {
      fileCache: true,
      addAndroidDownloads: {
        notification: true,
        useDownloadManager: true,
        path: `${dirToSave}`,
      },
    };
    RNFetchBlob.config(configs)
      .fetch('GET', url, {})
      .then(res => {
        if (Platform.OS === 'ios') {
          RNFetchBlob.fs
            .readFile(res.data, 'base64')
            .then(content => {
              RNFetchBlob.fs
                .writeFile(dirToSave, content, 'base64')
                .then(() => {
                  RNFetchBlob.ios.previewDocument(`file://${dirToSave}`);
                  setLoading(false);
                  // Snackbar.show({
                  //   text: 'PDF Downloaded Successfully',
                  //   duration: 3000,
                  // });
                })
                .catch(error => {
                  setLoading(false);
                  Log('Error writing file:', error);
                });
            })
            .catch(error => {
              setLoading(false);
              Log('Error reading file:', error);
            });
        } else {
          RNFetchBlob.android.actionViewIntent(res.path(), '/');
          Snackbar.show({
            text: 'PDF Download Successfully',
            duration: 3000,
          });
        }
      })
      .catch(e => {
        Log('Download error', e);
      })
      .finally(() => {});
  };

  return (
    <View style={style.container}>
      <TouchableOpacity
        disabled={loading}
        activeOpacity={0.7}
        style={style.mainContainer}
        onPress={onPress}>
        <Image
          source={
            item.movieId?.poster
              ? {uri: `${constant.imageURL}${item.movieId?.poster}`}
              : image.noImageAvailable
          }
          style={style.image}
        />
        {/* <View style={style.semiCircleContainer}>
        <View style={style.topContainer}>
          <View style={style.topSemiCircle} />
        </View>
        <View style={[style.border, {height: !isHide ? 165 : 130}]} />
        <View style={style.bottomSemiCircle} />
        <View />
      </View> */}
        <View style={style.detailsContainer}>
          <TouchableOpacity
            style={style.downloadImage}
            onPress={handleDownload}>
            <LinearGradient
              style={style.downloadParent}
              colors={color.buttonGradient}
              start={{x: 0.4, y: 1}}
              end={{x: 1, y: 1}}>
              {loading ? (
                <ActivityIndicator color={color.white} size="small" />
              ) : (
                <Image source={image.cloud} style={style.download} />
              )}
            </LinearGradient>
          </TouchableOpacity>
          <Text allowFontScaling={false} style={style.title} numberOfLines={1}>
            {item?.movieId?.name}
          </Text>
          <Text allowFontScaling={false} style={style.time}>
            {moment(item?.showId?.sessionRealShow)?.format(
              'DD MMM YYYY | hh:mm A',
            )}
          </Text>
          <View style={{marginTop: 15}}>
            <Text allowFontScaling={false} style={style.time}>
              Genre:{' '}
              {item?.movieId?.category
                ? item?.movieId?.category.replace(/\r\n/g, '')
                : '-'}
            </Text>
            <Text allowFontScaling={false} style={style.time}>
              Screen: {item?.showId?.screenName}
            </Text>
            <Text allowFontScaling={false} style={style.time}>
              Seat: {item?.setSeatData?.strSeatInfo}
            </Text>
            <Text allowFontScaling={false} style={style.time}>
              Payment Mode: {item?.paymentResponse?.payment_mode}
            </Text>
            <Text allowFontScaling={false} style={style.time}>
              Status:{' '}
              <Text
                allowFontScaling={false}
                style={[
                  style.time,
                  {color: item.commitStatus ? color.green : color.red},
                ]}>
                {item.commitStatus ? 'BOOKED' : 'FAILED'}
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.hideArrow}
        disabled
        // onPress={() => setIsHide(!isHide)}
      >
        <Text allowFontScaling={false} style={style.price}>
          Total Amount:
        </Text>
        <Text allowFontScaling={false} style={[style.price, {flex: 0}]}>
           ₹{Number(item?.finalBookingCalculation?.finalAmount)?.toFixed(2)}
        </Text>
        {/* <svg.DownArrow
          fill={color.black}
          style={{
            bottom: 2,
            transform: [{rotate: !isHide ? '180deg' : '0deg'}],
          }}
        /> */}
      </TouchableOpacity>
      {!isHide && (
        <View style={{paddingBottom: 8}}>
          <View style={style.content}>
            <Text allowFontScaling={false} style={[style.foodPrice, {flex: 1}]}>
              Ticket Amount:
            </Text>
            <Text allowFontScaling={false} style={style.foodPrice}>
              ₹
              {Number(
                item?.finalBookingCalculation?.ticketCart?.basePrice,
              )?.toFixed(2)}
            </Text>
          </View>
          {item?.finalBookingCalculation?.ticketCart?.membershipDiscount !=
            0 && (
            <View style={style.content}>
              <Text
                allowFontScaling={false}
                style={[style.foodPrice, {flex: 1}]}>
                Membership Discount:
              </Text>
              <Text allowFontScaling={false} style={style.foodPrice}>
                ₹
                {Number(
                  item?.finalBookingCalculation?.ticketCart?.membershipDiscount,
                )?.toFixed(2)}
              </Text>
            </View>
          )}
          <View style={style.content}>
            <Text allowFontScaling={false} style={[style.foodPrice, {flex: 1}]}>
              Discount:
            </Text>
            <Text allowFontScaling={false} style={style.foodPrice}>
              ₹
              {Number(
                item?.finalBookingCalculation?.ticketCart?.discountAmount,
              )?.toFixed(2)}
            </Text>
          </View>
          <View style={style.content}>
            <Text allowFontScaling={false} style={[style.foodPrice, {flex: 1}]}>
              Total After Discount:
            </Text>
            <Text allowFontScaling={false} style={style.foodPrice}>
              ₹
              {Number(
                item?.finalBookingCalculation?.ticketCart?.totalAfterDiscount ??
                  0,
              )?.toFixed(2)}
            </Text>
          </View>
          <View style={style.content}>
            <Text allowFontScaling={false} style={[style.foodPrice, {flex: 1}]}>
              CGST (
              {item?.finalBookingCalculation?.ticketCart?.totalAfterDiscount <=
              115
                ? '6%'
                : '9%'}
              ):
            </Text>
            <Text allowFontScaling={false} style={style.foodPrice}>
              ₹
              {Number(item?.finalBookingCalculation?.ticketCart?.cgst)?.toFixed(
                2,
              )}
            </Text>
          </View>
          <View style={style.content}>
            <Text allowFontScaling={false} style={[style.foodPrice, {flex: 1}]}>
              SGST (
              {item?.finalBookingCalculation?.ticketCart?.totalAfterDiscount <=
              115
                ? '6%'
                : '9%'}
              ):
            </Text>
            <Text allowFontScaling={false} style={style.foodPrice}>
              ₹
              {Number(item?.finalBookingCalculation?.ticketCart?.sgst)?.toFixed(
                2,
              )}
            </Text>
          </View>
          <View style={style.content}>
            <Text allowFontScaling={false} style={[style.foodPrice, {flex: 1}]}>
              Sub Total:
            </Text>
            <Text allowFontScaling={false} style={style.foodPrice}>
              ₹
              {Number(
                item?.finalBookingCalculation?.ticketCart?.total,
              )?.toFixed(2)}
            </Text>
          </View>
          <View style={style.content}>
            <Text allowFontScaling={false} style={[style.foodPrice, {flex: 1}]}>
              Food And Beverages Amount:
            </Text>
            <Text allowFontScaling={false} style={style.foodPrice}>
              ₹
              {Number(
                item?.finalBookingCalculation?.foodCart?.basePrice,
              ).toFixed(2)}
            </Text>
          </View>
          {item?.finalBookingCalculation?.foodCart?.membershipDiscount != 0 && (
            <View style={style.content}>
              <Text
                allowFontScaling={false}
                style={[style.foodPrice, {flex: 1}]}>
                Membership Discount:
              </Text>
              <Text allowFontScaling={false} style={style.foodPrice}>
                ₹
                {Number(
                  item?.finalBookingCalculation?.foodCart?.membershipDiscount,
                )?.toFixed(2)}
              </Text>
            </View>
          )}
          {item?.finalBookingCalculation?.foodCart?.basePrice != 0 && (
            <>
              <View style={style.content}>
                <Text
                  allowFontScaling={false}
                  style={[style.foodPrice, {flex: 1}]}>
                  Discount:
                </Text>
                <Text allowFontScaling={false} style={style.foodPrice}>
                  ₹
                  {Number(
                    item?.finalBookingCalculation?.foodCart?.discountAmount,
                  )?.toFixed(2)}
                </Text>
              </View>
              <View style={style.content}>
                <Text
                  allowFontScaling={false}
                  style={[style.foodPrice, {flex: 1}]}>
                  Total After Discount:
                </Text>
                <Text allowFontScaling={false} style={style.foodPrice}>
                  ₹
                  {Number(
                    item?.finalBookingCalculation?.foodCart?.totalAfterDiscount,
                  )?.toFixed(2)}
                </Text>
              </View>
              <View style={style.content}>
                <Text
                  allowFontScaling={false}
                  style={[style.foodPrice, {flex: 1}]}>
                  CGST ( 2.5% ):
                </Text>
                <Text allowFontScaling={false} style={style.foodPrice}>
                  ₹
                  {Number(
                    item?.finalBookingCalculation?.foodCart?.cgst,
                  )?.toFixed(2)}
                </Text>
              </View>
              <View style={style.content}>
                <Text
                  allowFontScaling={false}
                  style={[style.foodPrice, {flex: 1}]}>
                  SGST ( 2.5% ):
                </Text>
                <Text allowFontScaling={false} style={style.foodPrice}>
                  ₹
                  {Number(
                    item?.finalBookingCalculation?.foodCart?.sgst,
                  )?.toFixed(2)}
                </Text>
              </View>
              <View style={style.content}>
                <Text
                  allowFontScaling={false}
                  style={[style.foodPrice, {flex: 1}]}>
                  Sub Total:
                </Text>
                <Text allowFontScaling={false} style={style.foodPrice}>
                  ₹
                  {Number(
                    item?.finalBookingCalculation?.foodCart?.total,
                  )?.toFixed(2)}
                </Text>
              </View>
            </>
          )}
          <View style={style.content}>
            <Text allowFontScaling={false} style={[style.foodPrice, {flex: 1}]}>
              Convenience Fee (Including GST):
            </Text>
            <Text allowFontScaling={false} style={style.foodPrice}>
              ₹{item?.cinemaId?.convenienceFees?.toFixed(2)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default memo(BookingHistoryList);
