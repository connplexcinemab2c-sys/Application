import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  title: {
    paddingBottom: 15,
    paddingTop: 15,
  },
  scrollView: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  keyboard: {
    flex: 1,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  check: {
    paddingRight: 10,
    paddingVertical: 17,
    alignSelf: 'flex-start',
  },
  termsContainer: {
    flexDirection: 'row',
  },
  terms: {
    fontSize: 10,
    color: color.secondary,
    fontFamily: font.poppinsLight,
    lineHeight: 16,
    flex: 1,
    marginTop: 15,
  },
  button: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 30,
    height: 40,
  },
  buttonTitle: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
});

export default style;
