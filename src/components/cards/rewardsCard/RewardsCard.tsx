import {View, Text} from 'react-native';
import React, {memo} from 'react';
import {RewardsCardProps} from './rewardsCard.interface';
import {style} from './rewardsCard.style';

const RewardsCard = (props: RewardsCardProps) => {
  return (
    <View style={[style.container, {marginTop: props.index != 0 ? 15 : 0}]}>
      <Text allowFontScaling={false} style={style.text}>
        {props.item?.name}
        {' - '}
        {props.index + 1}
      </Text>
      <View style={style.progressParentContainer}>
        <View
          style={[
            style.progressChildContainer,
            {width: `${(props.item?.points / props.item?.totalPoints) * 100}%`},
          ]}
        />
      </View>
      <View style={style.pointsContainer}>
        <Text allowFontScaling={false} style={style.text}>
          Unlock Reward
        </Text>
        <Text allowFontScaling={false} style={style.text}>
          {props.item?.points}
          {' / '}
          {props.item?.totalPoints} Points
        </Text>
      </View>
    </View>
  );
};

export default memo(RewardsCard);
