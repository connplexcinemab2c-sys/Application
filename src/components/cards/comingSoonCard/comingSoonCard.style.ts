import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const style = StyleSheet.create({
  container: {
    width: '48%',
    marginRight: 8,
    marginBottom: 22,
    borderRadius: 7,
    backgroundColor: color.inputBackground,
    paddingBottom: 5,
  },
  image: {
    // height: 240,
    height: 215,
    width: '100%',
  },
  title: {
    fontSize: 13,
    fontFamily: font.poppinsRegular,
    color: color.white,
    lineHeight: 21,
    marginTop: 5,
    paddingHorizontal: 5,
  },
  details: {
    fontSize: 9,
    fontFamily: font.poppinsLight,
    color: color.white,
    lineHeight: 13,
    marginTop: 4,
    paddingHorizontal: 5,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    left: 0,
    paddingVertical: 7,
    bottom: 0,
  },
  likes: {
    fontSize: 10,
    color: color.white,
    fontFamily: font.poppinsMedium,
    marginLeft: 4,
    marginRight: 12,
    marginTop: 1,
  },
  totalRatings: {
    fontSize: 10,
    color: color.white,
    fontFamily: font.poppinsMedium,
    marginLeft: 3,
    marginTop: 2,
  },
  userRating: {
    fontSize: 10,
    color: color.imdbBackground,
    fontFamily: font.poppinsMedium,
  },
});

export default style;
