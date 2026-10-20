import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const styles = StyleSheet.create({
  name: {
    color: color.whitef1,
    fontSize: 12,
    fontFamily: font.poppinsMedium,
    fontWeight: '400',
    textAlign: 'center',
    paddingTop: 6,

  },
  imageContainer: {
    height: 65,
    width: 65,
    borderRadius: 65 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  allimage: {
    height: 56,
    width: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    gap: 5,
    width: 65,
  },
});

export default styles;
