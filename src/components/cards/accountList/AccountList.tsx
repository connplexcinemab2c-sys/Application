import React, {memo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {AccountListProps} from './accountList.interface';
import Border from '../../border/Border';
import svg from '../../../assets/svgIndex';
import style from './accountList.style';

const AccountList: React.FC<AccountListProps> = ({item, onClick}) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={style.mainContainer}
        onPress={onClick}>
        <View style={style.icon}>
          <item.icon />
        </View>
        <Text allowFontScaling={false} style={style.title}>
          {item.title}
        </Text>
        <svg.RightArrow />
      </TouchableOpacity>
      {item.id === 2 && <Border borderStyle={style.border} />}
    </View>
  );
};

export default memo(AccountList);
