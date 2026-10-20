import React, {memo} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {color} from '../../theme';
import {HeaderProps} from './header.interface';
import svg from '../../assets/svgIndex';
import style from './header.style';

const Header: React.FC<HeaderProps> = props => {
  return (
    <View style={[style.mainContainer, props.containerStyle]}>
      {props.backIcon && (
        <View style={props.backContainerStyle}>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={props.isDisabled}
            onPress={props.onBack}
            style={style.back}>
            <svg.Back />
          </TouchableOpacity>
        </View>
      )}
      {props.title && (
        <View style={[style.titleContainerStyle, props.titleContainerStyle]}>
          <Text
            allowFontScaling={false}
            style={[style.title, props.titleStyle]}>
            {props.title}
          </Text>
        </View>
      )}
      {props.rightIcon && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={props.onRightIcon}
          style={[
            style.rightIcon,
            {
              backgroundColor: props.withBackground
                ? color.transparent
                : undefined,
            },
            props.rightIconContainer,
          ]}>
          <props.rightIcon />
        </TouchableOpacity>
      )}
      {props.secondRightIcon && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={props.onSecondRightIcon}
          style={[
            style.rightIcon,
            {
              backgroundColor: props.withBackground
                ? color.transparent
                : undefined,
              marginLeft: 9,
            },
          ]}>
          <props.secondRightIcon />
        </TouchableOpacity>
      )}
      {props.rightText && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={style.rightTextContainer}
          onPress={props.onRightText}>
          <Text allowFontScaling={false} style={style.rightText}>
            {props.rightText}
          </Text>
        </TouchableOpacity>
      )}
      {props.skip && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={style.skipContainer}
          onPress={props.onSkip}>
          <Text allowFontScaling={false} style={style.skip}>
            Skip
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(Header);

Header.defaultProps = {
  withBackground: true,
} as Partial<HeaderProps>;
