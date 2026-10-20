import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: color.inputBackground,
  },
  scrollView: {
    paddingBottom: 20,
  },
  containerStyle: {
    paddingHorizontal: 10,
    flex: 1,
  },
  sheetContainer: {
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    height: '70%',
    backgroundColor: color.white,
    borderBottomWidth: 0.5,
    padding: 10,
    paddingTop: 15,
    borderColor: 'black',
  },
  sheetViewStyle: {
    flex: 1,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: color.black,
    fontFamily: font.poppinsSemiBold,
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
  },
  modelView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonTitle: {
    textTransform: 'capitalize',
    fontFamily: font.poppinsRegular,
  },
  termsScroll: {
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  textContent: {
    fontFamily: font.poppinsRegular,
    fontSize: 12,
    color: color.black,
    lineHeight: 24,
  },
  textStyle: {
    fontFamily: font.poppinsSemiBold,
    fontSize: 13,
    color: color.black,
    paddingTop: 10,
  },
  text: {
    fontFamily: font.poppinsRegular,
    fontSize: 12,
    color: color.black,
    lineHeight: 24,
    paddingTop: 10,
  },
  titleContainer: {
    marginLeft: 13,
    marginRight: 20,
  },
  screen: {
    width: '100%',
    height: 145,
    marginTop: 5,
    marginBottom: -40,
  },
  seatTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 27,
    backgroundColor: color.inputBackground,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 9,
  },
  seatType: {
    fontSize: 12,
    fontFamily: font.poppinsLight,
    color: color.white,
    lineHeight: 18,
    marginLeft: 5,
    textAlign: 'left',
  },
  dateTimeContainer: {
    paddingHorizontal: 18,
    backgroundColor: color.inputBackground,
  },
  selectDate: {
    fontSize: 14,
    fontFamily: font.poppinsMedium,
    color: color.white,
    lineHeight: 21,
    marginVertical: 13,
  },
  datePress: {
    marginRight: 13,
    borderRadius: 10,
  },
  dateView: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: color.timeBorder,
    borderRadius: 10,
  },
  month: {
    fontSize: 15,
    fontFamily: font.poppinsLight,
    color: color.white,
    lineHeight: 23,
    textAlign: 'center',
  },
  date: {
    fontSize: 23,
    fontFamily: font.poppinsMedium,
    color: color.white,
    lineHeight: 34,
    textAlign: 'center',
  },
  flatlistContent: {
    paddingBottom: 10,
  },
  timePress: {
    marginRight: 7,
    marginBottom: 9,
    borderRadius: 30,
  },
  timeView: {
    borderRadius: 30,
    borderWidth: 1,
  },
  timeActivePress: {
    marginRight: 8,
    marginBottom: 12,
    borderRadius: 30,
  },
  time: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.white,
    lineHeight: 18,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 22,
  },
  container: {
    flex: 1,
  },
  total: {
    fontSize: 14,
    fontFamily: font.poppinsRegular,
    color: color.white,
    lineHeight: 21,
  },
  noOfSeats: {
    fontSize: 10,
    fontFamily: font.poppinsLight,
    color: color.locationText,
    lineHeight: 15,
  },
  rupees: {
    fontSize: 18,
    fontFamily: font.poppinsLight,
    color: color.white,
    lineHeight: 34,
  },
  price: {
    fontSize: 23,
    fontFamily: font.poppinsMedium,
    color: color.white,
    lineHeight: 34,
  },
  button: {
    width: 170,
    flexDirection: 'row',
  },
  buttonText: {
    width: 130,
    height: 40,
    marginBottom: 10,
  },
  layoutContainer: {
    alignSelf: 'center',
  },
  scrollViewStyle: {
    flexGrow: 1,
  },
  seatIndicatorStyle: {
    flex: 1,
  },
  borderViewStyle: {
    borderWidth: 1,
    borderColor: color.text,
    borderTopStartRadius: 30,
    borderTopEndRadius: 20,
  },
  noDataView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTextData: {
    color: color.white,
    fontSize: 14,
    fontFamily: font.poppinsLight,
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
  },
  containerStyles: {
    flexGrow: 1,
  },
  seatHeader: {
    fontSize: 12,
    color: color.white,
    textAlign: 'center',
    fontFamily: font.poppinsSemiBold,
    textTransform: 'uppercase',
    marginTop: 40,
    position: 'absolute',
    alignSelf: 'center',
  },
  timeShowView: {
    backgroundColor: color.inputBackground,
    paddingHorizontal: 18,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.4,
  },
  border: {
    borderWidth: 0.3,
    marginBottom: 4,
  },
  seatTypeText: {
    fontSize: 9,
    color: color.imdbBackground,
    textAlign: 'center',
    fontFamily: font.poppinsRegular,
    marginTop: 3,
    marginBottom: -3,
  },
});

export default style;
