import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const style = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
    width: '100%',
  },
  title: {
    fontSize: 14,
    fontFamily: font.poppinsMedium,
    color: color.white,
    marginBottom: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingRight: 15,
  },
  key: {
    fontSize: 14,
    fontFamily: font.poppinsMedium,
    color: color.white,
    marginRight: 20,
  },
  seatTouchable: {
    padding: 5,
    flex: 1,
  },
  gapView: {
    width: 23.226,
    height: 20.213,
  },
});

export default style;
