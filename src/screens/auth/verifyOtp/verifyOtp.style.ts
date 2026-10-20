import {Dimensions, StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 26,
    height: height / 2.2,
  },
  headingText: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: font.poppinsRegular,
    textAlign: 'center',
    color: color.white,
  },
  otpInputContainer: {
    borderRadius: 50,
    textAlign: 'center',
    fontSize: 16,
  },
  otpView: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181510',
    borderColor: color.borderColorAdd,
    borderWidth: 1,
  },
  cell: {
    fontSize: 25,
    color: color.white,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  signupText: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.loginText,
    lineHeight: 18,
  },
  noAccount: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.white,
    lineHeight: 18,
    marginLeft: 13,
  },
  button: {
    marginTop: 42,
    width: '60%',
    alignSelf: 'center',
  },
  resendTextStyles: {
    fontSize: 14,
    fontFamily: font.poppinsSemiBold,
    color: color.borderColor,
  },
  otpContainer: {
    marginHorizontal: 40,
    marginTop: 26,
    marginBottom: 21,
  },
});
