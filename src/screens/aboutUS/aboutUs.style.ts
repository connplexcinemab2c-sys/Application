import {StyleSheet} from 'react-native';
import {color} from '../../theme';

const style = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: color.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  title: {
    paddingBottom: 15,
    paddingTop: 15,
  },
  container: {
    flex: 1,
    backgroundColor: color.black,
  },
});

export default style;
