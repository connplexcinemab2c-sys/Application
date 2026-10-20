import React, {FC, useRef} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Header, Input} from '../../components';
import {color} from '../../theme';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import contactUsController from './applyFranchise.controller';
import image from '../../assets/imageIndex';
import svg from '../../assets/svgIndex';
import style from './applyFranchise.style';

const ApplyFranchise: FC = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    mobileNumber,
    setMobileNumber,
    state,
    setState,
    cityData,
    jobTitle,
    setJobTitle,
    company,
    setCityData,
    setCompany,
    loading,
    error,
    handleValidation,
    checked,
    onCheck,
  } = contactUsController();
  const {onBack} = commonFunctions();
  const scrollRef = useRef<any>();

  return (
    <View style={{flex: 1}}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        style={style.background}>
        <ImageBackground
          style={style.background}
          source={image.authBackground}
          resizeMode="cover">
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={[color.transparentMembership, '#291F08']}
            style={style.background}>
            <SafeAreaView>
              <Header
                title="Apply For Franchise"
                titleContainerStyle={style.background}
                containerStyle={style.header}
                withBackground={false}
                onBack={onBack}
                backIcon
              />
              <ScrollView
                ref={scrollRef}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                contentContainerStyle={style.scrollStyle}
                // style={style.inputContainerStyle}
                // ref={scrollRef}
                // showsVerticalScrollIndicator={false}
                // keyboardShouldPersistTaps={true}
                // contentContainerStyle={style.scrollStyle}
                // style={style.inputContainerStyle}
              >
                <View style={style.inputContainerStyle}>
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
                    leftIcon={svg.UserFilled}
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
                    leftIcon={svg.UserFilled}
                    error={error.lastName}
                    maxLength={25}
                  />
                  <Input
                    placeholder="Email"
                    value={email}
                    setValue={text => setEmail(text?.trim())}
                    leftIcon={svg.Email}
                    keyboardType="email-address"
                    error={error.email}
                    maxLength={50}
                  />
                  <Input
                    placeholder="Phone Number"
                    value={mobileNumber}
                    leftIcon={svg.Mobile}
                    setValue={text =>
                      setMobileNumber(text?.replace(/\D/g, '')?.trim())
                    }
                    keyboardType="phone-pad"
                    error={error.mobileNumber}
                    maxLength={10}
                  />
                  <Input
                    placeholder="State"
                    value={state}
                    setValue={text =>
                      setState(
                        text
                          ?.replace(/^\s+/, '')
                          .replace(/\s\s+/g, ' ')
                          ?.trimStart(),
                      )
                    }
                    leftIcon={svg.State}
                    error={error.state}
                    maxLength={25}
                  />
                  <Input
                    placeholder="City"
                    value={cityData}
                    setValue={text =>
                      setCityData(
                        text
                          ?.replace(/^\s+/, '')
                          .replace(/\s\s+/g, ' ')
                          ?.trimStart(),
                      )
                    }
                    leftIcon={svg.City}
                    error={error.cityData}
                    maxLength={30}
                  />
                  <Input
                    placeholder="Job Title"
                    value={jobTitle}
                    setValue={text =>
                      setJobTitle(
                        text
                          ?.replace(/^\s+/, '')
                          .replace(/\s\s+/g, ' ')
                          ?.trimStart(),
                      )
                    }
                    leftIcon={svg.JobDetail}
                    error={error.jobTitle}
                    maxLength={25}
                    inputProps={{
                      onFocus: () => {
                        scrollRef.current?.scrollToEnd({animated: true});
                      },
                    }}
                  />
                  <Input
                    placeholder="Company"
                    value={company}
                    setValue={text =>
                      setCompany(
                        text
                          ?.replace(/^\s+/, '')
                          .replace(/\s\s+/g, ' ')
                          ?.trimStart(),
                      )
                    }
                    leftIcon={svg.Company}
                    error={error.company}
                    maxLength={50}
                    inputProps={{
                      onFocus: () => {
                        scrollRef.current?.scrollToEnd({animated: true});
                      },
                    }}
                  />
                  <View style={style.termsContainer}>
                    <TouchableOpacity
                      style={style.check}
                      activeOpacity={0.7}
                      onPress={onCheck}>
                      {checked ? <svg.Checked /> : <svg.Uncheck />}
                    </TouchableOpacity>
                    <Text allowFontScaling={false} style={style.terms}>
                      I authorize Connplex Smart Theatre and its representatives
                      to Call, SMS, Email or WhatsApp me about its products and
                      offers. This consent overrides any registration for DNC /
                      NDNC.
                    </Text>
                  </View>
                  <Button
                    title="Apply"
                    onPress={handleValidation}
                    mainContainer={[
                      style.button,
                      {opacity: !checked ? 0.4 : 1},
                    ]}
                    isLoading={loading}
                    disabled={!checked}
                  />
                </View>
              </ScrollView>
            </SafeAreaView>
          </LinearGradient>
        </ImageBackground>
      </KeyboardAvoidingView>
      {/* </TouchableWithoutFeedback> */}
    </View>
  );
};

export default ApplyFranchise;
