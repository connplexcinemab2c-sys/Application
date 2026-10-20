import React, {memo} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {color} from '../../theme';
import inputController from './input.controller';
import {InputProps} from './input.interface';
import SvgIndex from '../../assets/svgIndex';
import style from './input.style';

const Input: React.FC<InputProps> = props => {
  const {handleShow, isVisible} = inputController(props);
  return (
    <View style={[style.mainContainer, props.inputMainContainer]}>
      {props.lable && (
        <Text
          allowFontScaling={false}
          style={[style.inputTextStyle, props?.inputLabelStyle]}>
          {props.lable}
        </Text>
      )}
      <View style={[style.container, props.inputContainer]}>
        {props.leftIcon && (
          <View style={[style.leftIcon, props.leftIconStyle]}>
            <props.leftIcon />
          </View>
        )}
        <TextInput
          allowFontScaling={false}
          value={props.value}
          onChangeText={props.setValue}
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderColor}
          style={[style.textInput, props.inputStyle]}
          maxLength={props.maxLength}
          keyboardType={props.keyboardType}
          multiline={props.multiline}
          numberOfLines={props.numberOfLines}
          editable={props.editable}
          {...props.inputProps}
        />
        {props.rigthFilterIcon && (
          <TouchableOpacity
            style={[style.rightFilterIcon, props.rigthFilterIconStyle]}
            onPress={props.onPressRightFilterIcon}>
            <SvgIndex.Close />
          </TouchableOpacity>
        )}
      </View>
      {props.error && (
        <Text allowFontScaling={false} style={style.error}>
          {props.error}
        </Text>
      )}
    </View>
  );
};

Input.defaultProps = {
  placeholderColor: color.placeholder,
} as Partial<InputProps>;

export default memo(Input);
