import {Dimensions, StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    marginTop: 7,
  },
  button: {
    marginTop: 34,
    width: '60%',
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 26,
    height: height / 2.59,
  },
  headingText: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: font.poppinsRegular,
    textAlign: 'center',
    color: color.white,
  },
});
