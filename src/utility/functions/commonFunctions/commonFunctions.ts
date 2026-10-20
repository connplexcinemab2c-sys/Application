import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {AuthNavigationProps} from '../../../navigation/stacks/authStack';
import {CommonFunctionsProps} from './commonFunctions.interface';
import Log from '../../log';
import Snackbar from 'react-native-snackbar';
import RNFetchBlob from 'rn-fetch-blob';
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import RNFS from 'react-native-fs';
import constant from '../../../services/config/constant';

const commonFunctions = (): CommonFunctionsProps => {
  const navigation = useNavigation<AuthNavigationProps>();

  const onBack = (): void => {
    navigation.goBack();
  };

  const formatDuration = (minutes: number): string => {
    const duration = moment.duration(minutes, 'minutes');
    const hours = duration.hours();
    const mins = duration.minutes();

    if (hours === 0) {
      return `${mins} min`;
    } else if (mins === 0) {
      return `${hours} hours 0 min`;
    } else {
      return `${hours} hours ${mins} min`;
    }
  };

  const formatLikes = (value: number): string => {
    if (value >= 1000) {
      return (value / 1000)?.toFixed(1) + 'k';
    } else {
      return value?.toString();
    }
  };

  const displayDuration = (durationInHours: number) => {
    if (durationInHours < 5) {
      const hours = Math.floor(durationInHours);
      const minutes = Math.round((durationInHours - hours) * 100);
      return hours + 'h ' + minutes + 'm';
    } else {
      return `0 hr`;
    }
  };

  const extractVideoId = (url: string): string | undefined => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url?.match(regex);
    return match ? match[1] : undefined;
  };

  const handleStoragePermissionAndDownload = async (
    item: any,
    setLoading: (loading: boolean) => void,
  ) => {
    /* Permission for getting Storage */
    if (Platform.OS == 'ios') {
      setLoading(true);
      onDownload(item, setLoading);
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
                await requestStoragePermission(item, setLoading);
                Log('checked Permission', 'Permission denied');
                return;
              } else {
                permissionSuccess(item, setLoading);
              }
            } else {
              permissionSuccess(item, setLoading);
            }
          }
        } catch (error: any) {
          Snackbar.show({text: error?.message});
        }
      } else {
        permissionSuccess(item, setLoading);
      }
    }
  };

  const requestStoragePermission = async (
    item: any,
    setLoading: (loading: boolean) => void,
  ) => {
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
        permissionSuccess(item, setLoading);
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

  const permissionSuccess = (
    item: any,
    setLoading: (loading: boolean) => void,
  ) => {
    const folderPath = `${RNFS.ExternalStorageDirectoryPath}/Download/Connplex`;
    RNFS.mkdir(folderPath)
      .then(res => {
        onDownload(item, setLoading);
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

  const onDownload = (item: any, setLoading: (loading: boolean) => void) => {
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

  return {
    onBack,
    formatDuration,
    formatLikes,
    extractVideoId,
    displayDuration,
    handleStoragePermissionAndDownload,
  };
};

export default commonFunctions;
