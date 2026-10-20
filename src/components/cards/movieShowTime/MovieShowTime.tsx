import React, {memo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {color} from '../../../theme';
import {MovieShowTimeProps} from './movieShowTime.interface';
import svg from '../../../assets/svgIndex';
import style from './movieShowTime.style';

const MovieShowTime: React.FC<MovieShowTimeProps> = ({
  item,
  index,
  showTime = true,
  selectedTime,
  onSelectTime,
  theatreId,
  onPress,
  containerStyle,
}) => {
  return (
    (item?.timings?.length || !showTime) && (
      <View style={[style.theaterStyle, containerStyle]}>
        <View style={style.theatreTitle}>
          <Text allowFontScaling={false} style={style.title}>
            {showTime ? item?.cinemaDetails?.displayName : item?.displayName}
          </Text>
          <TouchableOpacity
            style={style.infoTouchable}
            activeOpacity={0.7}
            onPress={() => onPress(showTime ? item?.cinemaDetails : item)}>
            <svg.AboutUs />
            <Text allowFontScaling={false} style={style.info}>
              info
            </Text>
          </TouchableOpacity>
        </View>
        <View style={style.addressContainer}>
          <View style={style.location}>
            <svg.TheatreLocation />
          </View>
          <Text allowFontScaling={false} style={style.address}>
            {showTime ? item?.cinemaDetails?.address : item?.address}
          </Text>
        </View>
        {showTime && (
          <View style={style.timeContainer}>
            {item?.timings?.map((value: any, id: number) => {
              if (moment(new Date()).isBefore(moment(value?.startTime))) {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={style.timingContainer}
                    onPress={() => {
                      onSelectTime &&
                        onSelectTime(value, item?.cinemaDetails?._id, index);
                    }}
                    key={id}>
                    <LinearGradient
                      colors={
                        selectedTime === value?.startTime &&
                        theatreId === item?.cinemaDetails?._id
                          ? color.buttonGradient
                          : color.buttonTransparentGradient
                      }
                      start={{x: 0.6, y: 1}}
                      end={{x: 0, y: 0}}
                      style={[
                        style.timeView,
                        {
                          borderColor:
                            selectedTime === value?.startTime &&
                            theatreId === item?.cinemaDetails?._id
                              ? color.cinemaBorder
                              : color.timeBorder,
                          paddingHorizontal:
                            selectedTime === value?.startTime &&
                            theatreId === item?.cinemaDetails?._id
                              ? 16
                              : 15,
                          paddingVertical:
                            selectedTime === value?.startTime &&
                            theatreId === item?.cinemaDetails?._id
                              ? 6
                              : 5,
                        },
                      ]}>
                      <Text allowFontScaling={false} style={style.time}>
                        {moment(value?.startTime)?.format('hh:mm A')}
                      </Text>
                      {value?.additionalData && (
                        <Text
                          allowFontScaling={false}
                          style={style.additionTime}>
                          {value?.additionalData}
                        </Text>
                      )}
                    </LinearGradient>
                    {value?.aData && (
                      <Text allowFontScaling={false} style={style.seatType}>
                        {value?.aData?.match(/SCREENATTRIBUTES=([^|]+)/)?.[1] ||
                          ''}
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

export default memo(MovieShowTime);
