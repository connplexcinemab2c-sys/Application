import { StyleSheet } from 'react-native';
import { color, font } from '../../theme';

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingBottom: 15,
    paddingTop: 15,
  },
  flatlistContainer: {
    flexGrow: 1,
    paddingTop: 14,
    paddingBottom: 20,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noData: {
    color: color.white,
    fontSize: 14,
    fontFamily: font.poppinsLight,
    textAlign: 'center',
  },
});

export default style;
