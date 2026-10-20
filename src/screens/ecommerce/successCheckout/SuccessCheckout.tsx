import React from 'react';
import {View, Text, Image, Pressable, ImageBackground} from 'react-native';
import {Button} from '../../../components';
import {color} from '../../../theme';
import imageIndex from '../../../assets/imageIndex';
import useSuccessCheckout from './useSuccessCheckout';
import style from './successCheckout.style';

const SuccessCheckout: React.FC = () => {
  const {onPressContinue, onPressOrderDetail} = useSuccessCheckout();
  return (
    <View style={style.container}>
      <ImageBackground source={imageIndex.confety} style={style.confetyImg}>
        <View style={style.imgContainer}>
          <Image style={style.successImg} source={imageIndex.success} />
        </View>
        <Text style={style.successText}>Order Placed</Text>
        <Text style={style.successDesText}>
          {`Your order will be delivered soon`}
        </Text>
        <Text style={style.thanksTxt}>Thank You!</Text>
        {/* <Text style={style.orderId} selectable>
          Order Id : 235689
        </Text> */}
        <Button
          title="View Order"
          buttonTouchable={style.btnContainer}
          containerStyle={style.btnWrapper}
          titleStyle={style.buttonText}
          mainContainer={style.buttonWrapper}
          onPress={onPressOrderDetail}
          gradient={color.categorySelected}
        />
        {/* <Pressable onPress={onPressOrderDetail}>
          <Text style={style.orderId}>View Order</Text>
        </Pressable> */}
        <Pressable onPress={onPressContinue}>
          <Text style={[style.thanksTxt, style.continueBtn]}>
            Continue Shopping
          </Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
};

export default SuccessCheckout;
