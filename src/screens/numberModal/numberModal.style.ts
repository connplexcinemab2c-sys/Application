import { StyleSheet } from 'react-native';
import { color, font } from '../../theme';

const style = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: color.lightShade,
  },
  warningContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderWidth: 1,
    borderColor: color.borderColor,
    marginHorizontal: 18,
    borderRadius: 14,
    backgroundColor: color.lightOpacity,
  },
  createAccountText: {
    color: color.white,
    fontSize: 13,
    fontFamily: font.poppinsSemiBold,
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: '100%',
    width: '100%',
  },
  button: {
    marginTop: 15,
    width: '60%',
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
  },
  headingText: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: font.poppinsRegular,
    textAlign: 'center',
    color: color.white,
  },
  backText: {
    fontSize: 13,
    fontFamily: font.poppinsMedium,
    textAlign: 'center',
    color: color.white,
    textDecorationLine: 'underline',
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
    marginHorizontal: 10,
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
  otpButton: {
    marginTop: 22,
    width: '60%',
    alignSelf: 'center',
  },
  resendTextStyles: {
    fontSize: 12,
    fontFamily: font.poppinsSemiBold,
    color: color.borderColor,
    textAlign: 'center',
  },
  otpContainer: {
    marginTop: 26,
    marginBottom: 21,
    alignSelf: 'center',
  },
  error: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    lineHeight: 26,
    color: color.red,
    marginLeft: 10,
    marginTop: 5,
  },
  back: {
    paddingTop: 15,
    alignItems: 'center',
  },
});

export default style;
