import NetInfo from '@react-native-community/netinfo';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import NetworkStatus from '../components/networkStatus/NetworkStatus';
import {color} from '../theme';
import {navigationRef} from '../utility/navigationService';
import NavigationListener from './NavigationListener';
import AuthStack from './stacks/authStack';

const Route = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: color.black,
    },
  };

  const [connected, setConnected] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const onTryAgain = (): void => {
    setModal(false);
    networkInfo();
  };

  useEffect(() => {
    networkInfo();
  }, []);

  const networkInfo = () => {
    NetInfo.addEventListener(state => {
      if (state?.isConnected === false) {
        setConnected(false);
        setModal(true);
      } else {
        setConnected(true);
        setModal(false);
      }
    });
  };

  return (
    <NavigationContainer
      theme={MyTheme}
      ref={navigationRef}
      onReady={() => {
        SplashScreen.hide();
      }}>
      <NavigationListener>
        <AuthStack />
        {!connected && (
          <NetworkStatus isModal={modal} onTryAgain={onTryAgain} />
        )}
      </NavigationListener>
    </NavigationContainer>
  );
};

export default Route;
