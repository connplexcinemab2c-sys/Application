import {Dimensions, StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const {height} = Dimensions.get('window');

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  main: {
    flex: 1,
    backgroundColor: color.inputBackground,
    marginHorizontal: 18,
  },
  container: {
    flex: 1,
  },
  noImage: {
    width: '100%',
    height: height / 2,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  common: {
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
    paddingTop: 8,
  },
  noData: {
    color: color.white,
    fontSize: 14,
    fontFamily: font.poppinsLight,
    textAlign: 'center',
  },
  parentView: {
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: color.white,
  },
    priceDurationTextStyle: {
    fontSize: 12,
    color: color.black,
    fontFamily: font.poppinsSemiBold,
  },
  priceDurationText: {
    fontSize: 12,
    color: color.black,
    fontFamily: font.poppinsSemiBold,
        textDecorationLine: 'line-through',
  },
  durationText: {
    fontSize: 10,
    fontFamily: font.poppinsRegular,
    color: color.black,

  },
  titleText: {
    fontSize: 14,
    color: color.black,
    fontFamily: font.poppinsSemiBold,
    flex: 1,
  },
  labelText: {
    fontSize: 11,
    color: color.black,
    fontFamily: font.poppinsMedium,
  },
  labelPriceDurationText: {
    fontSize: 11,
    color: color.black,
    fontFamily: font.poppinsMedium,
    flex: 1,
    textAlign: 'right',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  planText: {
    fontSize: 12,
    color: color.black,
    fontFamily: font.poppinsRegular,
    marginTop: 8,
    lineHeight: 22,
  },
  flatListParent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceContainer: {
    borderWidth: 1,
    // width: 100,
    paddingHorizontal:8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
    borderRadius: 14,
    borderColor: color.black,
  },
  lineView: {
    height: 0.8,
    width: '100%',
    marginTop: 8,
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    borderColor: color.secondary,
    paddingRight: 5,
  },
  input: {
    fontSize: 12,
    fontFamily: font.poppinsLight,
    color: color.white,
  },
  inputMainContainer: {
    marginVertical: 0,
    marginBottom:12,
  },
  actionEyeIcon: {
    fontSize: 18,
    color: color.black,
  },
});

export default style;
