import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  scrollView: {
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 18,
    height: 60,
  },
  appLogo: {
    height: '100%',
    width: 108,
    resizeMode: 'contain',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 5,
  },
  title: {
    fontSize: 15,
    fontFamily: font.poppinsMedium,
    color: color.white,
    lineHeight: 27,
    marginRight: 5,
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
  inputMainContainer: {
    marginVertical: 0,
  },
  cityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  city: {
    fontSize: 10,
    fontFamily: font.poppinsRegular,
    color: color.white,
    lineHeight: 16,
    marginRight: 5,
  },
  search: {
    paddingRight: 18,
    paddingVertical: 7,
    paddingLeft: 10,
  },
  flatlist: {
    marginTop: 17,
  },
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.transparentBlack,
  },
  modelView: {
    position: 'absolute',
    top: 60,
    right: 25,
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
  noDataView: {
    flex: 1,
    justifyContent: 'center',
  },
  noTextData: {
    color: color.white,
    fontSize: 16,
    fontFamily: font.poppinsRegular,
    textAlign: 'center',
  },
  nowShowIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerStyles: {
    flexGrow: 1,
  },
});

export default style;
