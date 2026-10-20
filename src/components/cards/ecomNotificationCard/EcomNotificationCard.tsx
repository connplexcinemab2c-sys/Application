import {View, Text, Pressable} from 'react-native';
import React from 'react';
import styles from './ecomNotificationCard.style';
import SvgIndex from '../../../assets/svgIndex';
import moment from 'moment';

const EcomNotificationCard: React.FC<eComNotificationCardProps> = ({
  index,
  item,
  onPress,
  onNotification,
}) => {
  return (
    <Pressable style={styles.container} key={index} onPress={onNotification}>
      <SvgIndex.Coin />
      <View style={styles.contents}>
        <View style={[styles.rowContainer, {marginBottom: 3}]}>
          <Text style={styles.title}>{item?.message}</Text>
          <Text style={styles.dateLabel}>
            {moment(item?.createdAt).format('hh:mm A')}
          </Text>
        </View>
        {/* <View style={styles.rowContainer}>
          <Text style={styles.description}>{item?.description}</Text>
          {item?.isUnread && <View style={styles.dot} />}
        </View> */}
      </View>
    </Pressable>
  );
};

export default EcomNotificationCard;
