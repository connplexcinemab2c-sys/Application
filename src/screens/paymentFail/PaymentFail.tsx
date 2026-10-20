import {View, Text, Image, ScrollView, Dimensions} from 'react-native';
import React from 'react';
import styles from './paymentFail.style';
import {Button, CustomStatusBar, Header} from '../../components';
import {color} from '../../theme';
import imageIndex from '../../assets/imageIndex';
import PaymentFailController from './paymentFail.controller';

const {height} = Dimensions.get('window');
const PaymentFail = () => {
  const {onClick, route, onClickHome, onDetail} = PaymentFailController();

  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <Header
        title="Payment Failed"
        titleContainerStyle={styles.title}
        titleStyle={{textAlign: 'center'}}
      />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollStyle}>
        <Image
          source={imageIndex.paymentFail}
          style={[
            styles.imageStyle,
            {
              height:
                route?.params?.screen == 'payment'
                  ? height / 2.4
                  : height / 2.1,
            },
          ]}
          resizeMode="contain"
        />
        <View style={styles.mainView}>
          <Text style={styles.label}>Transaction Failed</Text>
          <Text
            style={[
              styles.info,
              {
                textAlign:
                  route?.params?.screen == 'payment' ? 'left' : 'center',
              },
            ]}>
            {route?.params?.screen == 'payment'
              ? 'Oops!!! Something went wrong. If your money has been debited / tickets have not been confirmed then you can simply "Raise an Issue" Ticket by sharing the unsuccessful transaction details under "Your Profile" section on the Website / App and our Team shall get back to you on the same'
              : ' Oh snap! Your transaction has been failed, Please try again'}
          </Text>
          {route?.params?.screen == 'payment' ? (
            <View style={styles.buttonView}>
              <Button
                title="View Order Details"
                gradient={color.memberGradient}
                onPress={() => onDetail()}
                mainContainer={styles.detailButton}
                containerStyle={styles.button}
              />
              <Button
                title="Go Home"
                onPress={() => onClickHome()}
                mainContainer={styles.main}
                containerStyle={styles.homeButton}
              />
            </View>
          ) : (
            <Button
              title="Try Again"
              onPress={() => onClick()}
              containerStyle={styles.buttonContainer}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentFail;
