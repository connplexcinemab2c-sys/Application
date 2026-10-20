import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import imageIndex from '../../assets/imageIndex';
import {Button, CustomStatusBar, Header} from '../../components';
import {color} from '../../theme';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import {capitalizeFirstLetter} from '../../utility/validation/stringValidation';
import paymentSuccessController from './paymentSuccess.controller';
import styles from './paymentSuccess.style';
const PaymentSuccess = () => {
  const {onClick, route} = paymentSuccessController();
  const {onBack} = commonFunctions();

  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <Header
        backIcon
        onBack={onBack}
        title="Payment Success"
        titleContainerStyle={styles.title}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollStyle}>
        <Image
          source={imageIndex.membershipSuccess}
          style={styles.imageStyle}
        />
        <View style={styles.mainView}>
          <Text style={styles.label}>
            Thank you for becoming a{' '}
            {capitalizeFirstLetter(route?.params?.data?.title)} Member
          </Text>
          {/* <Text style={styles.success}>
            Payment of <Text style={styles.rupee}>₹{route?.params?.price}</Text>{' '}
            Successful
          </Text> */}
          <Text style={styles.info}>
            To view your membership details, Please check in your profile
          </Text>
          <Button
            title="Explore Connplex Cinema"
            onPress={() => onClick()}
            containerStyle={styles.buttonContainer}
          />
          {/* <Text style={styles.enjoyText}>
            Enjoy your movie going experience!
          </Text> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentSuccess;
