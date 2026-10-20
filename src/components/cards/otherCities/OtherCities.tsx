import React, {memo} from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {OtherCitiesProps} from './otherCities.interface';
import style from './otherCities.style';
import {color} from '../../../theme';
import {SvgUri} from 'react-native-svg';
import constant from '../../../services/config/constant';
import imageIndex from '../../../assets/imageIndex';
import {useAppSelector} from '../../../services/config/redux/useReduxHooks';

const getImageType = (url: any) => {
  const format = url?.split(/[#?]/)[0]?.split('.')?.pop()?.trim();
  return ['svg', 'png', 'jpg'].includes(format) ? format : null;
};

const OtherCities: React.FC<OtherCitiesProps> = ({item, index, onPress}) => {
  const {cityData} = useAppSelector(state => state.UserReducer);
  const imageType = getImageType(item?.image);
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      activeOpacity={0.7}
      style={style.container}>
      {imageType === 'svg' ? (
        <SvgUri
          style={style.svgStyle}
          width="30"
          height="30"
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
      <Text
        allowFontScaling={false}
        style={[
          style.name,
          {
            color:
              cityData?.region?.toUpperCase() == item?.region?.toUpperCase()
                ? color.movieName
                : color.white,
          },
        ]}>
        {item?.region}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(OtherCities);
