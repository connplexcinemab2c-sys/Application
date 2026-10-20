import React, {memo} from 'react';
import {StatusBar, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {color} from '../../theme';
import {StatusBarProps} from './customStatusBar.interface';

const CustomStatusBar: React.FC<StatusBarProps> = props => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        {
          height: insets.top,
          backgroundColor: props?.backgroundColor || color.white,
        },
        props?.containerStyle,
      ]}>
      <StatusBar
        animated={true}
        backgroundColor={props?.backgroundColor || color.white}
        barStyle={props?.barStyle || 'light-content'}
        translucent={props.transparent}
        hidden={props.hidden}
        {...props}
      />
    </View>
  );
};

export default memo(CustomStatusBar);
