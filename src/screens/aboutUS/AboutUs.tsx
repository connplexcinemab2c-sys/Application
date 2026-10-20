import React, {FC} from 'react';
import {View, ActivityIndicator} from 'react-native';
import WebView from 'react-native-webview';
import aboutUsController from './aboutUs.controller';
import {color} from '../../theme';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import {Header, CustomStatusBar} from '../../components';
import constant from '../../services/config/constant';
import style from './aboutUs.style';

const AboutUs: FC = () => {
  const {loading, setLoading} = aboutUsController();
  const {onBack} = commonFunctions();
  return (
    <View style={style.main}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <Header
        title="About Connplex"
        onBack={onBack}
        backIcon
        containerStyle={style.title}
      />
      <WebView
        source={{
          uri: constant.aboutUs,
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

export default AboutUs;
