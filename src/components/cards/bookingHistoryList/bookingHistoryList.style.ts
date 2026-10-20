import { StyleSheet } from 'react-native';
import { color, font } from '../../../theme';

const style = StyleSheet.create({
  downloadImage: {
    position: 'absolute',
    alignItems: 'flex-end',
    right: -14,
    top: -11,
  },
  downloadParent: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    borderBottomLeftRadius: 14,
    paddingBottom: 5,
    paddingHorizontal: 3,
    borderTopRightRadius: 5,
  },
  hideArrow: {
    flexDirection: 'row',
    paddingVertical: 8,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderTopColor: color.border,
  },
  container: {
    marginHorizontal: 18,
    backgroundColor: color.white,
    borderRadius: 5,
    paddingLeft: 7,
    paddingRight: 14,
    marginBottom: 20,
  },
  mainContainer: {
    flexDirection: 'row',
  },
  download: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },
  image: {
    height: '90%',
    width: 80,
    borderRadius: 5,
    marginVertical: 6,
  },
  semiCircleContainer: {
    marginLeft: 7,
  },
  topContainer: {
    flex: 1,
  },
  topSemiCircle: {
    width: 25,
    height: 15,
    backgroundColor: color.inputBackground,
    overflow: 'hidden',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  border: {
    borderLeftWidth: 1,
    borderLeftColor: 'black',
    borderStyle: 'dashed',
    height: 130,
    alignSelf: 'center',
    marginVertical: 3,
    overflow: 'hidden',
  },
  bottomSemiCircle: {
    width: 25,
    height: 15,
    backgroundColor: color.inputBackground,
    overflow: 'hidden',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  detailsContainer: {
    marginVertical: 11,
    marginLeft: 16,
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontFamily: font.poppinsSemiBold,
    color: color.black,
    lineHeight: 21,
    marginRight: 15,
    // textTransform: 'capitalize',
  },
  time: {
    fontSize: 10,
    fontFamily: font.poppinsRegular,
    color: color.black,
    lineHeight: 12,
  },
  totalTickets: {
    fontSize: 28,
    fontFamily: font.poppinsSemiBold,
    color: color.black,
    lineHeight: 42,
    marginTop: 16,
    textAlign: 'center',
  },
  ticketContainer: {
    alignSelf: 'flex-start',
  },
  tickets: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.black,
    lineHeight: 18,
  },
  priceContainer: {
    alignItems: 'flex-end',
    position: 'absolute',
    right: 11,
    bottom: 0,
    top: 0,
    marginTop: 11,
    marginBottom: 7,
  },
  priceView: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  price: {
    fontSize: 13,
    fontFamily: font.poppinsMedium,
    color: color.black,
    flex: 1,
  },
  foodPrice: {
    fontSize: 8,
    fontFamily: font.poppinsMedium,
    color: color.black,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default style;
