import React, {FC} from 'react';
import {ActivityIndicator, View} from 'react-native';
import WebView from 'react-native-webview';
import {color} from '../../theme';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import constant from '../../services/config/constant';
import {CustomStatusBar, Header} from '../../components';
import legalNoticeController from './legalNotice.controller';
import styles from './legalNotice.style';
import {useRoute} from '@react-navigation/native';

const LegalNotice: FC = () => {
  const route = useRoute<any>();
  const {loading, setLoading} = legalNoticeController();
  const {onBack} = commonFunctions();
  return (
    <View style={styles.main}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <Header
        title={route?.params?.title}
        onBack={onBack}
        backIcon
        containerStyle={styles.title}
      />
      <WebView
        source={
          route?.params?.title == 'FAQ'
            ? {
                uri: constant.faq,
              }
            : {
                uri: constant.legalNotice,
              }
        }
        style={styles.container}
        startInLoadingState={loading}
        onLoad={() => setLoading(false)}
        renderLoading={() => (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={color.white} />
          </View>
        )}
      />
    </View>
  );
};

export default LegalNotice;
