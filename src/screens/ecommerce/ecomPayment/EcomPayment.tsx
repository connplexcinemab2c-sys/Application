import React from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import {color} from '../../../theme';
import {CustomStatusBar} from '../../../components';
import EcomHeader from '../../../components/ecomHeader/EcomHeader';
import useEcomPayment from './useEcomPayment';
import style from './ecomPayment.style';

const EcomPayment: React.FC = () => {
  const {
    cartItem,
    route,
    injectedJavascript,
    handleNavigationState,
    handleShouldStartLoadWithRequest,
  } = useEcomPayment();
  return (
    <View style={style.container}>
      <CustomStatusBar
        backgroundColor={color.ecomBackground}
        barStyle={'light-content'}
      />
      <View style={{paddingBottom:8}}>

      </View>
  
      <WebView
        source={{html: `<html>${route?.params?.url}</html>`}}
        style={style.webview}
        javaScriptEnabled={true}
        setBuiltInZoomControls={false}
        setDisplayZoomControls={false}
        domStorageEnabled={true}
        startInLoadingState={true}
        injectedJavaScript={injectedJavascript}
        onNavigationStateChange={handleNavigationState}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
      />
    </View>
  );
};

export default EcomPayment;
