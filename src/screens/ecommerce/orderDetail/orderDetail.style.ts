import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.ecomBackground,
  },
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 25,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 10,
    color: color.white,
    fontFamily: font.poppinsMedium,
    lineHeight: 12,
  },
  flex: {
    flex: 1,
  },
  dateText: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.textColor,
  },
  itemDetailContainer: {
    backgroundColor: color.cardBackground,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 107,
    height: 107,
    borderRadius: 12,
    resizeMode:"stretch"
  },
  productInfoContainer: {
    marginLeft: 12,
    flex: 1,
  },
  borderView: {
    height: 1,
    backgroundColor: color.ecomBorder,
    marginVertical: 8,
  },
  idText: {
    fontSize: 12,
    fontFamily: font.poppinsMedium,
    color: color.returnText,
    lineHeight: 18,
  },
  productNameText: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: font.poppinsMedium,
    color: color.white,
    lineHeight: 17,
  },
  dataDetailContainer: {
    flexDirection: 'row',
    alignItems:'flex-start',
    justifyContent:"flex-start",
    width:'80%'
  },
  colorSizeQuantityText: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.returnText,
    lineHeight: 18,
    textAlign: 'left',
    flex: 1,
  },
  colorSizeQuantityDetailText: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.white,
    lineHeight: 18,
    // textAlign: 'left',
    flex: 1,
  },
  addressText: {
    marginTop: 16,
    fontSize: 14,
    fontFamily: font.poppinsMedium,
    color: color.white,
  },
  addressDataContainer: {
    backgroundColor: color.cardBackground,
    borderRadius: 16,
    padding: 13,
    paddingTop: 7,
    marginTop: 5,
  },
  nameMobileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerName: {
    fontSize: 14,
    fontFamily: font.poppinsMedium,
    color: color.white,
    flex: 1,
  },
  customerMobile: {
    fontSize: 14,
    fontFamily: font.poppinsRegular,
    color: color.white,
    flex: 1,
  },
  sideBorder: {
    height: 22,
    width: 1,
    backgroundColor: color.ecomBorder,
    marginHorizontal: 10,
  },
  customerAddress: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.returnText,
    lineHeight: 18,
    marginTop: 11,
  },
  trackingText: {
    fontSize: 14,
    fontFamily: font.poppinsMedium,
    color: color.white,
    lineHeight: 24,
    // marginTop: 15,
  },
  totalPriceText: {
    fontSize: 16,
    fontFamily: font.poppinsMedium,
    color: color.white,
    lineHeight: 24,
    marginTop: 16,
    marginBottom: 12,
  },
  priceDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceTypeText: {
    fontSize: 14,
    fontFamily: font.poppinsRegular,
    color: color.returnText,
    textAlign: 'left',
    flex: 1,
  },
  priceDetailText: {
    fontSize: 14,
    fontFamily: font.poppinsMedium,
    color: color.white,
    textAlign: 'right',
    flex: 1,
  },
  totalPaidText: {
    fontSize: 14,
    fontFamily: font.poppinsSemiBold,
    color: color.white,
    textAlign: 'left',
    flex: 1,
  },
  totalDetailText: {
    fontSize: 16,
    fontFamily: font.poppinsSemiBold,
    color: color.text,
    textAlign: 'right',
    flex: 1,
  },
  paymentMethodContainer: {
    backgroundColor: color.cardBackground,
    borderRadius: 5,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 5,
  },
  paymentMethodText: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.white,
    lineHeight: 18,
    marginLeft: 10,
  },
  otherItemsText: {
    fontSize: 16,
    fontFamily: font.poppinsMedium,
    color: color.white,
    lineHeight: 24,
    marginTop: 16,
  },
  otherItemDetailContainer: {
    backgroundColor: color.cardBackground,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImageOtherItem: {
    width: 87,
    height: 87,
    borderRadius: 12,
  },
  exchangeReturnContainer: {
    // backgroundColor: color.cardBackground,
    // borderTopWidth: 1,
    // borderTopColor: color.ecomBorder,
    // flexDirection: 'row',
    // alignItems: 'center',
    // paddingHorizontal: 20,
    // paddingTop: 8,
    // paddingBottom: 24,
  },
  exchangeButton: {
    borderWidth: 1,
    borderColor: color.text,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    flex: 1,
    marginRight: 4,
  },
  exchangeText: {
    fontSize: 14,
    fontFamily: font.poppinsRegular,
    color: color.white,
    lineHeight: 24,
  },
  returnButton: {
    borderWidth: 1,
    borderColor: color.text,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    flex: 1,
    marginLeft: 4,
  },
  returnText: {
    fontSize: 14,
    fontFamily: font.poppinsRegular,
    color: color.white,
    lineHeight: 24,
  },

  //  new ======================
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    // marginBottom: 30,
  },
  markerColumn: {
    alignItems: 'center',
    width: 30,
  },
  marker: {
    height: 14,
    width: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#ccc',
    // marginTop: 3,
    zIndex: 1,
  },
  activeMarker: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  completedMarker: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  defaultMarker: {
    backgroundColor: '#facc15',
  },
  verticalLine: {
    width: 2,
    height:30,
    // marginTop: 2,
  },
  completedLine: {
    backgroundColor: '#22c55e',
    
  },
  defaultLine: {
    backgroundColor: '#facc15',
  },
  labelColumn: {
    marginLeft: 5,
    flex: 1,
  },
});

export default styles;
