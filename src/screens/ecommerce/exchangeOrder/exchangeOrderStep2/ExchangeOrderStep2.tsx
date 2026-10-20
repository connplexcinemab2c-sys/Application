import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import useExchangeOrderStep2 from './useExchangeOrderStep2';
import styles from './exchangeOrderStep2.style';
import EcomHeader from '../../../../components/ecomHeader/EcomHeader';
import {CustomStatusBar} from '../../../../components';
import SvgIndex from '../../../../assets/svgIndex';
import ProgressSteps, {Title} from '@joaosousa/react-native-progress-steps';
import {color} from '../../../../theme';
import constant from '../../../../services/config/constant';

const ExchangeOrderStep2: React.FC = () => {
  const {productDetails, onDone, exchangeOrder2State, route} =
    useExchangeOrderStep2();
  const steps = [
    {
      title: <Title>Exchange Request Submitted</Title>,
    },
    {
      title: (
        <Title>
          Repack the item with the original packaging and accompanying return
          bag
        </Title>
      ),
    },
    {
      title: (
        <Title>
          Hand over the package to the delivery agent and collect the new
          package
        </Title>
      ),
    },
  ];
  const Marker = ({stepState: {stepIndex = 0, isCompleted}}: any) => {
    return (
      <View
        style={{
          height: exchangeOrder2State?.currentStep === stepIndex ? 14 : 10,
          width: exchangeOrder2State?.currentStep === stepIndex ? 14 : 10,
          backgroundColor:
            exchangeOrder2State?.currentStep === stepIndex
              ? color.stepYellow
              : isCompleted
              ? color.stepYellow
              : color.white,
          borderWidth: exchangeOrder2State?.currentStep === stepIndex ? 4 : 0,
          borderColor: color.stepBorder,
          borderRadius: 10,
          marginTop: 15,
          marginLeft: exchangeOrder2State?.currentStep === stepIndex ? -2 : 0,
        }}>
        {steps?.length - 1 !== stepIndex && (
          <View
            style={{
              height: 52,
              width: 1,
              backgroundColor: color.stepYellow,
              left: exchangeOrder2State?.currentStep === stepIndex ? 3 : 5,
            }}
          />
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <CustomStatusBar transparent backgroundColor={color.blackBackground} />
      <EcomHeader
        showCart={false}
        showLogo={false}
        showNotification={false}
        title="Orders"
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.checkContainer}>
          <SvgIndex.Check />
          <Text style={styles.orderCancelText}>Exchange Request Submitted</Text>
          <Text style={styles.orderIdText}>
            Order ID {productDetails?.orderId}
          </Text>
        </View>
        <View style={styles.refundContainer}>
          <Image
            source={{
              uri: constant.ecomImageUrl + productDetails?.cartId?.image,
            }}
            style={styles.productCancelImage}
          />
          <View style={styles.productInfoContainer}>
            <Text style={styles.productNameText}>
              {productDetails?.cartId?.productId?.productName}
            </Text>
            <View style={styles.dataDetailContainer}>
              <Text style={styles.colorSizeExchangeText}>
                Size : {route?.params?.newSize}
              </Text>
              <Text style={styles.colorSizeQuantityText}>
                Size : {productDetails?.cartId?.attributes?.size}
              </Text>
            </View>
          </View>
        </View>
        <ProgressSteps
          orientation={'vertical'}
          currentStep={exchangeOrder2State?.currentStep}
          marker={<Marker />}
          steps={steps}
          colors={{
            title: {
              text: {
                normal: color.returnText,
                active: color.returnText,
                completed: color.white,
              },
            },
          }}
        />
      </ScrollView>
      <View style={styles.cancelContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.cancelButton}
          onPress={onDone}>
          <Text style={styles.cancelText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExchangeOrderStep2;
