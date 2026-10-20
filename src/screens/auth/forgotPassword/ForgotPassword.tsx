import React from 'react';
import {KeyboardAvoidingView, Platform, Text, View} from 'react-native';
import {Button, ImageContainer, Input} from '../../../components';
import svg from '../../../assets/svgIndex';
import forgotPasswordController from './forgotPassword.controller';
import style from './forgotPassword.style';
import {font} from '../../../theme';

const ForgotPassword: React.FC = () => {
  const {setEmail, email, validateForgot, emailError, loading} =
    forgotPasswordController();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : undefined}
      style={style.keyboardAvoid}>
      <ImageContainer
        contentContainerStyle={style.contentContainer}
        headerShow={true}>
        <Text allowFontScaling={false} style={style.headingText}>
          Enter the Registered{' '}
          <Text
            allowFontScaling={false}
            style={{fontFamily: font.poppinsMedium}}>
            Phone No. / Email
          </Text>
        </Text>
        <View style={style.container}>
          <Input
            placeholder="Email"
            value={email}
            setValue={(text: any) => setEmail(text?.trim())}
            leftIcon={svg.Email}
            inputProps={{keyboardType: 'email-address'}}
            inputContainer={style.inputContainer}
            error={emailError}
            maxLength={50}
          />
          <Button
            title="send otp"
            onPress={validateForgot}
            containerStyle={style.button}
            isLoading={loading}
          />
        </View>
      </ImageContainer>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
