import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomColor: color.borderColor,
    borderBottomWidth: 0.5,
  },
  readMoreText: {
    color: color.goldenYellow,
    marginTop: 4,
    fontSize: 12,
    fontFamily: font.poppinsMedium,
  },
  icon: {
    height: 38,
    width: 38,
    borderRadius: 19,
    borderColor: color.borderColor,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  detailContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: color.white,
    fontFamily: font.poppinsMedium,
  },
  text: {
    fontSize: 14,
    color: color.white,
    fontFamily: font.poppinsRegular,
    lineHeight:21,
    marginTop: 2,
  },
});

export default style;
