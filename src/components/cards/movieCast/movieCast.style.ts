import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const style = StyleSheet.create({
  container: {
    width: 51,
    marginRight: 10,
  },
  image: {
    height: 51,
    width: 51,
    borderRadius: 25.5,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 9,
    fontFamily: font.poppinsRegular,
    color: color.white,
    lineHeight: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  role: {
    fontSize: 8,
    fontFamily: font.poppinsExtraLight,
    color: color.white,
    lineHeight: 8,
    textAlign: 'center',
  },
});

export default style;
