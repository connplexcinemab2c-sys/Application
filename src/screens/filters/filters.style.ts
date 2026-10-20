import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: color.inputBackground,
  },
  scrollView: {
    paddingBottom: 20,
  },
  title: {
    flex: 1,
    marginLeft: 13,
  },
  languages: {
    fontSize: 16,
    color: color.white,
    fontFamily: font.poppinsRegular,
    lineHeight: 25,
  },
  container: {
    paddingHorizontal: 18,
  },
  languageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 18,
  },
  languageTouch: {
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 11,
  },
  buttonContainer: {
    borderColor: color.timeBorder,
    borderWidth: 0.8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  name: {
    fontSize: 12,
    color: color.white,
    fontFamily: font.poppinsRegular,
    lineHeight: 18,
  },
});

export default style;
