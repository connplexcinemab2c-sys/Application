import React, {memo} from 'react';
import {TouchableOpacity, Image, Text, View} from 'react-native';
import {SvgUri} from 'react-native-svg';
import constant from '../../../services/config/constant';
import {PopularCitiesProps} from './popularCities.interface';
import style from './popularCities.style';
import imageIndex from '../../../assets/imageIndex';

const getImageType = (url: any) => {
  const format = url?.split(/[#?]/)[0]?.split('.')?.pop()?.trim();
  return ['svg', 'png', 'jpg'].includes(format) ? format : null;
};

const PopularCities: React.FC<PopularCitiesProps> = ({
  item,
  index,
  onPress,
}) => {
  const imageType = getImageType(item?.image);
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      activeOpacity={0.7}
      style={style.container}
      key={index}>
      <View style={style.iconContainer}>
        {imageType === 'svg' ? (
          <SvgUri
            style={style.svgStyle}
            width="55"
            height="55"
            uri={constant.imageURL + item?.image}
          />
        ) : imageType ? (
          <Image
            source={{uri: constant.imageURL + item?.image}}
            style={style.image}
          />
        ) : (
          <Image source={imageIndex.noImageAvailable1} style={style.noImage} />
        )}
      </View>
      <Text allowFontScaling={false} style={style.name}>
        {' '}
        {item?.region}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(PopularCities);
