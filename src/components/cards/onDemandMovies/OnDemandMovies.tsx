import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import commonFunctions from '../../../utility/functions/commonFunctions/commonFunctions';
import constant from '../../../services/config/constant';
import image from '../../../assets/imageIndex';
import {OnDemandMoviesProps} from './onDemandMovies.interface';
import svg from '../../../assets/svgIndex';
import style from './onDemandMovies.style';

const OnDemandMovies: React.FC<OnDemandMoviesProps> = ({
  item,
  onPress,
  type,
}) => {
  const {formatDuration, displayDuration} = commonFunctions();

  const categoriesString = item?.category;
  let formattedCategories = '';
  if (categoriesString) {
    const categoriesArray = categoriesString
      .split(',')
      .map((category: any) => category.trim());
    formattedCategories = categoriesArray.join(', ');
  }

  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      activeOpacity={0.7}
      style={style.mainContainer}>
      <Image
        source={
          item?.poster
            ? {uri: `${constant.imageURL}${item?.poster}`, cache: 'force-cache'}
            : image.noImageAvailable
        }
        style={style.poster}
      />
      <View style={style.detailsContainer}>
        <Text allowFontScaling={false} style={style.title} numberOfLines={2}>
          {type == 'cinema' ? item?.displayName : item?.name}
        </Text>
        {type == 'cinema' ? (
          <Text
            allowFontScaling={false}
            style={style.address}
            numberOfLines={3}>
            {item?.address}
          </Text>
        ) : (
          <>
            <View style={style.timeContainer}>
              <svg.Clock />
              <Text allowFontScaling={false} style={style.time}>
                {item?.duration
                  ? displayDuration(parseFloat(item?.duration))
                  : '0 hr'}
              </Text>
            </View>
            <Text allowFontScaling={false} style={style.type}>
              {`${item?.censorRating}${
                formattedCategories != '' ? ' | ' + formattedCategories : ''
              }${item?.languages ? ' | ' + item?.languages : ''}`}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(OnDemandMovies);
