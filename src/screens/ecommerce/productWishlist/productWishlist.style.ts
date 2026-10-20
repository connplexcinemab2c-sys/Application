import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.ecomBackground,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistContainer: {
    flexGrow: 1,
    paddingTop: 15,
    paddingHorizontal: 16,
  },
  placeholderWishList: {
    height: 150,
    width: 150,
  },
  contentStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color: color.white,
    fontFamily: font.poppinsMedium,
    textAlign: 'center',
    marginTop: 20,
  },
  description: {
    fontSize: 14,
    color: color.gray,
    fontFamily: font.poppinsRegular,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: font.poppinsMedium,
  },
  buttonWrapper: {
    width: '50%',
    marginTop: 15,
  },
  btnWrapper: {
    borderRadius: 11,
    height: 40,
  },
});

export default styles;
