import React, {memo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {color} from '../../../theme';
import {MoviesPerCinemaCardProps} from './moviesPerCinemaCard.interface';
import style from './moviesPerCinemaCard.style';

const MoviesPerCinemaCard: React.FC<MoviesPerCinemaCardProps> = ({
  item,
  onSelectTime,
  selectedTime,
  movieId,
}) => {
  let name = item?.movieDetails?.name?.toUpperCase();
  let dimension = '2D';
  if (name?.includes('3D')) {
    dimension = '3D';
  }

  return (
    item?.shows?.length && (
      <View style={style.container}>
        <Text allowFontScaling={false} style={style.movieTitle}>
          {item?.movieDetails?.name}
        </Text>
        <Text allowFontScaling={false} style={style.language}>
          {item?.movieDetails?.languages} | {item?.movieDetails?.movieType}
        </Text>
        {/* <Text allowFontScaling={false} style={style.type}>
          {item?.movieDetails?.category && item?.movieDetails?.category + ' |'}{' '}
          {item?.movieDetails?.censorRating}
        </Text> */}
        {item?.shows?.length && (
          <View style={style.timeContainer}>
            {item?.shows?.map((value: any) => {
              if (moment(new Date()).isBefore(moment(value?.sessionRealShow))) {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={style.timingContainer}
                    onPress={() => {
                      onSelectTime && onSelectTime(value, item?.movieDetails);
                    }}
                    key={value._id}>
                    <LinearGradient
                      colors={
                        selectedTime === value?.sessionRealShow &&
                        movieId === item?.movieDetails?._id
                          ? color.buttonGradient
                          : color.buttonTransparentGradient
                      }
                      start={{x: 0.6, y: 1}}
                      end={{x: 0, y: 0}}
                      style={[
                        style.timeView,
                        {
                          borderColor:
                            selectedTime === value?.sessionRealShow &&
                            movieId === item?.movieDetails?._id
                              ? color.cinemaBorder
                              : color.timeBorder,
                          paddingHorizontal:
                            selectedTime === value?.sessionRealShow &&
                            movieId === item?.movieDetails?._id
                              ? 16
                              : 15,
                          paddingVertical:
                            selectedTime === value?.sessionRealShow &&
                            movieId === item?.movieDetails?._id
                              ? 6
                              : 5,
                        },
                      ]}>
                      <Text allowFontScaling={false} style={style.time}>
                        {moment(value?.sessionRealShow)?.format('hh:mm A')}
                      </Text>
                      {value?.additionalData && (
                        <Text
                          allowFontScaling={false}
                          style={style.additionTime}>
                          {value?.additionalData}
                        </Text>
                      )}
                    </LinearGradient>
                    {value?.sessionAdditionalData && (
                      <Text allowFontScaling={false} style={style.seatType}>
                        {value?.sessionAdditionalData?.match(
                          /SCREENATTRIBUTES=([^|]+)/,
                        )?.[1] || ''}
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        )}
      </View>
    )
  );
};

export default memo(MoviesPerCinemaCard);
