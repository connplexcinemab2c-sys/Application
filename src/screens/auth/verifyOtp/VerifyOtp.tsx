import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, ImageContainer} from '../../../components';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import verifyOtpController from './verifyOtp.controller';
import {font} from '../../../theme';
import style from './verifyOtp.style';

const VerifyOtp: React.FC = () => {
  const {
    otp,
    mobileOtp,
    setMobileOtp,
    otpCode,
    setOtpCode,
    timer,
    setTimer,
    refOtp,
    loading,
    resendCode,
    validationVerifyOtp,
  } = verifyOtpController();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : undefined}
      style={style.keyboardAvoid}>
      <ImageContainer
        contentContainerStyle={style.contentContainer}
        headerShow={true}>
        <Text allowFontScaling={false} style={style.headingText}>
          Enter the OTP Send to{' '}
          <Text
            allowFontScaling={false}
            style={{fontFamily: font.poppinsMedium}}>
            xxxxxxx
          </Text>
        </Text>
        <View style={style.otpContainer}>
          <CodeField
            ref={refOtp}
            value={otpCode}
            onChangeText={setOtpCode}
            cellCount={4}
            rootStyle={style.otpInputContainer}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <View key={index} style={[style.otpView]}>
                <Text
                  allowFontScaling={false}
                  key={index}
                  style={[style.cell, isFocused && style.focusCell]}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
        </View>
        <TouchableOpacity style={style.signUpContainer} activeOpacity={0.7}>
          <Text allowFontScaling={false} style={style.noAccount}>
            Didn't receive the OTP?{' '}
          </Text>
          {timer != 0 ? (
            <View>
              <Text allowFontScaling={false} style={style.resendTextStyles}>
                00:{timer < 10 ? '0' + timer : timer}
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setTimer(59);
                resendCode();
              }}>
              <Text allowFontScaling={false} style={style.signupText}>
                RESEND OTP
              </Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        <Button
          title="VERIFY"
          onPress={validationVerifyOtp}
          containerStyle={style.button}
          isLoading={loading}
        />
      </ImageContainer>
    </KeyboardAvoidingView>
  );
};

export default VerifyOtp;
