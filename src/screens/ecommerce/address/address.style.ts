import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.ecomBackground,
  },
  contentContainer: {
    flexGrow: 1,
    marginHorizontal: 16,
    marginTop: 16,
    paddingBottom: 20,
  },
  inputContainer: {
    borderColor: color.whiteBorderLight,
    borderRadius: 10,
    height: 40,
  },
  inputLabelStyle: {
    marginLeft: 5,
    color: color.white,
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: font.poppinsMedium,
  },
  firstLastNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  firstNameInputMainContainer: {
    flex: 1,
    marginRight: 7,
    marginBottom: 7,
  },
  lastNameInputMainContainer: {
    flex: 1,
    marginLeft: 7,
    marginBottom: 7,
  },
  inputMainContainer: {
    marginVertical: 7,
  },
  dot: {
    height: 15,
    width: 15,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDot: {
    height: 15,
    width: 15,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: color.policyYellow,
    backgroundColor: color.policyYellow,
  },
  savedAddressText: {
    color: color.white,
    fontSize: 14,
    fontFamily: font.poppinsMedium,
    marginTop: 5,
    marginBottom: 5,
  },
  selectedAddressText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 12,
    fontFamily: font.poppinsRegular,
  },
  addAddressTouch: {
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: color.grey3A,
    borderTopWidth: 1,
    borderTopColor: color.grey3A,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addAddressText: {
    color: color.white,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: font.poppinsSemiBold,
    marginLeft: 12,
  },
  addressItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
});

export default styles;
