import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const style = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  backHomeContainer: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 12,
  },
  inputDivider: {
    flex: 1,
    marginTop: 10,
    marginRight: 18,
  },
  mainContainer: {
    backgroundColor: color.inputBackground,
  },
  scrollView: {
    paddingBottom: 20,
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
  back: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: color.transparent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 18,
    flex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 15,
    paddingBottom: 25,
  },
  locationText: {
    color: color.locationText,
    fontSize: 17,
    fontFamily: font.poppinsMedium,
    marginLeft: 11,
  },
  indicator: {
    paddingVertical: 3,
  },
  currentLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularText: {
    color: color.white,
    fontSize: 17,
    fontFamily: font.poppinsMedium,
    marginTop: 20,
    marginBottom: 9,
  },
  flatlist: {
    marginBottom: 25,
  },
  activityIndicatorStyle: {
    marginVertical: 20,
    paddingBottom: 30,
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
  containerStyles: {
    flexGrow: 1,
  },
  border: {
    borderWidth: 0.3,
  },
  backHome: {
    marginHorizontal: 50,
    marginBottom: 30,
    marginTop: 10,
  },
});

export default style;
