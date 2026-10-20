import {Platform, Alert} from 'react-native';
import GetLocation from 'react-native-get-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

const getUserLocationIos = async () => {
  const location = await GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
    .then((location: any) => {
      return location;
    })
    .catch(ex => {
      const {code, message} = ex;
      if (code === 'CANCELLED') {
        //Alert.alert('Location cancelled by user or by another request');
      }
      if (code === 'UNAVAILABLE') {
        enalbleLocation();
      }
      if (code === 'TIMEOUT') {
        Alert.alert('Location request timed out');
      }
      if (code === 'UNAUTHORIZED') {
        enalbleLocation();
      }
      return message;
    });

  return location;
};
const enalbleLocation = () => {
  if (Platform.OS == 'android') {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then(data => {
        getUserLocationIos();
      })
      .catch(err => {
        // Alert.alert(
        //   'Your GPS is not enabled',
        //   `You must enable location services for Connplex to work`,
        //   [{text: 'Turn On', onPress: () => enalbleLocation()}],
        // );
      });
  } else {
    // Alert.alert(
    //   'Your Location permission is not enabled',
    //   `You must enable location services for Connplex to work`,
    // );
  }
};

export {getUserLocationIos};
