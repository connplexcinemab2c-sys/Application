import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  rightIconContent: {
    flex: 1,
    alignItems: 'flex-end',
  },
  rightIcon: {
    paddingHorizontal: 18,
    height: 58,
    justifyContent: 'center',
  },
  appLogo: {
    height: '100%',
    width: 108,
    resizeMode: 'contain',
  },
  headerParent: {
    flexDirection: 'row',
    paddingLeft: 18,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  header: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  main: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  back: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 12,
  },
  inputMainContainer: {
    marginVertical: 0,
  },
  inputDivider: {
    flex: 1,
    marginTop: 10,
  },
  searchInput: {
    flexDirection: 'row',
    borderColor: color.secondary,
    paddingRight: 5,
    marginRight: 16,
  },
  inputText: {
    fontSize: 12,
    fontFamily: font.poppinsLight,
    color: color.white,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieList: {
    marginBottom: 19,
  },
  flatlistContainer: {
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: '100%',
    marginLeft: 12,
    paddingLeft: 5,
    paddingRight: 15,
    fontSize: 18,
    fontFamily: font.poppinsMedium,
    lineHeight: 27,
    color: color.white,
  },
  flatListView: {
    flexGrow: 1,
    marginLeft: 16,
    marginRight: 8,
    marginTop: 18,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noData: {
    color: color.white,
    fontSize: 14,
    fontFamily: font.poppinsLight,
    textAlign: 'center',
  },
});

export default style;
