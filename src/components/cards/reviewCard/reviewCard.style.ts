import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const style = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  profile: {
    height: 30,
    width: 30,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  userContainer: {
    flex: 1,
    marginLeft: 12,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  username: {
    fontSize: 12,
    color: color.white,
    fontFamily: font.poppinsMedium,
    lineHeight: 14,
  },
  ratings: {
    fontSize: 10,
    color: color.white,
    fontFamily: font.poppinsRegular,
    lineHeight: 12,
    marginTop: 2,
    marginLeft: 5,
  },
  date: {
    fontSize: 10,
    color: color.white,
    fontFamily: font.poppinsRegular,
    lineHeight: 12,
  },
  review: {
    fontSize: 12,
    color: color.white,
    fontFamily: font.poppinsLight,
    lineHeight: 18,
  },
  more: {
    fontSize: 9,
    color: color.imdbBackground,
    fontFamily: font.poppinsLight,
    lineHeight: 18,
  },
});

export default style;
