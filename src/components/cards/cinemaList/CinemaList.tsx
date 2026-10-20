import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {CinemaListProps} from './cinemaList.interface';
import constant from '../../../services/config/constant';
import style from './cinemaList.style';
import imageIndex from '../../../assets/imageIndex';

const CinemaList: React.FC<CinemaListProps> = ({item, onPress}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      activeOpacity={0.7}
      style={style.mainContainer}>
      <Image
        source={
          item?.poster
            ? {uri: `${constant.imageURL}${item?.poster}`}
            : imageIndex.appLogo
        }
        style={style.image}
        resizeMode={item?.poster ? 'cover' : 'contain'}
      />
      <View style={style.detailsContainer}>
        <Text allowFontScaling={false} style={style.name}>
          {item?.displayName}
        </Text>
        {item?.emailId && (
          <Text
            allowFontScaling={false}
            style={style.emailText}
            numberOfLines={1}>
            {item?.emailId?.toUpperCase()}
          </Text>
        )}
        <Text allowFontScaling={false} style={style.location}>
          {item?.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(CinemaList);
