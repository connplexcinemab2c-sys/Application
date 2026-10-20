import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const style = StyleSheet.create({
  mainContainer: {
    marginBottom: 12,
    marginHorizontal: 18,
    alignItems: 'center',
    backgroundColor: color.transparent,
    borderRadius: 14,
  },
  image: {
    height: 177,
    width: '100%',
    borderRadius: 14,
  },
  detailsContainer: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: 9,
    paddingHorizontal: 12,
    width: '100%',
  },
  name: {
    fontSize: 14,
    fontFamily: font.poppinsMedium,
    color: color.white,
    lineHeight: 24,
  },
  emailText: {
    fontSize: 9,
    fontFamily: font.poppinsMedium,
    color: color.white,
  },
  location: {
    fontSize: 8,
    fontFamily: font.poppinsRegular,
    color: color.white,
    lineHeight: 16,
  },
});

export default style;
