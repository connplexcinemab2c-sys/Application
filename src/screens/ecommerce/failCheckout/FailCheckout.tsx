import {View, Text, Pressable} from 'react-native';
import React from 'react';
import style from './failCheckout.style';
import SvgIndex from '../../../assets/svgIndex';
import useFailCheckout from './useFailCheckout';

const FailCheckout = () => {
  const {onPressContinue} = useFailCheckout();
  return (
    <View style={style.container}>
      <View style={style.confetyImg}>
        <View style={style.imgContainer}>
          <SvgIndex.FailedCross />
        </View>
        <Text style={style.successText}>Payment Failed</Text>
        <Text style={style.successDesText}>
          We can’t process your payment, check your internet connection and try
          again
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

export default FailCheckout;
