import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  sessionOuttext: {
    fontSize: 16,
    fontFamily: font.poppinsSemiBold,
    color: color.white,
    textAlign: 'center',
    lineHeight: 18,
  },
  sessionOut: {
    fontSize: 12,
    fontFamily: font.poppinsMedium,
    color: color.white,
    textAlign: 'center',
    lineHeight: 22,
    marginVertical: 30,
  },
  buttonContainer: {
    width: '60%',
    marginTop: 50,
  },
  sessionOutImg: {
    width: 275,
    height: 300,
  },
});
