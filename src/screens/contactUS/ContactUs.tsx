import React, { FC, useRef } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import imageIndex from '../../assets/imageIndex';
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../../theme';
import style from './contactUs.style';
import { Header, Input, Button, CustomStatusBar } from '../../components';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import contactUsController from './contactUs.controller';
import svgIndex from '../../assets/svgIndex';

const ContactUs: FC = () => {
  const { onBack } = commonFunctions();
  const scrollRef = useRef<any>();
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    mobileNumber,
    setMobileNumber,
    message,
    setMessage,
    loading,
    error,
    validation,
  } = contactUsController();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={style.background}>
        <CustomStatusBar backgroundColor={color.inputBackground} />
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : undefined}
          style={style.background}>
          <ImageBackground
            style={style.background}
            source={imageIndex.authBackground}
            resizeMode="cover">
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={[color.transparentMembership, '#291F08']}
              style={style.background}>
              <SafeAreaView>
                <Header
                  title="Contact Us"
                  titleContainerStyle={style.background}
                  containerStyle={style.header}
                  withBackground={false}
                  onBack={onBack}
                  backIcon
                />
                <ScrollView
                  ref={scrollRef}
                  contentContainerStyle={style.scrollView}
                  showsVerticalScrollIndicator={false}
                  // keyboardShouldPersistTaps={'always'}
                  style={style.inputContainerStyle}>
                  <Input
                    placeholder="First Name"
                    value={firstName}
                    setValue={text =>
                      setFirstName(
                        text
                          ?.replace(/^\s+/, '')
                          .replace(/\s\s+/g, ' ')
                          ?.trimStart(),
                      )
                    }
                    leftIcon={svgIndex.UserFilled}
                    inputContainer={style.inputContainer}
                    error={error.firstName}
                    maxLength={25}
                  />
                  <Input
                    placeholder="Last Name"
                    value={lastName}
                    setValue={text =>
                      setLastName(
                        text
                          ?.replace(/^\s+/, '')
                          .replace(/\s\s+/g, ' ')
                          ?.trimStart(),
                      )
                    }
                    leftIcon={svgIndex.UserFilled}
                    inputContainer={style.inputContainer}
                    error={error.lastName}
                    maxLength={25}
                  />
                  <Input
                    placeholder="Email"
                    value={email}
                    setValue={text => setEmail(text?.trim())}
                    inputContainer={style.inputContainer}
                    leftIcon={svgIndex.Email}
                    keyboardType="email-address"
                    error={error.email}
                    maxLength={50}
                  />
                  <Input
                    placeholder="Phone Number"
                    value={mobileNumber}
                    setValue={text =>
                      setMobileNumber(text?.replace(/\D/g, '')?.trim())
                    }
                    leftIcon={svgIndex.Mobile}
                    inputContainer={style.inputContainer}
                    keyboardType="phone-pad"
                    error={error.mobileNumber}
                    maxLength={10}
                  />
                  <Input
                    placeholder="Message"
                    value={message}
                    setValue={text => setMessage(text?.trimStart())}
                    multiline
                    inputContainer={style.multiLineInput}
                    error={error.message}
                    maxLength={300}
                    inputProps={{
                      textAlignVertical: 'top',
                      onFocus: () => {
                        scrollRef.current?.scrollToEnd({ animated: true });
                      },
                    }}
                  />
                  <Button
                    title="Submit"
                    onPress={validation}
                    mainContainer={style.button}
                    isLoading={loading}
                  />
                </ScrollView>
              </SafeAreaView>
            </LinearGradient>
          </ImageBackground>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ContactUs;
