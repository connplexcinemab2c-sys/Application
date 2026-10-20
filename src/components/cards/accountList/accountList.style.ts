import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const style = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingBottom: 15,
  },
  icon: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    borderWidth: 0.8,
    borderColor: color.borderColor,
    borderRadius: 5,
  },
  title: {
    fontSize: 14,
    color: color.white,
    fontFamily: font.poppinsRegular,
    marginLeft: 15,
    flex: 1,
  },
  border: {
    marginTop: 4,
    marginBottom: 18,
    borderWidth: 0.3,
  },
});

export default style;
