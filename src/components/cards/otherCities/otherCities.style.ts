import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const style = StyleSheet.create({
  container: {
    paddingVertical: 8,
    borderBottomWidth: 0.3,
    borderBottomColor: color.borderLine,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: color.white,
    fontSize: 14,
    fontFamily: font.poppinsRegular,
    flex: 1,
    marginLeft: 10,
  },
  svgStyle: {
    width: 32,
    height: 32,
  },
  image: {
    height: 30,
    width: 30,
  },
  noImage: {
    height: 20,
    width: 20,
  },
});

export default style;
