import React, {memo} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import constant from '../../../services/config/constant';
import imageIndex from '../../../assets/imageIndex';
import SvgIndex from '../../../assets/svgIndex';
import style from './cinemaCard.style';

const CinemaCard: React.FC<CinemaCardProps> = ({item, index, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      key={index}
      style={style.container}
      onPress={() => onPress(item)}>
      <ImageBackground
        source={
          item?.poster
            ? {uri: `${constant.imageURL}${item?.poster}`, cache: 'force-cache'}
            : imageIndex.noImageAvailable
        }
        imageStyle={style.image}
        style={style.banner}>
        <View style={style.detailContainer}>
          <Text allowFontScaling={false} style={style.title} numberOfLines={2}>
            {item?.displayName}
          </Text>
          <View style={style.addressContainer}>
            <SvgIndex.TheatreLocation />
            <Text
              allowFontScaling={false}
              style={style.address}
              numberOfLines={3}>
              {item?.address}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default memo(CinemaCard);
