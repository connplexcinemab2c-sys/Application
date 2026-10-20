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
    paddingBottom: 40,
  },
  contentStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderWishList: {
    height: 180,
    width: 180,
  },
  title: {
    fontSize: 20,
    fontFamily: font.poppinsSemiBold,
    color: color.white,
    textAlign: 'center',
    marginTop: 20,
  },
  description: {
    fontSize: 14,
    fontFamily: font.poppinsRegular,
    color: color.whiteC6,
    textAlign: 'center',
    marginTop: 5,
  },
  buttonContainer: {
    width: '100%',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: font.poppinsMedium,
  },
  buttonWrapper: {
    marginTop: 15,
  },
  btnWrapper: {
    borderRadius: 11,
    height: 40,
  },
  buttonWidth: {
    width: '70%',
  },
});

export default styles;
