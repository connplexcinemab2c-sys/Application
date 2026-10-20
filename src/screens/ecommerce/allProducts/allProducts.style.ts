import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.ecomBackground,
  },
  flatlistContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 15,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorStyle: {
    marginVertical: 5,
  },
  contentStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderWishList: {
    height: 150,
    width: 150,
  },
  title: {
    fontSize: 16,
    fontFamily: font.poppinsMedium,
    color: color.white,
    marginTop: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontFamily: font.poppinsRegular,
    color: color.whiteC6,
    lineHeight: 22,
    marginTop: 2,
    textAlign: 'center',
  },
});

export default styles;
