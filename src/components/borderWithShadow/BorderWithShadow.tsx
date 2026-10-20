import React, {memo} from 'react';
import {View} from 'react-native';
import style from './borderWithShadow.style';
import {StyleProp, ViewStyle} from 'react-native/types';

interface BorderProps {
  borderStyle?: StyleProp<ViewStyle>;
}

const BorderWithShadow: React.FC<BorderProps> = props => {
  return <View style={[style.border, props.borderStyle]} />;
};

export default memo(BorderWithShadow);
