import React, {memo} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {FeaturedCardProps} from './featuredCard.interface';
import style from './featuredCard.style';
import svgIndex from '../../assets/svgIndex';

const FeaturedCard: React.FC<FeaturedCardProps> = ({item}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={style.container}>
      <Image source={item.image} style={style.image} />
      <View style={style.detailsContainer}>
        <View style={style.nameContainer}>
          <Text allowFontScaling={false} style={style.name}>
            {item.name}
          </Text>
          <Text allowFontScaling={false} style={style.price}>
            {item.price}
          </Text>
        </View>
        {item.quantity == 0 ? (
          <TouchableOpacity activeOpacity={0.7} style={style.plus}>
            <svgIndex.Plus />
          </TouchableOpacity>
        ) : (
          <View style={style.quantityContainer}>
            <TouchableOpacity activeOpacity={0.7}>
              <svgIndex.Minus />
            </TouchableOpacity>
            <Text allowFontScaling={false} style={style.quantity}>
              {item.quantity}
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <svgIndex.PlusSmall />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(FeaturedCard);
