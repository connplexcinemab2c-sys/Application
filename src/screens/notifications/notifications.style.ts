import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  indicator: {
    flex: 1,
  },
  titleContainer: {
    flexGrow: 1,
  },
  scrollView: {
    paddingBottom: 20,
  },
  title: {
    paddingBottom: 15,
    paddingTop: 15,
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    color: color.white,
    fontSize: 14,
    fontFamily: font.poppinsLight,
    textAlign: 'center',
  },
});

export default style;
