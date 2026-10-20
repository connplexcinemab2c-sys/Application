import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const style = StyleSheet.create({
  container: {
    marginRight: 10,
    // width: 165,
    width: 130,
    backgroundColor: color.black,
    paddingBottom: 5,
    borderRadius: 7,
  },
  image: {
    // height: 230,
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
    // textTransform: 'capitalize',
  },
  details: {
    fontSize: 9,
    fontFamily: font.poppinsLight,
    color: color.white,
    lineHeight: 13,
    marginTop: 2,
    marginLeft: 2,
    textTransform: 'capitalize',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    left: 0,
    paddingVertical: 7,
    bottom: 0,
  },
  likes: {
    fontSize: 11,
    color: color.white,
    fontFamily: font.poppinsMedium,
    marginLeft: 4,
    marginRight: 12,
    marginTop: 2,
  },
  totalRatings: {
    fontSize: 11,
    color: color.white,
    fontFamily: font.poppinsMedium,
    marginLeft: 3,
    marginTop: 3,
  },
  userRating: {
    fontSize: 11,
    // color: color.imdbBackground,
    fontFamily: font.poppinsMedium,
  },
});

export default style;
