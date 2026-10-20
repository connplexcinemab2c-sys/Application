import { View, Text, Modal, TouchableOpacity, Keyboard } from 'react-native';
import React from 'react';
import style from './numberModal.style';
import { ModalProps } from './numberModal.interface';
import { Input, Button } from '../../components';
import { BlurView } from '@react-native-community/blur';
import numberModalController from './numberModal.controller';
import svg from '../../assets/svgIndex';
import { color, font } from '../../theme';
import { CodeField, Cursor } from 'react-native-confirmation-code-field';

const NumberModal: React.FC<ModalProps> = props => {
  const {
    error,
    validation,
    setMobile,
    mobile,
    loading,
    otpVisible,
    otpCode,
    setOtpCode,
    timer,
    refOtp,
    resendCode,
    otpValidation,
    otpError,
    onBack,
    numberData,
  } = numberModalController(props?.visible, props?.onClose);
  return (
    <Modal visible={props.visible} transparent>
      <View style={style.modalView}>
        <TouchableOpacity
          style={style.blur}
          activeOpacity={1}
          onPress={props.onClose}>
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
              <Text allowFontScaling={false} style={style.createAccountText}>
                Add Phone Number
              </Text>
              <Input
                placeholder="Phone No."
                value={mobile?.trim()}
                setValue={(text: any) =>
                  setMobile(text?.replace(/\D/g, '')?.trim())
                }
                leftIcon={svg.Mobile}
                maxLength={10}
                inputProps={{ keyboardType: 'number-pad' }}
                inputContainer={style.inputContainer}
                error={error}
              />
              <Button
                title="Verify"
                onPress={validation}
                mainContainer={style.button}
                isLoading={loading}
              />
            </>
          ) : (
            <>
              <Text allowFontScaling={false} style={style.headingText}>
                Enter the OTP Send to{' '}
                <Text
                  allowFontScaling={false}
                  style={{ fontFamily: font.poppinsMedium }}>
                  {numberData}
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
                  renderCell={({ index, symbol, isFocused }) => (
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
                      RESEND OTP
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <Button
                title="VERIFY"
                onPress={otpValidation}
                mainContainer={style.otpButton}
                isLoading={loading}
              />
              <TouchableOpacity
                style={style.back}
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

export default NumberModal;
