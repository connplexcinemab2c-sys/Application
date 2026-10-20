import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: color.inputBackground,
  },
  scrollView: {
    paddingBottom: 20,
  },
  header: {
    marginTop: 10,
    paddingBottom: 20,
    paddingTop: 28,
  },
  titleContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  borderView: {
    marginHorizontal: 20,
  },
  keyboardAvoid: {
    flex: 1,
  },
  button: {
    marginTop: 30,
    width: '60%',
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
  },
  textInputStyle: {
    paddingHorizontal: 15,
  },
  editNumber: {
    color: color.white,
    fontSize: 15,
    fontFamily: font.poppinsSemiBold,
    marginVertical: 10,
    marginLeft: 10,
  },
});

export default style;
