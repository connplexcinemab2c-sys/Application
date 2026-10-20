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
  contentContainer: {
    flexGrow: 1,
  },
  addAddress: {
    marginRight: 20,
    flex: 1,
  },
  linearBox: {
    height: 112,
    marginHorizontal: 16,
    borderRadius: 18,
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  homeIcon: {
    backgroundColor: color.bronze,
    height: 80,
    width: 80,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addLabel: {
    fontSize: 12,
    color: color.black,
    fontFamily: font.poppinsSemiBold,
  },
  address: {
    fontSize: 10,
    color: color.black,
    fontFamily: font.poppinsRegular,
  },
  editAddress: {
    fontSize: 10,
    color: color.white,
    fontFamily: font.poppinsMedium,
  },
  editAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.black,
    height: 35,
    gap: 5,
    borderRadius: 20,
    paddingHorizontal: 10,
    borderWidth: 1.5,
    borderColor: color.goldenYellow,
    marginTop: 10,
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 5,
    width: '70%',
  },
  cartItemsStyles: {
    marginHorizontal: 16,
    flex: 1,
  },
  footerDock: {
    backgroundColor: color.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingBottom: 15,
  },
  dockLabel: {
    fontSize: 15,
    color: color.cartLabels,
    fontFamily: font.poppinsMedium,
  },
  totalCost: {
    fontSize: 15,
    color: color.black,
    fontFamily: font.poppinsSemiBold,
  },
  couponValueLabel: {
    fontSize: 16,
    color: color.couponGreen,
    fontFamily: font.poppinsMedium,
    lineHeight: 24,
    fontWeight: '500',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  sapline: {
    height: 1,
    backgroundColor: color.approxSolitude,
    marginHorizontal: 16,
    marginVertical: 7,
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginTop: 15,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: font.poppinsMedium,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderWishList: {
    height: 150,
    width: 150,
  },
  emptyLabel: {
    fontSize: 16,
    color: color.white,
    fontFamily: font.poppinsMedium,
    marginTop: 20,
  },
  flatlistContainer: {
    flexGrow: 1,
  },
  emptySubLabel: {
    fontSize: 14,
    color: color.gray,
    fontFamily: font.poppinsRegular,
  },
  btnContainer: {
    width: '100%',
  },
  buttonWrapper: {
    width: '50%',
    marginTop: 15,
  },
  btnWrapper: {
    borderRadius: 11,
    height: 40,
  },
  couponApplyButtonMainContainer: {
    width: '25%',
  },
  couponApplyButtonContainer: {
    borderRadius: 7,
    height: 30,
    borderWidth: 1,
  },
  apply: {
    fontFamily: font.poppinsMedium,
  },
  couponInput: {
    flex: 1,
    paddingHorizontal: 8,
    paddingRight: 20,
    fontSize: 14,
    fontFamily: font.poppinsMedium,
    color: color.cartLabels,
    paddingVertical: 0,
  },
  couponModuleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(74,74,74,0.25)',
    borderRadius: 8,
    paddingHorizontal: 6,
    height: 42,
    marginBottom: 10,
  },
});

export default styles;
