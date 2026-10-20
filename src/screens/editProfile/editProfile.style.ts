import {Dimensions, StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const {width} = Dimensions.get('window');

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  scrollView: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  header: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  titleContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  inputTextStyle: {
    fontFamily: font.poppinsRegular,
    lineHeight: 14,
    fontSize: 12,
    color: color.white,
    marginLeft: 17,
    marginBottom: 5,
    marginTop: 10,
  },
  text: {
    color: color.placeholder,
    fontFamily: font.poppinsRegular,
    fontSize: 12,
  },
  main: {
    flex: 1,
  },
  cancelText: {
    fontSize: 14,
    fontFamily: font.poppinsSemiBold,
    color: color.black,
  },
  cancelView: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.white,
  },
  textView: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: color.inputBorder,
    backgroundColor: color.inputBackground,
    marginBottom: 10,
  },
  timeview: {
    width: width,
    backgroundColor: '#fff',
    elevation: 5,
  },
  modelStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: color.transparentBlack,
  },
  modelContent: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: color.transparentBlack,
  },
  input: {
    marginVertical: 5,
  },
  button: {
    marginTop: 30,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  profileImage: {
    height: 100,
    width: 100,
    backgroundColor: color.white,
    borderRadius: 50,
  },
  editProfile: {
    height: 100,
    width: 100,
    position: 'absolute',
    bottom: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  editProfileImage: {
    height: 30,
    width: 30,
  },
  profileContainer: {
    marginTop: 41,
    marginBottom: 32,
    alignItems: 'center',
  },
  borderView: {
    marginHorizontal: 20,
  },
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    color: color.text,
    textAlign: 'center',
    fontSize: 17,
    fontFamily: font.poppinsSemiBold,
    marginBottom: 5,
  },
  textInputHeading: {
    fontFamily: font.poppinsRegular,
    lineHeight: 14,
    fontSize: 12,
    color: color.white,
    marginLeft: 17,
    flex: 1,
  },
  mobileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 10,
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: color.inputBorder,
    backgroundColor: color.inputBackground,
    marginVertical: 10,
  },
  mobileText: {
    color: color.placeholder,
    fontFamily: font.poppinsRegular,
    fontSize: 12,
    flex: 1,
    marginLeft: 10,
  },
  textEdit: {
    color: color.text,
    fontSize: 11,
    fontFamily: font.poppinsSemiBold,
    marginLeft: 10,
    marginRight: 10,
  },
  leftIcon: {
    marginRight: 10,
  },
  borderStyle: {
    marginVertical: 20,
    borderWidth: 0.3,
  },
  AddPhoto: {
    color: color.white,
    fontSize: 10,
    fontFamily: font.poppinsSemiBold,
    textAlign: 'center',
    marginTop: 5,
  },
  genderText: {
    fontFamily: font.poppinsRegular,
    lineHeight: 14,
    fontSize: 12,
    color: color.white,
    marginLeft: 17,
    marginBottom: 5,
  },
  modalInput: {
    marginVertical: 10,
  },
  dropdownButton: {
    borderWidth: 1,
    paddingHorizontal: 20,
    borderColor: color.placeholder,
    borderRadius: 30,
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 12,
    paddingLeft: 10,
    color: color.placeholder,
    fontFamily: font.poppinsRegular,
    flex: 1,
  },
  arrow: {
    transform: [{rotate: '180deg'}],
  },
  option: {
    paddingVertical: 15,
    borderBottomColor: color.black,
  },
  optionText: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily: font.poppinsLight,
    color: color.white,
  },
  genderSheet: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    minHeight: 100,
    maxHeight: 170,
    backgroundColor: color.addColor,
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    borderColor: 'black',
  },
  imageSheet: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: color.addColor,
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    borderColor: 'black',
  },
  imageContent: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 20,
  },
  maritalSheet: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    minHeight: 100,
    maxHeight: 120,
    backgroundColor: color.addColor,
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    borderColor: 'black',
  },
  userProfile: {
    alignSelf: 'center',
  },
  numberContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editImage: {
    fontSize: 12,
    paddingLeft: 4,
    color: color.golden,
    fontFamily: font.poppinsMedium,
  },
  verifyView: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: color.green,
    borderRadius: 14,
  },
  verifyText: {
    color: color.white,
    fontSize: 12,
    fontFamily: font.poppinsMedium,
  },
});

export default style;
