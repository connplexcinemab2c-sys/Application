import { StyleSheet } from 'react-native';
import { color, font } from '../../theme';

const style = StyleSheet.create({
  header: {
    marginTop: 10,
    paddingBottom: 20,
  },
  background: {
    flex: 1,
  },
  button: {
    marginVertical: 30,
    width: '60%',
    alignSelf: 'center',
    marginBottom: 70,
  },
  termsContainer: {
    flexDirection: 'row',
  },
  check: {
    paddingRight: 10,
    paddingVertical: 17,
    alignSelf: 'flex-start',
  },
  terms: {
    fontSize: 10,
    color: color.secondary,
    fontFamily: font.poppinsLight,
    lineHeight: 16,
    flex: 1,
    marginTop: 15,
  },
  inputContainerStyle: {
    marginHorizontal: 20,
    marginVertical: 10,
    marginBottom: 80,
  },
  scrollStyle: {
    flexGrow: 1
  }
});

export default style;
