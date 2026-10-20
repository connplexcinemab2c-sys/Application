import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.ecomBackground,
  },
  successImg: {
    width: 133,
    height: 133,
  },
  imgContainer: {
    shadowColor: color.failedRed,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 5,
  },
  successText: {
    fontSize: 26,
    fontFamily: font.poppinsMedium,
    color: color.white,
    marginTop: 20,
  },
  successDesText: {
    fontSize: 16,
    fontFamily: font.poppinsRegular,
    color: color.white,
    marginTop: 20,
    fontWeight: '400',
    textAlign: 'center',
  },
  thanksTxt: {
    fontSize: 16,
    fontFamily: font.poppinsMedium,
    color: color.white,
  },
  continueBtn: {
    color: color.goldenYellow,
    marginTop: 80,
  },
  confetyImg: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderId: {
    color: color.goldenYellow,
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
});

export default styles;
