import React, {FC} from 'react';
import {View, ActivityIndicator, Text, ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';
import {color} from '../../theme';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import {Header, CustomStatusBar} from '../../components';
import constant from '../../services/config/constant';
import termsConditionsController from './termsConditions.controller';
import style from './termsConditions.style';
import {useRoute} from '@react-navigation/native';

const TermsConditions: FC = () => {
  const {loading, setLoading} = termsConditionsController();
  const route = useRoute<any>();
  const {onBack} = commonFunctions();

  return (
    <View style={style.main}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <Header
        title="Terms & Conditions"
        onBack={onBack}
        backIcon
        containerStyle={style.title}
      />

      {route?.params?.type === 'membership' ? (
        <ScrollView
          style={style.textContainer}
          contentContainerStyle={style.textContent}>
          <Text style={style.heading}>Exclusive Membership Terms</Text>
          <Text style={style.paragraph}>
            <Text style={style.bold}>Invite-Only Access:</Text> Connplex
            Membership is invite-only and available in select cities.
          </Text>
          <Text style={style.paragraph}>
            <Text style={style.bold}>Benefits:</Text> Members enjoy discounts on
            tickets, food & beverages, and merchandise at Connplex Cinemas.
          </Text>
          <Text style={style.paragraph}>
            <Text style={style.bold}>Offer Redemption:</Text> Valid only at
            participating Connplex Cinemas and cannot be exchanged for cash.
          </Text>
          <Text style={style.paragraph}>
            <Text style={style.bold}>Payment:</Text> Offers apply only to
            purchases made via the Connplex App. Taxes and service charges not
            included.
          </Text>
          <Text style={style.paragraph}>
            <Text style={style.bold}>Fees & Renewal:</Text> Membership requires
            a fee based on the plan selected. It is non-transferable and
            non-refundable.
          </Text>
          <Text style={style.paragraph}>
            <Text style={style.bold}>Modifications:</Text> Connplex may change
            or withdraw offers without prior notice.
          </Text>
          <Text style={style.paragraph}>
            <Text style={style.bold}>Termination:</Text> Membership may be
            suspended or revoked if terms are violated.
          </Text>
          <Text style={style.paragraph}>
            <Text style={style.bold}>Privacy & Communication:</Text> Members
            must provide personal details and may receive promotional messages.
          </Text>
          <Text style={style.paragraph}>
            <Text style={style.bold}>Contact:</Text> For queries, email{' '}
            <Text style={style.link}>feedback@theconnplex.com</Text>.
          </Text>
        </ScrollView>
      ) : (
        <WebView
          source={{uri: constant.termsAndConditions}}
          style={style.container}
          startInLoadingState={loading}
          onLoad={() => setLoading(false)}
          renderLoading={() => (
            <View style={style.loader}>
              <ActivityIndicator size="large" color={color.white} />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default TermsConditions;
