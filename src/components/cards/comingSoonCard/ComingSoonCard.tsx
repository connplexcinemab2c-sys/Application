import React, {memo} from 'react';
import {Text, TouchableOpacity, View, ImageBackground} from 'react-native';
import constant from '../../../services/config/constant';
import {ComingSoonCardProps} from './comingSoonCard.interface';
import image from '../../../assets/imageIndex';
import style from './comingSoonCard.style';

const ComingSoonCard: React.FC<ComingSoonCardProps> = ({
  item,
  onPress,
  index,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={style.container}
      onPress={() => onPress(item)}
      key={index}>
      <ImageBackground
        source={
          item.poster
            ? {uri: `${constant.imageURL}${item.poster}`}
            : image.noImageAvailable
        }
        resizeMode="cover"
        borderTopLeftRadius={7}
        borderTopRightRadius={7}
        style={style.image}>
        {/* <View style={style.likesContainer}>
          <svg.Likes />
          <Text allowFontScaling={false} style={style.likes}>16.5k</Text>
        </View> */}
      </ImageBackground>
      <Text allowFontScaling={false} style={style.title}>
        {item?.name?.toUpperCase()}
      </Text>
      <Text allowFontScaling={false} style={style.details}>
        {item?.category}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(ComingSoonCard);
