import {StyleSheet} from 'react-native';
import {color, font} from '../../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.ecomBackground,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  checkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 13,
  },
  orderCancelText: {
    fontSize: 20,
    fontFamily: font.poppinsMedium,
    color: color.white,
    lineHeight: 26,
    marginTop: 12,
  },
  orderIdText: {
    fontSize: 14,
    fontFamily: font.poppinsRegular,
    color: color.policyYellow,
    lineHeight: 18,
    marginTop: 6,
  },
  refundContainer: {
    backgroundColor: color.cardBackground,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginTop: 21,
    flexDirection: 'row',
    alignItems: 'center',
  },
  refundText: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.white,
    lineHeight: 18,
  },
  refundPriceText: {
    fontFamily: font.poppinsBold,
    color: color.policyYellow,
  },
  cancelContainer: {
    backgroundColor: color.cardBackground,
    borderTopWidth: 1,
    borderTopColor: color.ecomBorder,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 25,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: color.text,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    flex: 1,
    marginLeft: 4,
  },
  cancelText: {
    fontSize: 14,
    fontFamily: font.poppinsRegular,
    color: color.white,
    lineHeight: 24,
  },
  productCancelImage: {
    width: 61,
    height: 61,
    borderRadius: 6,
  },
  productInfoContainer: {
    marginLeft: 12,
    flex: 1,
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
    alignItems: 'center',
    marginTop: 5,
  },
  colorSizeExchangeText: {
    fontSize: 12,
    fontFamily: font.poppinsBold,
    color: color.policyYellow,
    lineHeight: 18,
  },
  colorSizeQuantityText: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.returnText,
    lineHeight: 18,
    textDecorationLine: 'line-through',
    marginLeft: 9,
  },
});

export default styles;
