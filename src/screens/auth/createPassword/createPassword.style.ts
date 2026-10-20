import {Dimensions, StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  mainViewStyle: {
    marginTop: 13,
  },
  button: {
    marginTop: 40,
    width: '60%',
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 26,
    height: height / 1.95,
  },
  headingText: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: font.poppinsRegular,
    textAlign: 'center',
    color: color.white,
  },
});
