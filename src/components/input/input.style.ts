import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const style = StyleSheet.create({
  mainContainer: {
    marginVertical: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 45,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: color.inputBorder,
    backgroundColor: color.inputBackground,
  },
  textInput: {
    flex: 1,
    color: color.placeholder,
    fontFamily: font.poppinsRegular,
    fontSize: 12,
    height: '100%',
    paddingVertical: 0,
  },
  error: {
    marginLeft: 5,
    fontSize: 10,
    color: color.red,
    marginTop: 2,
    fontFamily: font.poppinsRegular,
    marginBottom: -7,
  },
  leftIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  rightFilterIcon: {
    // backgroundColor: color.text,
    padding: 10,
  },
  inputTextStyle: {
    fontFamily: font.poppinsRegular,
    lineHeight: 14,
    fontSize: 12,
    color: color.white,
    marginLeft: 17,
    marginBottom: 5,
  },
});

export default style;
