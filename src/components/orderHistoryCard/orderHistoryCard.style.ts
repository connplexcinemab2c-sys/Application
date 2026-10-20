import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: color.cardBackground,
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 16,
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
  productDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  productImage: {
    height: 56,
    width: 56,
    borderRadius: 12,
    resizeMode:"stretch"
  },
  productNameQuantityContainer: {
    marginLeft: 12,
    marginRight: 8,
    flex: 1,
  },
  productNameText: {
    fontSize: 14,
    fontFamily: font.poppinsRegular,
    color: color.white,
    lineHeight: 17,
  },
  quantityText: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.textColor,
    lineHeight: 18,
  },
  priceText: {
    fontSize: 14,
    fontFamily: font.poppinsSemiBold,
    color: color.white,
    lineHeight: 21,
  },
  borderView: {
    height: 1,
    backgroundColor: color.ecomBorder,
    marginVertical: 10,
  },
  exchangeReturnText: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.returnText,
    lineHeight: 18,
  },
  idText: {
    fontSize: 12,
    fontFamily: font.poppinsSemiBold,
    color: color.lightWhiteA3,
    lineHeight: 18,
  },
  orderIdText: {
    color: color.white,
  },
  orderDetailBtn: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: color.text,
    borderRadius: 6,
  },
  orderDetailText: {
    fontSize: 12,
    fontFamily: font.poppinsSemiBold,
    color: color.white,
    lineHeight: 18,
  },
});

export default styles;
