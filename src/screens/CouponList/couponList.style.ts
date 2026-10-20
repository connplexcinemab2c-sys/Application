import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  titleContainer: {
    marginLeft: 13,
  },
  indicatorStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    color: color.black,
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    marginTop: 7,
    marginRight: 8,
    lineHeight: 20,
  },
  lineView: {
    height: 0.8,
    backgroundColor: color.lightGray,
    marginVertical: 8,
  },
  offText: {
    color: color.black,
    fontSize: 11,
    fontFamily: font.poppinsMedium,
    marginTop: 2,
  },
  applyText: {
    color: color.golden,
    fontSize: 12,
    fontFamily: font.poppinsSemiBold,
  },
  applyContent: {
    paddingHorizontal: 15,
  },
  couponText: {
    color: color.black,
    fontSize: 16,
    fontFamily: font.poppinsSemiBold,
    flex: 1,
  },
  couponDivider: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  couponParent: {
    paddingHorizontal: 8,
    paddingVertical: 15,
    flex: 1,
  },
  offerText: {
    color: color.black,
    fontSize: 13,
    fontFamily: font.poppinsSemiBold,
    textAlign: 'center',
    transform: [{rotate: '270deg'}],
  },
  parentView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  divider: {
    marginBottom: 15,
    backgroundColor: color.white,
    borderRadius: 8,
    flexDirection: 'row',
  },
  containerStyle: {
    flexGrow: 1,
    paddingHorizontal: 18,
    marginTop: 15,
    paddingBottom: 60,
  },
  noTextData: {
    color: color.white,
    fontSize: 14,
    fontFamily: font.poppinsLight,
    textAlign: 'center',
  },
});

export default styles;
