import React, {FC} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  RefreshControl,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  Border,
  BorderWithShadow,
  Header,
  Input,
  Button,
  CustomStatusBar,
} from '../../components';
import {color, font} from '../../theme';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import constant from '../../services/config/constant';
import image from '../../assets/imageIndex';
import svg from '../../assets/svgIndex';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import style from '../editProfile/editProfile.style';
import { genderOptions, maritalStatusOptions } from '../editProfile/editProfile.const';
import editProfileController from '../editProfile/editProfile.controller';

const MyProfile: FC = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    mobile,
    setMobile,
    address,
    setAddress,
    profileImage,
    imagePermission,
    onEditMobile,
    onEditEmail,
    loading,
    validateInputs,
    error,
    userData,
    selectedGender,
    handleGenderSelect,
    city,
    setCity,
    handleMaritalStatus,
    birthDate,
    maritalStatus,
    maritalSheet,
    genderSheet,
    isGenderSheet,
    isMaritalSheet,
    handleOpenGenderSheet,
    handleOpenMaritalSheet,
    showPicker,
    setShowPicker,
    handleConfirm,
    setBirthDate,
    selectedDate,
    onRefresh,
    refreshing,
    isVisible,
    setIsVisible,
    loginType,
  } = editProfileController();
  const {onBack} = commonFunctions();
  const currentYear = new Date().getFullYear();
  const minDate = new Date(1900, 0, 1);
  const maxDate = new Date(currentYear - 10, 11, 31);

  return (
    <View style={style.mainContainer}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <Header
        title="My Account"
        titleContainerStyle={style.titleContainer}
        containerStyle={style.header}
        withBackground={false}
        backIcon
        onBack={onBack}
      />
      <BorderWithShadow />
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        style={style.titleContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={style.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={color.white}
            />
          }>
          <TouchableOpacity
            onPress={() => setIsVisible(true)}
            activeOpacity={0.7}>
            <View style={style.profileContainer}>
              {!userData?.profile && !profileImage?.uri ? (
                userData?.gender === 'Female' ? (
                  <svg.FemaleIcon />
                ) : (
                  <svg.MaleIcon />
                )
              ) : (
                <Image
                  source={{
                    uri: profileImage?.uri
                      ? profileImage?.uri
                      : `${constant.imageURL}${userData?.profile}`,
                  }}
                  style={style.profileImage}
                />
              )}
              <View style={style.editProfile}>
                <Image
                  source={image.editPhoto}
                  style={style.editProfileImage}
                />
              </View>
              {/* <Text allowFontScaling={false} style={style.AddPhoto}>Add photo</Text> */}
            </View>
          </TouchableOpacity>
          <View style={style.borderView}>
            <Border />
          </View>
          <View style={style.formContainer}>
            <View style={style.numberContent}>
              <Text
                allowFontScaling={false}
                style={[style.textEdit, {flex: 1}]}>
                Phone Number
              </Text>
              {mobile?.length && (
                <TouchableOpacity
                  style={[
                    style.numberContent,
                    {
                      paddingHorizontal: 15,
                    },
                  ]}
                  onPress={onEditMobile}
                  activeOpacity={0.7}>
                  <svg.EditIcon />
                  <Text style={style.editImage}>Edit</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={style.mobileContent}
              activeOpacity={0.7}
              disabled={mobile ? true : false}
              onPress={onEditMobile}>
              <svg.Mobile />
              <Text allowFontScaling={false} style={style.mobileText}>
                {mobile ? mobile : '+ Add Phone No.'}
              </Text>
              {mobile && (
                <View style={style.verifyView}>
                  <Text style={style.verifyText}>Verified</Text>
                </View>
              )}
            </TouchableOpacity>
            <View style={style.numberContent}>
              <Text
                allowFontScaling={false}
                style={[
                  style.textEdit,
                  {opacity: loginType == 'withoutSocial' ? 1 : 0.5, flex: 1},
                ]}>
                Email Address
              </Text>
              {loginType == 'withoutSocial' && email && (
                <TouchableOpacity
                  style={[
                    style.numberContent,
                    {
                      paddingHorizontal: 15,
                    },
                  ]}
                  onPress={onEditEmail}
                  activeOpacity={0.7}>
                  <svg.EditIcon />
                  <Text style={style.editImage}>Edit</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onEditEmail}
              disabled={loginType == 'withoutSocial' && !email ? false : true}
              style={[
                style.mobileContent,
                {opacity: loginType == 'withoutSocial' ? 1 : 0.5},
              ]}>
              <svg.Email />
              <Text allowFontScaling={false} style={style.mobileText}>
                {email ? email : '+ Add Email Address'}
              </Text>
              {email && (
                <View style={style.verifyView}>
                  <Text style={style.verifyText}>Verified</Text>
                </View>
              )}
            </TouchableOpacity>
            <Border borderStyle={style.borderStyle} />
            <Text allowFontScaling={false} style={style.detailText}>
              Personal Details
            </Text>
            <Input
              placeholder="First Name"
              value={firstName}
              lable="First Name"
              setValue={text =>
                setFirstName(
                  text?.replace(/^\s+/, '').replace(/\s\s+/g, ' ')?.trimStart(),
                )
              }
              leftIcon={svg.UserSignup}
              error={error.firstName}
              inputContainer={style.inputContainer}
              maxLength={20}
            />
            <Input
              placeholder="Last Name"
              lable="Last Name"
              value={lastName}
              setValue={text =>
                setLastName(
                  text?.replace(/^\s+/, '').replace(/\s\s+/g, ' ')?.trimStart(),
                )
              }
              leftIcon={svg.UserSignup}
              error={error.lastName}
              inputContainer={style.inputContainer}
              maxLength={20}
            />
            <Text allowFontScaling={false} style={style.inputTextStyle}>
              Birthdate
            </Text>
            <TouchableOpacity
              style={style.textView}
              activeOpacity={0.8}
              onPress={() => setShowPicker(true)}>
              <Text allowFontScaling={false} style={style.text}>
                {selectedDate
                  ? moment(selectedDate).format('DD/MM/YYYY')
                  : 'Select Birthdate'}
              </Text>
            </TouchableOpacity>
            <View style={style.modalInput}>
              <Text allowFontScaling={false} style={style.genderText}>
                Gender
              </Text>
              <TouchableOpacity
                onPress={handleOpenGenderSheet}
                style={style.dropdownButton}>
                <Text allowFontScaling={false} style={style.dropdownText}>
                  {selectedGender == '' ? 'Select Gender' : selectedGender}
                </Text>
                <svg.DownArrow
                  style={isGenderSheet ? style.arrow : undefined}
                />
              </TouchableOpacity>
            </View>
            <View style={style.modalInput}>
              <Text allowFontScaling={false} style={style.genderText}>
                Marital Status
              </Text>
              <TouchableOpacity
                onPress={handleOpenMaritalSheet}
                style={style.dropdownButton}>
                <Text allowFontScaling={false} style={style.dropdownText}>
                  {maritalStatus == ''
                    ? 'Select Marital Status'
                    : maritalStatus}
                </Text>
                <svg.DownArrow
                  style={isMaritalSheet ? style.arrow : undefined}
                />
              </TouchableOpacity>
            </View>
            <Input
              placeholder="Address"
              lable="Address"
              value={address}
              setValue={setAddress}
              leftIcon={svg.UserLocation}
              inputContainer={style.inputContainer}
            />
            <Input
              placeholder="City"
              lable="City"
              value={city}
              setValue={setCity}
              leftIcon={svg.UserLocation}
              inputContainer={style.inputContainer}
              maxLength={30}
            />
            <Button
              title="UPDATE PROFILE"
              mainContainer={style.button}
              onPress={validateInputs}
              isLoading={loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <RBSheet
        ref={maritalSheet}
        bottomSheetColor={color.white}
        closeOnDragDown={false}
        closeOnPressMask={false}
        animationType="slide"
        customStyles={{
          wrapper: {
            backgroundColor: color.sheetBackground,
          },
          container: style.maritalSheet,
        }}>
        {maritalStatusOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => handleMaritalStatus(option?.name)}
            style={[
              style.option,
              {
                borderBottomWidth:
                  maritalStatusOptions?.length - 1 !== index ? 0.5 : 0,
              },
            ]}>
            <Text allowFontScaling={false} style={style.optionText}>
              {option?.name}
            </Text>
          </TouchableOpacity>
        ))}
      </RBSheet>
      <RBSheet
        ref={genderSheet}
        bottomSheetColor={color.white}
        closeOnDragDown={false}
        closeOnPressMask={false}
        animationType="slide"
        customStyles={{
          wrapper: {
            backgroundColor: color.sheetBackground,
          },
          container: style.genderSheet,
        }}>
        {genderOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => handleGenderSelect(option?.name)}
            style={[
              style.option,
              {
                borderBottomWidth:
                  genderOptions?.length - 1 !== index ? 0.5 : 0,
              },
            ]}>
            <Text allowFontScaling={false} style={style.optionText}>
              {option?.name}
            </Text>
          </TouchableOpacity>
        ))}
      </RBSheet>
      <Modal
        visible={isVisible}
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
        transparent>
        <View style={style.modelContent}>
          <TouchableOpacity
            style={style.titleContainer}
            onPress={() => setIsVisible(false)}
          />
          <View style={style.imageSheet}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => imagePermission('camera')}
              style={[
                style.option,
                {
                  borderBottomWidth: 0.5,
                },
              ]}>
              <Text allowFontScaling={false} style={style.optionText}>
                Select from camera
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => imagePermission('gallery')}
              style={style.option}>
              <Text allowFontScaling={false} style={style.optionText}>
                Select from gallery
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={showPicker} animationType="slide" transparent={true}>
        <View style={style.modelStyle}>
          <View style={style.modalContainer}>
            <TouchableOpacity
              style={style.cancelView}
              onPress={() => {
                setBirthDate(selectedDate);
                setShowPicker(false);
              }}>
              <Text allowFontScaling={false} style={style.cancelText}>
                Cancel
              </Text>
            </TouchableOpacity>
            <View style={style.main} />
            <TouchableOpacity
              style={[
                style.cancelView,
                {
                  alignItems: 'flex-end',
                },
              ]}
              onPress={handleConfirm}>
              <Text allowFontScaling={false} style={style.cancelText}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
          {
            //@ts-ignore
            <DatePicker
              minimumDate={minDate}
              maximumDate={maxDate}
              mode="date"
              date={birthDate ? new Date(birthDate) : new Date()}
              onDateChange={(res: any) => {
                setBirthDate(res);
              }}
              style={style.timeview}
              textColor={color.black}
            />
          }
        </View>
      </Modal>
    </View>
  );
};

export default MyProfile;
