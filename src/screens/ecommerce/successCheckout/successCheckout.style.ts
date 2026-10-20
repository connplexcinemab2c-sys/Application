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
    shadowColor: color.goldenYellow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 5,
  },
  successText: {
    fontSize: 18,
    fontFamily: font.poppinsMedium,
    color: color.white,
    marginTop: 20,
  },
  successDesText: {
    fontSize: 14,
    fontFamily: font.poppinsRegular,
    color: color.whiteC6,
    marginTop: 5,
  },
  thanksTxt: {
    fontSize: 16,
    fontFamily: font.poppinsMedium,
    color: color.white,
    marginTop: 5,
  },
  continueBtn: {
    color: color.goldenYellow,
    marginTop: 15,
    fontSize: 15,
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
  buttonContainer: {
    marginHorizontal: 16,
    marginTop: 15,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 13,
    fontFamily: font.poppinsMedium,
  },
  btnContainer: {
    width: '100%',
  },
  buttonWrapper: {
    width: '40%',
    marginTop: 15,
  },
  btnWrapper: {
    borderRadius: 11,
    height: 40,
  },
});

export default styles;
