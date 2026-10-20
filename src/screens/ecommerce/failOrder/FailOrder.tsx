import {View, Text, Pressable} from 'react-native';
import React from 'react';
import style from './failOrder.style';
import SvgIndex from '../../../assets/svgIndex';
import useFailCheckout from './useFailOrder';

const FailOrder = () => {
  const {onPressContinue} = useFailCheckout();
  return (
    <View style={style.container}>
      <View style={style.confetyImg}>
        <View style={style.imgContainer}>
          <SvgIndex.FailedCross />
        </View>
        <Text style={style.successText}>Payment Cancelled</Text>
        <Text style={style.successDesText}>
          Your Payment has been canceled. You will receive an email or SMS with
          the details shortly. If you have any questions or need assistance,
          please contact our support team
        </Text>
        <Pressable onPress={onPressContinue}>
          <Text style={[style.thanksTxt, style.continueBtn]}>
            Continue Shopping
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FailOrder;
