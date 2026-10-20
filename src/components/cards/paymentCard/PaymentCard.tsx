import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {color} from '../../../theme';
import {PaymentCardProps} from './paymentCard.interface';
import style from './paymentCard.style';

const PaymentCard: React.FC<PaymentCardProps> = ({
  item,
  index,
  lastIndex,
  onPress,
  isSelected,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        style.mainContainer,
        {
          paddingTop: index != 0 ? 20 : 0,
          paddingBottom: index == lastIndex ? 0 : 20,
          borderTopWidth: index == 0 ? 0 : 0.2,
        },
      ]}
      onPress={() => onPress(item)}>
      <View
        style={[
          style.radio,
          {borderColor: isSelected ? color.text : color.white},
        ]}>
        {isSelected && <View style={style.filledRadio} />}
      </View>
      <Image source={item.image} style={style.image} />
      <View style={style.nameContainer}>
        <View>
          <Text allowFontScaling={false} style={style.name}>
            {item.name}
          </Text>
          {item.number && (
            <Text allowFontScaling={false} style={style.number}>
              {item?.number}
            </Text>
          )}
        </View>
        {isSelected && (
          <Text allowFontScaling={false} style={style.CVVText}>
            CVV
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(PaymentCard);
