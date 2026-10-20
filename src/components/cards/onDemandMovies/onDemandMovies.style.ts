import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const style = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: color.timeBorder,
    borderRadius: 5,
    padding: 5,
    marginBottom: 8,
  },
  poster: {
    height: 91,
    width: 78,
    resizeMode: 'cover',
  },
  detailsContainer: {
    marginLeft: 12,
    marginTop: 8,
    flex: 1,
  },
  title: {
    fontSize: 11,
    color: color.white,
    fontFamily: font.poppinsRegular,
    lineHeight: 18,
    marginBottom: 7,
    paddingRight: 15,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 10,
    color: color.white,
    fontFamily: font.poppinsLight,
    lineHeight: 16,
    marginLeft: 6,
  },
  address: {
    fontSize: 10,
    color: color.white,
    fontFamily: font.poppinsLight,
    lineHeight: 16,
  },
  type: {
    fontSize: 10,
    color: color.white,
    fontFamily: font.poppinsLight,
    lineHeight: 16,
    marginTop: 3,
  },
});

export default style;
