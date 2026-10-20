import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import React from 'react';
import style from './loginModal.style';
import {ModalProps} from './loginModal.interface';
import {Input, Button} from '../../components';
import {BlurView} from '@react-native-community/blur';
import loginModalController from './loginModal.controller';
import svg from '../../assets/svgIndex';
import {color, font} from '../../theme';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import {checkMobileNumber} from '../../utility/validation/stringValidation';

const LoginModal: React.FC<ModalProps> = props => {
  const {
    error,
    validation,
    setEmail,
    email,
    loading,
    onGoogle,
    socialSpinner,
    onApple,
    onFacebook,
    otpVisible,
    otpCode,
    setOtpCode,
    timer,
    refOtp,
    resendCode,
    otpValidation,
    otpError,
    onBack,
    isLoad,
    match,
  } = loginModalController(props?.visible, props?.onClose);
  return (
    <Modal visible={props.visible} transparent>
      {/* <CustomStatusBar backgroundColor={color.inputBackground} /> */}
      <View style={style.modalView}>
        {socialSpinner && (
          <View style={style.indicator}>
            <ActivityIndicator size="large" color={color.white} />
          </View>
        )}
        <TouchableOpacity
          style={style.blur}
          disabled={isLoad}
          activeOpacity={1}
          onPress={() => {
            if (!otpVisible) {
              props.onClose();
            }
          }}>
          <BlurView
            style={style.blur}
            blurType="light"
            blurAmount={2}
            reducedTransparencyFallbackColor={color.lightShade}
          />
        </TouchableOpacity>
        <View style={style.warningContainer}>
          {!otpVisible ? (
            <>
              <Text allowFontScaling={false} style={style.textHeading}>
                Sign In
              </Text>
              <Text allowFontScaling={false} style={style.createAccountText}>
                {/* CREATE YOUR ACCOUNT */}
                Enter your phone number OR email to sign in
              </Text>
              <Input
                placeholder="Phone number or email"
                value={email}
                setValue={(text: any) => setEmail(text?.trim())}
                leftIcon={svg.NumberIcon}
                maxLength={match ? 10 : 50}
                inputProps={{keyboardType: 'email-address'}}
                inputContainer={style.inputContainer}
                error={error}
              />
              <Button
                loginLabel="Get OTP"
                onPress={validation}
                mainContainer={style.button}
                isLoading={loading}
              />
              <View style={style.orContinueWithContainer}>
                <View style={style.dividerLine}></View>
                <Text allowFontScaling={false} style={style.login}>
                  Or Sign Up With
                </Text>
                <View style={style.dividerLine}></View>
              </View>
              <View style={style.iconContainer}>
                {/* <TouchableOpacity
              activeOpacity={0.7}
              style={style.logoTouchable}
              onPress={onFacebook}>
              <svg.FacebookLogo />
            </TouchableOpacity> */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={style.googleLogo}
                  onPress={onGoogle}>
                  <svg.GoogleLogo />
                </TouchableOpacity>
                {Platform.OS == 'ios' && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={style.logoTouchable}
                    onPress={onApple}>
                    <svg.AppleLogo />
                  </TouchableOpacity>
                )}
              </View>
            </>
          ) : (
            <>
              <Text allowFontScaling={false} style={style.textHeading}>
                Verify OTP
              </Text>
              <Text allowFontScaling={false} style={style.headingText}>
                Enter the OTP Send to{' '}
                <Text
                  allowFontScaling={false}
                  style={{fontFamily: font.poppinsMedium}}>
                  {!checkMobileNumber(email?.toString())
                    ? `your email`
                    : `xxxxxx${email?.slice(7)}`}
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
                    <View key={index} style={style.otpView}>
                      <Text
                        allowFontScaling={false}
                        key={index}
                        style={[style.cell, isFocused && style.focusCell]}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </Text>
                    </View>
                  )}
                />
                {otpError && (
                  <Text allowFontScaling={false} style={style.error}>
                    {otpError}
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
                      RESEND
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <Button
                loginLabel="Verify OTP"
                onPress={otpValidation}
                mainContainer={style.otpButton}
                isLoading={loading}
              />
              <TouchableOpacity
                style={style.backParent}
                activeOpacity={0.5}
                disabled={loading}
                onPress={onBack}>
                <Text allowFontScaling={false} style={style.backText}>
                  Back
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default LoginModal;
