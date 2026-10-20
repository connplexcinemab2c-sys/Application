import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const style = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: color.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingBottom: 15,
    paddingTop: 15,
  },
  main: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  container: {
    flex: 1,
    backgroundColor: color.black,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  textContent: {
    paddingBottom: 40,
  },
  heading: {
    fontSize: 20,
    fontFamily: font.poppinsRegular,
    color: color.text,
    marginBottom: 12,
    marginTop: 8,
  },
  paragraph: {
    fontSize: 15,
    fontFamily: font.poppinsRegular,
    color: color.white,
    lineHeight: 22,
    marginBottom: 10,
  },
  bold: {
    fontFamily: font.poppinsSemiBold,
    color: color.white,
    fontSize: 15,
  },
  link: {
    color: color.golden,
    textDecorationLine: 'underline',
    fontFamily: font.poppinsRegular,
    fontSize: 15,
  },
});

export default style;
