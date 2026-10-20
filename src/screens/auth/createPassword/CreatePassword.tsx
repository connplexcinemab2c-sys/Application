import React from 'react';
import {KeyboardAvoidingView, Platform, Text, View} from 'react-native';
import {Button, ImageContainer, Input} from '../../../components';
import svg from '../../../assets/svgIndex';
import createPasswordController from './createPassword.controller';
import style from './createPassword.style';

const CreatePassword: React.FC = () => {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passwordError,
    loading,
    confirmPasswordError,
    handleValidation,
  } = createPasswordController();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : undefined}
      style={style.container}>
      <ImageContainer
        contentContainerStyle={style.contentContainer}
        headerShow={true}>
        <Text allowFontScaling={false} style={style.headingText}>
          Enter Your New Password
        </Text>
        <View style={style.mainViewStyle}>
          <Input
            placeholder="Password"
            value={password}
            setValue={setPassword}
            leftIcon={svg.Key}
            inputContainer={style.inputContainer}
            error={passwordError}
          />
          <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            leftIcon={svg.Key}
            inputContainer={style.inputContainer}
            error={confirmPasswordError}
          />
          <View style={style.container}>
            <Button
              title="RESET PASSWORD"
              onPress={handleValidation}
              containerStyle={style.button}
              isLoading={loading}
            />
          </View>
        </View>
      </ImageContainer>
    </KeyboardAvoidingView>
  );
};

export default CreatePassword;
