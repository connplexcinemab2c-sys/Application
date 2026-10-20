import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const style = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  inputContainer: {
    flexDirection: 'row',
    borderColor: color.secondary,
    paddingRight: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 12,
  },
  inputDivider: {
    flex: 1,
    marginTop: 10,
    marginRight: 18,
  },
  input: {
    fontSize: 12,
    fontFamily: font.poppinsLight,
    color: color.white,
  },
  onDemand: {
    fontSize: 12,
    fontFamily: font.poppinsMedium,
    color: color.white,
    marginTop: 10,
  },
  flatlist: {
    marginTop: 18,
  },
  activityIndicatorStyle: {
    flex: 1,
  },
  noDataView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noTextData: {
    color: color.white,
    fontSize: 14,
    fontFamily: font.poppinsLight,
    textAlign: 'center',
  },
  containerStyle: {
    flexGrow: 1,
  },
});

export default style;
