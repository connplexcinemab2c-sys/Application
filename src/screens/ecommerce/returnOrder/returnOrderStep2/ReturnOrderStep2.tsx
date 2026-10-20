import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import useReturnOrderStep2 from './useReturnOrderStep2';
import styles from './returnOrderStep2.style';
import EcomHeader from '../../../../components/ecomHeader/EcomHeader';
import {CustomStatusBar} from '../../../../components';
import SvgIndex from '../../../../assets/svgIndex';
import ProgressSteps, {Title} from '@joaosousa/react-native-progress-steps';
import {color} from '../../../../theme';

const ReturnOrderStep2: React.FC = () => {
  const {productDetails, onDone, returnOrder2State} = useReturnOrderStep2();
  const steps = [
    {
      title: <Title>Return Request Submitted</Title>,
    },
    {
      title: (
        <Title>
          Our agent will come & pick up the item from the pickup address.
        </Title>
      ),
    },
  ];
  const Marker = ({stepState: {stepIndex = 0, isCompleted}}: any) => {
    return (
      <View
        style={{
          height: returnOrder2State?.currentStep === stepIndex ? 14 : 10,
          width: returnOrder2State?.currentStep === stepIndex ? 14 : 10,
          backgroundColor:
            returnOrder2State?.currentStep === stepIndex
              ? color.stepYellow
              : isCompleted
              ? color.stepYellow
              : color.white,
          borderWidth: returnOrder2State?.currentStep === stepIndex ? 4 : 0,
          borderColor: color.stepBorder,
          borderRadius: 10,
          marginTop: 15,
          marginLeft: returnOrder2State?.currentStep === stepIndex ? -2 : 0,
        }}>
        {steps?.length - 1 !== stepIndex && (
          <View
            style={{
              height: 45,
              width: 1,
              backgroundColor: color.stepYellow,
              left: returnOrder2State?.currentStep === stepIndex ? 3 : 5,
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
          <Text style={styles.orderCancelText}>Return Request Submitted</Text>
          <Text style={styles.orderIdText}>
            Order ID {productDetails?.orderId}
          </Text>
        </View>
        <View style={styles.refundContainer}>
          <Text style={styles.refundText}>
            A refund of{' '}
            <Text style={styles.refundPriceText}>
              ₹ {productDetails?.totalAmount}
            </Text>{' '}
            will be initiated after the item is picked up and quality check has
            been passed.
          </Text>
        </View>
        <ProgressSteps
          orientation={'vertical'}
          currentStep={returnOrder2State?.currentStep}
          marker={<Marker />}
          steps={steps}
          colors={{
            title: {
              text: {
                normal: color.white,
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

export default ReturnOrderStep2;
