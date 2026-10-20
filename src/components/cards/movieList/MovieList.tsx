import React, {memo} from 'react';
import {
  ImageBackground,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import image from '../../../assets/imageIndex';
import svg from '../../../assets/svgIndex';
import constant from '../../../services/config/constant';
import {MovieListProps} from './movieList.interface';
import style from './movieList.style';

const MovieList: React.FC<MovieListProps> = ({
  item,
  onPress,
  containerstyle,
  index,
}) => {
  const formatNumber = (value: number) => {
    if (value == 0) {
      return '5';
    }
    if (!Number.isInteger(value)) {
      return value?.toFixed(1);
    }
    return value?.toString();
  };

  const compactNumberFormat = (number: number) => {
    if (number < 1000) {
      return number.toString();
    }
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixNum = Math.floor(Math.log10(number) / 3);
    let shortValue = number / Math.pow(1000, suffixNum);
    return (
      shortValue.toFixed(shortValue % 1 !== 0 ? 1 : 0) + suffixes[suffixNum]
    );
  };

  const likeCount =
    item?.totalLikes < item?.likes
      ? item?.likes + item?.totalLikes
      : item?.totalLikes;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[style.container, containerstyle]}
      onPress={() => onPress(item)}
      key={index}>
      <ImageBackground
        source={
          item?.poster
            ? {uri: `${constant.imageURL}${item?.poster}`}
            : image?.noImageAvailable
        }
        borderTopLeftRadius={7}
        borderTopRightRadius={7}
        resizeMode="cover"
        style={style.image}>
        <View style={style.likesContainer}>
          {likeCount > 0 ? <svg.Likes /> : <svg.Unlike />}
          <Text allowFontScaling={false} style={style.likes}>
            {Platform.OS == 'android'
              ? Intl.NumberFormat('en-US', {
                  notation: 'compact',
                  maximumFractionDigits: 1,
                }).format(likeCount)
              : compactNumberFormat(likeCount)}
          </Text>
          <svg.Star />
          <Text allowFontScaling={false} style={style.totalRatings}>
            <Text allowFontScaling={false} style={style.userRating}>
              {item?.averageRating > 5
                ? formatNumber(item?.rating)
                : formatNumber(item?.averageRating)}
            </Text>
            /5
          </Text>
        </View>
      </ImageBackground>
      <Text allowFontScaling={false} style={style.title} numberOfLines={2}>
        {item?.name?.toUpperCase()}
      </Text>
      {/* <Text allowFontScaling={false} style={style.details}>{item?.category}</Text> */}
    </TouchableOpacity>
  );
};

export default memo(MovieList);
