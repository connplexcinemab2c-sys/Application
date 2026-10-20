import React, {memo} from 'react';
import {View} from 'react-native';
import {BorderProps} from './border.interface';
import style from './border.style';

const Border: React.FC<BorderProps> = ({borderStyle}) => {
  return <View style={[borderStyle, style.borderStyle]} />;
};

export default memo(Border);
