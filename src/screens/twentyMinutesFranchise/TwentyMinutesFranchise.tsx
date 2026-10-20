import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button, CustomStatusBar, Header, Input} from '../../components';
import svg from '../../assets/svgIndex';
import twentyMinutesFranchiseController from './twentyMinutesFranchise.controller';
import style from './twentyMinutesFranchise.style';
import {color} from '../../theme';

const TwentyMinutesFranchise: React.FC = () => {
  const {
    onBack,
    loading,
    name,
    setName,
    email,
    setEmail,
    mobileNo,
    setMobileNo,
    city,
    setCity,
    error,
    validation,
    checked,
    onCheck,
  } = twentyMinutesFranchiseController();
  return (
    <View style={style.container}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <Header
        onBack={onBack}
        backIcon
        title="20 Minutes Franchise"
        containerStyle={style.title}
      />
      <KeyboardAvoidingView
        style={style.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={style.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={style.inputContainer}>
            <Input
              placeholder="Name"
              value={name}
              setValue={(text: string) =>
                setName(
                  text?.replace(/^\s+/, '').replace(/\s\s+/g, ' ')?.trimStart(),
                )
              }
              leftIcon={svg.UserFilled}
              error={error.name}
              maxLength={25}
            />
            <Input
              placeholder="Email"
              value={email}
              setValue={(text: string) => setEmail(text.trim())}
              leftIcon={svg.Email}
              error={error.email}
              maxLength={50}
            />
            <Input
              placeholder="Phone Number"
              value={mobileNo}
              setValue={(text: string) =>
                setMobileNo(text?.replace(/\D/g, '')?.trim())
              }
              leftIcon={svg.Mobile}
              error={error.mobileNo}
              keyboardType={'number-pad'}
              maxLength={10}
            />
            <Input
              placeholder="Current City"
              value={city}
              setValue={(text: string) =>
                setCity(
                  text?.replace(/^\s+/, '').replace(/\s\s+/g, ' ')?.trimStart(),
                )
              }
              leftIcon={svg.UserLocation}
              error={error.city}
              maxLength={30}
            />
            <View style={style.termsContainer}>
              <TouchableOpacity
                style={style.check}
                activeOpacity={0.7}
                onPress={onCheck}>
                {checked ? <svg.Checked /> : <svg.Uncheck />}
              </TouchableOpacity>
              <Text allowFontScaling={false} style={style.terms}>
                I authorize Connplex Smart Theatre and its representatives to
                Call, SMS, Email or WhatsApp me about its products and offers.
                This consent overrides any registration for DNC / NDNC.
              </Text>
            </View>
            <Button
              title="Submit"
              onPress={validation}
              mainContainer={[style.button, {opacity: !checked ? 0.4 : 1}]}
              isLoading={loading}
              titleStyle={style.buttonTitle}
              disabled={!checked}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default TwentyMinutesFranchise;
