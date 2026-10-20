import React, {memo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {color} from '../../theme';
import styles from './radioButton.style';

const RadioButton: React.FC<RadioButtonProps> = ({
  item,
  index,
  selected,
  onItemPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      key={index}
      onPress={onItemPress}
      style={styles.mainContainer}>
      <View
        style={[
          styles.dot,
          {
            borderColor:
              selected !== item.title ? color.white : color.policyYellow,
          },
        ]}>
        {selected === item.title && <View style={styles.selectedDot} />}
      </View>
      <Text style={styles.titleText}>{item?.title}</Text>
    </TouchableOpacity>
  );
};

export default memo(RadioButton);
