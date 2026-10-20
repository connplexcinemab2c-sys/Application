import {StyleSheet, Platform} from 'react-native';
import {color, font} from '../../../theme';

const style = StyleSheet.create({
  mainContainer: {
    height: 63,
    backgroundColor: color.bottomBackground,
    flexDirection: 'row',
    paddingHorizontal: 31,
    justifyContent: 'space-between',
  },
  itemBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 10,
    backgroundColor: color.bottomBackground,
    height: Platform.OS == 'ios' ? 70 : 60,
  },
  borderRadiusView: {
    borderRadius: 9,
    borderWidth: 4,
    top: 5,
    marginStart: -4,
  },
  title: {
    fontSize: 9,
    fontFamily: font.poppinsRegular,
    lineHeight: 13,
    marginTop: 6,
  },
  topIndicator: {
    width: 37,
    height: 4,
    borderRadius: 10,
    alignSelf: 'center',
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default style;
