import React from 'react';
import {Keyboard, Text, TouchableOpacity, View} from 'react-native';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import {Button, ImageContainer} from '../../../components';
import {font} from '../../../theme';
import signupOtpController from './signupOtp.controller';
import style from './signupOtp.style';

const SignupOtp: React.FC = () => {
  const {
    otpCode,
    setOtpCode,
    timer,
    refOtp,
    loading,
    resendCode,
    validation,
    mobileNumber,
    error,
    isNumber,
  } = signupOtpController();

  return (
    <ImageContainer
      contentContainerStyle={style.contentContainer}
      isTransparent
      headerShow={true}>
      <Text allowFontScaling={false} style={style.headingText}>
        Enter the OTP Send to{' '}
        <Text allowFontScaling={false} style={{fontFamily: font.poppinsMedium}}>
          {!isNumber ? `your email` : `xxxxxx${mobileNumber?.slice(7)}`}
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
          onSubmitEditing={() => Keyboard.dismiss()}
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
        {error && (
          <Text allowFontScaling={false} style={style.error}>
            {error}
          </Text>
        )}
      </View>
      {timer != 0 ? (
        <Text allowFontScaling={false} style={style.resendTextStyles}>
          Expire OTP in 00:{timer < 10 ? '0' + timer : timer} sec
        </Text>
      ) : (
        <View style={style.signUpContainer}>
          <Text allowFontScaling={false} style={style.noAccount}>
            Didn't receive the OTP?{' '}
          </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={resendCode}>
            <Text allowFontScaling={false} style={style.signupText}>
              RESEND OTP
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Button
        title="VERIFY"
        onPress={validation}
        mainContainer={style.button}
        isLoading={loading}
      />
    </ImageContainer>
  );
};

export default SignupOtp;
