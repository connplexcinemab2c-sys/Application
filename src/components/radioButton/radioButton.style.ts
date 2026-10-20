import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dot: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: color.policyYellow,
  },
  titleText: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.white,
    marginLeft: 10,
  },
});

export default styles;
