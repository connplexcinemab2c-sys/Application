import {Dimensions, StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  title: {
    paddingBottom: 15,
    paddingTop: 15,
  },
  buttonContainer: {
    marginTop: 10,
  },
  imageStyle: {
    height: height / 2.7,
    width: '90%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  enjoyText: {
    fontSize: 14,
    color: color.white,
    fontFamily: font.poppinsMedium,
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 24,
  },
  info: {
    fontSize: 13,
    color: color.white,
    fontFamily: font.poppinsRegular,
    textAlign: 'center',
    marginVertical: 15,
    paddingHorizontal: 10,
    lineHeight: 22,
  },
  success: {
    fontSize: 14,
    color: color.white,
    fontFamily: font.poppinsMedium,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  rupee: {
    color: color.golden,
  },
  label: {
    fontSize: 22,
    color: color.golden,
    fontFamily: font.poppinsSemiBold,
    textAlign: 'center',
    marginHorizontal: 10,
    marginTop: 15,
  },
  mainView: {
    marginHorizontal: 18,
    marginTop: 15,
  },
  scrollStyle: {
    flexGrow: 1,
  },
});

export default styles;
