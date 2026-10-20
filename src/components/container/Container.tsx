import React, {memo} from 'react';
import {ScrollView, View} from 'react-native';
import {color} from '../../theme';
import {ContainerProps} from './container.interface';
import CustomStatusbar from '../customStatusBar/CustomStatusBar';
import Header from '../header/Header';
import style from './container.style';

const Container: React.FC<ContainerProps> = ({
  hideHeader = false,
  children,
  containerStyle,
  isHeaderWithoutScroll,
  scrollContentContainerStyle,
  scrollViewProps,
  isStatusbar = true,
  ...restProps
}) => {
  return (
    <View style={[style.container, containerStyle]}>
      {isStatusbar && (
        <CustomStatusbar
          backgroundColor={color.inputBackground}
          {...restProps}
        />
      )}
      {isHeaderWithoutScroll && <Header {...restProps} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        overScrollMode="never"
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}
        contentContainerStyle={[{flexGrow: 1}, scrollContentContainerStyle]}
        {...scrollViewProps}>
        {!hideHeader && !isHeaderWithoutScroll && <Header {...restProps} />}
        {children}
      </ScrollView>
    </View>
  );
};

export default memo(Container);
