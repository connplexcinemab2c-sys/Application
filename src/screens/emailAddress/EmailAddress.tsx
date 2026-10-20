import React, {FC} from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button, CustomStatusBar, Header, Input} from '../../components';
import {color} from '../../theme';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import emailAddressController from '../emailAddress/emailAddress.controller';
import image from '../../assets/imageIndex';
import svg from '../../assets/svgIndex';
import style from './emailAddress.style';

const EmailAddress: FC = () => {
  const {
    loading,
    mobile,
    setMobile,
    error,
    handleValidation,
    isMobile,
    userData,
  } = emailAddressController();

  const {onBack} = commonFunctions();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{flex: 1}}>
        <CustomStatusBar backgroundColor={color.inputBackground} />
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : undefined}
          style={style.keyboardAvoid}>
          <ImageBackground
            style={style.background}
            source={image.authBackground}
            resizeMode="cover">
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={[color.transparentMembership, color.editProfileColor]}
              style={style.background}>
              <SafeAreaView>
                <Header
                  title=""
                  titleContainerStyle={style.titleContainer}
                  containerStyle={style.header}
                  withBackground={false}
                  onBack={onBack}
                  backIcon
                />
                <View style={style.textInputStyle}>
                  {isMobile ? (
                    <Text allowFontScaling={false} style={style.editNumber}>
                      {userData?.mobileNumber?.toString()?.length > 0
                        ? 'Edit Phone Number'
                        : 'Add Phone Number'}
                    </Text>
                  ) : (
                    <Text allowFontScaling={false} style={style.editNumber}>
                      {userData?.email?.length > 0
                        ? 'Edit Email Address'
                        : 'Add Email Address'}
                    </Text>
                  )}
                  <Input
                    placeholder={isMobile ? 'Phone No.' : 'Email ID'}
                    value={mobile?.trim()}
                    maxLength={isMobile ? 10 : 50}
                    setValue={setMobile}
                    leftIcon={isMobile ? svg.Mobile : svg.Email}
                    inputProps={{
                      keyboardType: isMobile ? 'number-pad' : 'email-address',
                    }}
                    error={error}
                    inputContainer={style.inputContainer}
                  />
                </View>
                <Button
                  title="Verify"
                  onPress={handleValidation}
                  isLoading={loading}
                  mainContainer={style.button}
                />
              </SafeAreaView>
            </LinearGradient>
          </ImageBackground>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EmailAddress;
