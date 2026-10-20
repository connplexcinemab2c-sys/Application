import React, {memo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NotificationCardProps} from './notificationCard.interface';
import svg from '../../../assets/svgIndex';
import style from './notificationCard.style';

const NotificationCard: React.FC<NotificationCardProps> = ({item, index}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} key={index} style={style.container}>
      <View style={style.icon}>
        {item.type === 'booking' ? (
          <svg.Booking />
        ) : item.type === 'cashback' ? (
          <svg.Cashback />
        ) : item.type === 'reminder' ? (
          <svg.Reminder />
        ) : (
          <svg.Reminder />
        )}
      </View>
      <View style={style.detailContainer}>
        <Text allowFontScaling={false} style={style.title}>
          {item.title}
        </Text>
        <Text allowFontScaling={false} style={style.text}>
          {item.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(NotificationCard);
