import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {color} from '../../../theme';
import {DateCardProps} from './dateCard.interface';
import style from './dateCard.style';

const DateCard: React.FC<DateCardProps> = ({
  item,
  onSelectDate,
  selectedDate,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={style.datePress}
      onPress={() => {
        onSelectDate(item);
      }}>
      <LinearGradient
        colors={
          selectedDate == moment(item).format('YYYY-MM-DD')
            ? color.termsGradient
            : color.buttonTransparentGradient
        }
        start={{x: 0.6, y: 1}}
        end={{x: 0, y: 0}}
        style={[
          style.dateView,
          {
            borderColor:
              selectedDate == moment(item).format('YYYY-MM-DD')
                ? color.inputBackground
                : color.timeBorder,
          },
        ]}>
        <Text allowFontScaling={false} style={style.month}>
          {moment(item).format('ddd')?.toUpperCase()}
        </Text>
        <Text allowFontScaling={false} style={style.date}>
          {moment(item).format('DD')}
        </Text>
        <Text allowFontScaling={false} style={style.month}>
          {moment(item).format('MMM')?.toUpperCase()}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default memo(DateCard);
