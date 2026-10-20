import {StyleSheet} from 'react-native';
import {color} from '../../theme';

const style = StyleSheet.create({
  border: {
    borderBottomWidth: 1,
    borderBottomColor: color.searchBorder,
    shadowColor: color.searchBorder,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowRadius: 5,
    elevation: 20,
  },
});

export default style;
