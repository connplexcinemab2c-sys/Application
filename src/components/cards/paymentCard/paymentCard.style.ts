import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const style = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: color.locationText,
  },
  image: {
    height: 50,
    width: 50,
    marginLeft: 18,
  },
  nameContainer: {
    marginLeft: 9,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 12,
    fontFamily: font.poppinsLight,
    color: color.white,
    lineHeight: 18,
  },
  number: {
    fontSize: 10,
    fontFamily: font.poppinsRegular,
    color: color.white,
    lineHeight: 16,
    marginTop: 3,
  },
  radio: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filledRadio: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: color.text,
  },
  CVVText: {
    fontSize: 24,
    lineHeight: 35,
    fontFamily: font.poppinsLight,
    color: color.paymentCardColor,
  },
});

export default style;
