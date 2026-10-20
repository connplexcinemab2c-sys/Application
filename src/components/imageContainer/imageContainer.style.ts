import {StyleSheet} from 'react-native';
import {color} from '../../theme';

const style = StyleSheet.create({
  imageContainer: {
    flex: 1,
    height: '100%',
  },
  scrollView: {
    flexGrow: 1,
  },
  statusbar: {
    height: 0,
  },
  keyboardAvoid: {
    flex: 1,
  },
  contentContainer: {
    width: '100%',
    backgroundColor: color.transparentBlack,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'flex-end',
  },
  logoImage: {
    height: 58,
    flex: 1,
    alignSelf: 'center',
    paddingVertical: 100,
  },
});

export default style;
