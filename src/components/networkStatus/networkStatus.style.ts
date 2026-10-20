import {Dimensions, StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const {height, width} = Dimensions.get('window');

const style = StyleSheet.create({
  container: {
    backgroundColor: color.whiteBackground,
    height: height,
    width: width,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  textStyle: {
    fontSize: 26,
    fontFamily: font.poppinsBold,
    color: color.red,
    textAlign: 'center',
  },
  internetTextShow: {
    fontSize: 16,
    fontFamily: font.poppinsSemiBold,
    color: color.black,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 30,
  },
  buttonContainer: {
    height: 45,
    marginHorizontal: 35,
  },
});

export default style;
