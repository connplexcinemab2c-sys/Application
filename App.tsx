import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import VersionInfo from 'react-native-version-info';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SpInAppUpdates from 'sp-react-native-in-app-updates';
import {HiddenLinkedInTracker} from './src/components';
import AppUpdate from './src/components/appUpdate/AppUpdate';
import Route from './src/navigation';
import {persistor, store} from './src/services/config/redux/store';
const App = () => {
  const inAppUpdates = new SpInAppUpdates(false);
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [latestVersion, setLatestVersion] = useState('');

  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead',
  ]);
  if (!__DEV__) {
    LogBox.ignoreAllLogs();
  }

  const [renderTracker, setRenderTracker] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRenderTracker(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const appVersion = VersionInfo?.appVersion;

    inAppUpdates
      .checkNeedsUpdate({curVersion: appVersion})
      .then(result => {
        if (result.shouldUpdate) {
          setShowUpdatePrompt(true);
        }
      })
      .catch(error => {});
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Route />
        {renderTracker && <HiddenLinkedInTracker />}
        {showUpdatePrompt && <AppUpdate visible={showUpdatePrompt} />}
      </PersistGate>
    </Provider>
  );
};

export default App;
