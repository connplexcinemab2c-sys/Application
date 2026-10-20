import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const style = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  banner: {
    resizeMode: 'contain',
    height: 80,
    justifyContent: 'flex-end',
  },
  image: {
    borderRadius: 5,
  },
  detailContainer: {
    backgroundColor: color.cinemaBackground,
    paddingVertical: 3,
    paddingHorizontal: 7,
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: 5,
  },
  title: {
    fontSize: 10,
    color: color.white,
    fontFamily: font.poppinsRegular,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    fontSize: 8,
    color: color.whiteC6,
    fontFamily: font.poppinsRegular,
    flex: 1,
    marginLeft: 5,
  },
});

export default style;
