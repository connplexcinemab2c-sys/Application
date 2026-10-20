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
});

export default styles;
