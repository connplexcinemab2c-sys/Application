import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Button, CustomStatusBar, Input} from '../../../components';
import {color, font} from '../../../theme';
import EcomHeader from '../../../components/ecomHeader/EcomHeader';
import useAddress from './useAddress';
import styles from './address.style';
import StateModal from '../../../components/statemodal/StateModal';
import CityModalComp from '../../../components/statemodal/CityModalComp';
import SvgIndex from '../../../assets/svgIndex';

const Address = () => {
  const {
    values,
    setValues,
    validation,
    route,
    onNewAddress,
    onGetAllCities,
    allStates,
    allCities,
  } = useAddress();
  const [stateModalVisible, setStateModalVisible] = useState(false);
  const [cityModalVisible, setCityModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <CustomStatusBar transparent backgroundColor={color.blackBackground} />
      <EcomHeader showCart={false} showLogo={false} title="Shipping Address" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.firstLastNameContainer}>
            <Input
              lable="First Name"
              placeholder="Enter First Name"
              placeholderColor={color.placeholder}
              value={values.firstName}
              setValue={text => setValues('firstName', text)}
              inputContainer={styles.inputContainer}
              inputMainContainer={styles.firstNameInputMainContainer}
              inputLabelStyle={styles.inputLabelStyle}
              error={values.firstNameError}
            />
            <Input
              lable="Last Name"
              placeholder="Enter Last Name"
              placeholderColor={color.placeholder}
              value={values.lastName}
              setValue={text => setValues('lastName', text)}
              inputContainer={styles.inputContainer}
              inputMainContainer={styles.lastNameInputMainContainer}
              inputLabelStyle={styles.inputLabelStyle}
              error={values.lastNameError}
            />
          </View>
          <Input
            lable="Phone Number"
            placeholder="Enter Phone Number"
            placeholderColor={color.placeholder}
            value={values.mobile}
            setValue={text => setValues('mobile', text)}
            inputContainer={styles.inputContainer}
            inputLabelStyle={styles.inputLabelStyle}
            maxLength={10}
            keyboardType="numeric"
            error={values.mobileError}
            inputMainContainer={styles.inputMainContainer}
          />
          <Input
            lable="Email"
            placeholder="Enter Email Address"
            placeholderColor={color.placeholder}
            value={values.emailId}
            setValue={text => setValues('emailId', text)}
            inputContainer={styles.inputContainer}
            inputLabelStyle={styles.inputLabelStyle}
            maxLength={50}
            keyboardType="email-address"
            error={values.emailIdError}
            inputMainContainer={styles.inputMainContainer}
          />
          <Input
            lable="Address"
            placeholder="Enter Address"
            placeholderColor={color.placeholder}
            value={values.address}
            setValue={text => setValues('address', text)}
            inputContainer={styles.inputContainer}
            inputLabelStyle={styles.inputLabelStyle}
            error={values.addressError}
            inputMainContainer={styles.inputMainContainer}
          />
          <Input
            lable="Locality"
            placeholder="Enter Locality"
            placeholderColor={color.placeholder}
            value={values.locality}
            setValue={text => setValues('locality', text)}
            inputContainer={styles.inputContainer}
            inputLabelStyle={styles.inputLabelStyle}
            error={values.localityError}
            inputMainContainer={styles.inputMainContainer}
          />
          <Input
            lable="Landmark"
            placeholder="Enter Landmark"
            placeholderColor={color.placeholder}
            value={values.landMark}
            setValue={txt => setValues('landMark', txt)}
            inputContainer={styles.inputContainer}
            inputLabelStyle={styles.inputLabelStyle}
            error={values.landMarkError}
            inputMainContainer={styles.inputMainContainer}
          />
          <Input
            lable="Pincode"
            value={values.pincode}
            placeholder="Enter Pincode"
            placeholderColor={color.placeholder}
            setValue={txt => setValues('pincode', txt)}
            inputContainer={styles.inputContainer}
            inputLabelStyle={styles.inputLabelStyle}
            maxLength={6}
            keyboardType="numeric"
            error={values.pincodeError}
            inputMainContainer={styles.inputMainContainer}
          />
          <Input
            lable="Country"
            placeholder="Select Country"
            placeholderColor={color.placeholder}
            value={values.country}
            setValue={txt => setValues('country', txt)}
            inputContainer={styles.inputContainer}
            inputLabelStyle={styles.inputLabelStyle}
            error={values.countryError}
            inputMainContainer={styles.inputMainContainer}
            editable={false}
          />

          <TouchableOpacity
            style={{}}
            onPress={() => setStateModalVisible(true)}
            activeOpacity={0.5}>
            <Text style={[styles.inputLabelStyle, {marginTop: 6}]}>State</Text>
            <View
              style={{
                borderColor: color.whiteBorderLight,
                borderRadius: 10,
                height: 40,
                borderWidth: 0.8,
                justifyContent: 'center',
                paddingLeft: 20,
                marginTop: 6,
              }}>
              <Text
                style={{
                  color: color.placeholder,
                  fontFamily: font.poppinsRegular,
                  fontSize: 12,
                }}>
                {values?.state ? values.state : 'Select State'}
              </Text>
            </View>
            <View style={{position: 'absolute', right: '5%', bottom: '30%'}}>
              <SvgIndex.DownArrow />
            </View>
          </TouchableOpacity>

          <StateModal
            visible={stateModalVisible}
            onClose={() => setStateModalVisible(false)}
            onSelect={selectedState => {
              setValues('state', selectedState.name);
              setValues('stateISO', selectedState.isoCode);
              setValues('city', '');
              setStateModalVisible(false);
              onGetAllCities(selectedState.isoCode);
            }}
            states={allStates}
          />
          {values?.state ? (
            <>
              <TouchableOpacity
                style={{}}
                onPress={() => setCityModalVisible(true)}
                activeOpacity={0.5}>
                <Text style={[styles.inputLabelStyle, {marginTop: 8}]}>
                  City
                </Text>
                <View
                  style={{
                    borderColor: color.whiteBorderLight,
                    borderRadius: 10,
                    height: 40,
                    borderWidth: 0.8,
                    justifyContent: 'center',
                    paddingLeft: 20,
                    marginTop: 6,
                  }}>
                  <Text
                    style={{
                      color: values.city
                        ? color.placeholder
                        : color.placeholder,
                      fontFamily: font.poppinsRegular,
                      fontSize: 12,
                    }}>
                    {values?.city ? values.city : 'Select City'}
                  </Text>
                </View>
                <View
                  style={{position: 'absolute', right: '5%', bottom: '30%'}}>
                  <SvgIndex.DownArrow />
                </View>
              </TouchableOpacity>
            </>
          ) : null}

          <CityModalComp
            visible={cityModalVisible}
            onClose={() => setCityModalVisible(false)}
            onSelect={selected => {
              setValues('city', selected);
              setCityModalVisible(false);
            }}
            states={allCities}
          />
        </ScrollView>

        <Button
          title={values?.activeAddress ? 'Update Address' : 'Save Address'}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.buttonText}
          gradient={color.categorySelected}
          onPress={validation}
          isLoading={values.spinner}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Address;
