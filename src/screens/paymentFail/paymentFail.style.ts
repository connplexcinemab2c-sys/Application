import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  title: {
    paddingBottom: 15,
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 10,
  },
  imageStyle: {
    width: '90%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  info: {
    fontSize: 13,
    color: color.white,
    fontFamily: font.poppinsRegular,
    marginTop: 15,
    padding: 10,
    borderRadius: 8,
    lineHeight: 22,
  },
  label: {
    fontSize: 24,
    color: color.white,
    fontFamily: font.poppinsSemiBold,
    textAlign: 'center',
    marginTop: 15,
    marginHorizontal: 10,
  },
  mainView: {
    marginHorizontal: 18,
  },
  scrollStyle: {
    flexGrow: 1,
  },
  main: {
    flex: 1,
  },
  detailButton: {
    flex: 1,
    marginRight: 16,
  },
  button: {
    borderColor: color.white,
    borderWidth: 1,
  },
  homeButton: {
    borderColor: color.inputBackground,
    borderWidth: 1,
  },
  buttonView: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default styles;
