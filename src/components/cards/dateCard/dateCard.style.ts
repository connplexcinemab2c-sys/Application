import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const style = StyleSheet.create({
  datePress: {
    marginRight: 13,
    borderRadius: 10,
  },
  dateView: {
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 3,
    width: 67,
  },
  month: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.white,
    lineHeight: 20,
    textAlign: 'center',
  },
  date: {
    fontSize: 22,
    fontFamily: font.poppinsMedium,
    color: color.white,
    lineHeight: 34,
    textAlign: 'center',
  },
});

export default style;
