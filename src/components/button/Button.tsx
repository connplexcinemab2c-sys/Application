import React, {memo} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ButtonProps} from './button.interface';
import {color} from '../../theme';
import style from './button.style';
import {capitalizeFirstLetter} from '../../utility/validation/stringValidation';

const Button: React.FC<ButtonProps> = props => {
  return (
    <TouchableOpacity
      style={[style.mainContainer, props.mainContainer]}
      disabled={props.disabled || props.isLoading}
      activeOpacity={0.7}
      onPress={props.onPress}
      {...props.buttonProps}>
      <LinearGradient
        colors={props.gradient}
        // start={{x: 1, y: 0.7}}
        // end={{x: 0.7, y: 1}}
        useAngle={props?.useAngle}
        angle={props?.angle}
        style={[
          style.linearGradient,
          {opacity: props.disabled || props.isLoading ? 0.7 : 1},
          props.containerStyle,
        ]}>
        <View style={[style.container, props.buttonTouchable]}>
          {props.isLoading ? (
            <ActivityIndicator
              size="small"
              color={color.white}
              {...props.indicatorProps}
            />
          ) : (
            <>
              {props.leftIcon && (
                <View style={style.leftIcon}>
                  <props.leftIcon />
                </View>
              )}
              <Text
                allowFontScaling={false}
                style={[style.title, props.titleStyle]}>
                {props.loginLabel
                  ? props.loginLabel
                  : capitalizeFirstLetter(props.title)}
                <Text allowFontScaling={false} style={style.nestedText}>
                  {props.nestedText && capitalizeFirstLetter(props.nestedText)}
                </Text>
              </Text>
            </>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default memo(Button);

Button.defaultProps = {
  gradient: color.tempButtonGradient,
  // gradient: color.buttonGradient,
};
