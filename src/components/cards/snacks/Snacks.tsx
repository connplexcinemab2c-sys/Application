import React, {memo} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import constant from '../../../services/config/constant';
import imageIndex from '../../../assets/imageIndex';
import {SnacksProps} from './snacks.interface';
import svg from '../../../assets/svgIndex';
import style from './snacks.style';

const Snacks: React.FC<SnacksProps> = ({
  item,
  addQuantity,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <View style={style.container} key={item?.id}>
      <Image
        source={
          item?.image
            ? {uri: `${constant.imageURL}${item?.image}`}
            : imageIndex.foodAndBeverage
        }
        style={style.image}
        resizeMode="contain"
      />
      <Text allowFontScaling={false} style={style.name}>
        {item?.name}
      </Text>
      <View style={style.priceQuantityContainer}>
        <Text allowFontScaling={false} style={style.price}>
          ₹ {item?.price?.toFixed(2)}
        </Text>
        {item?.quantity === 0 ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={addQuantity}
            style={style.addQuantity}>
            <svg.Plus />
          </TouchableOpacity>
        ) : (
          <View style={style.quantityContainer}>
            <TouchableOpacity activeOpacity={0.7} onPress={decreaseQuantity}>
              <svg.Minus />
            </TouchableOpacity>
            <Text allowFontScaling={false} style={style.quantity}>
              {item?.quantity}
            </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={increaseQuantity}>
              <svg.PlusSmall />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default memo(Snacks);
