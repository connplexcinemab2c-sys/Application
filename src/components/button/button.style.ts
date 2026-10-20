import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const style = StyleSheet.create({
  mainContainer: {
    shadowColor: color.black,
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowRadius: 4.65,
    elevation: 6,
  },
  linearGradient: {
    height: 50,
    borderRadius: 30,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  title: {
    fontSize: 12,
    color: color.white,
    fontFamily: font.poppinsSemiBold,
    textAlign: 'center',
  },
  leftIcon: {
    paddingRight: 12,
  },
  nestedText: {
    fontSize: 16,
    color: color.white,
    fontFamily: font.poppinsMedium,
  },
});

export default style;
