import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const style = StyleSheet.create({
  container: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 50,
    width: 50,
  },
  noImage: {
    height: 30,
    width: 30,
  },
  name: {
    fontSize: 11,
    lineHeight: 16,
    fontFamily: font.poppinsRegular,
    color: color.text,
    marginTop: 7,
    textAlign: 'center',
  },
  svgStyle: {
    width: 72,
    height: 72,
  },
});

export default style;
