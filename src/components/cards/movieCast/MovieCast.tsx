import React, {memo} from 'react';
import {View, Text, Image} from 'react-native';
import constant from '../../../services/config/constant';
import image from '../../../assets/imageIndex';
import {MovieCastProps} from './movieCast.interface';
import style from './movieCast.style';

const MovieCast: React.FC<MovieCastProps> = ({item}) => {
  return (
    <View style={style.container}>
      <Image
        source={
          item?.starCastId?.profile
            ? {uri: `${constant.imageURL}${item?.starCastId?.profile}`}
            : image.default
        }
        style={style.image}
      />
      <Text allowFontScaling={false} style={style.name}>
        {item?.starCastId.name}
      </Text>
      {/* <Text allowFontScaling={false} style={style.role}>{`as\n${item?.starCastId?.category}`}</Text> */}
    </View>
  );
};

export default memo(MovieCast);
