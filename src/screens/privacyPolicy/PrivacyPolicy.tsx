import React, {FC} from 'react';
import {ActivityIndicator, View} from 'react-native';
import WebView from 'react-native-webview';
import {color} from '../../theme';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import {CustomStatusBar, Header} from '../../components';
import constant from '../../services/config/constant';
import privacyPolicyController from './privacyPolicy.controller';
import style from './privacyPolicy.style';

const PrivacyPolicy: FC = () => {
  const {loading, setLoading} = privacyPolicyController();
  const {onBack} = commonFunctions();
  return (
    <View style={style.main}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <Header
        title="Privacy Policy"
        onBack={onBack}
        backIcon
        containerStyle={style.title}
      />
      <WebView
        source={{
          uri: constant.privacyPolicy,
        }}
        style={style.container}
        startInLoadingState={loading}
        onLoad={() => setLoading(false)}
        renderLoading={() => (
          <View style={style.loader}>
            <ActivityIndicator size="large" color={color.white} />
          </View>
        )}
      />
    </View>
  );
};

export default PrivacyPolicy;
