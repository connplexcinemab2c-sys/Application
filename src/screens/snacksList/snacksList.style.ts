import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  scrollView: {
    flexGrow: 1,
  },
  tabContent: {
    flexGrow: 1,
    paddingLeft: 10,
    paddingRight: 17,
    paddingBottom: 15,
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: font.poppinsMedium,
    color: color.white,
  },
  headerLabel: {
    fontSize: 14,
    fontFamily: font.poppinsMedium,
    color: color.white,
  },
  tabParent: {
    height: 30,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: color.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 7,
    marginTop: 5,
  },
  header: {
    paddingBottom: 20,
  },
  titleContainer: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
    paddingHorizontal: 17,
  },
  inputContainer: {
    flexDirection: 'row',
    borderColor: color.secondary,
    paddingRight: 5,
    marginHorizontal: 17,
  },
  input: {
    fontSize: 12,
    fontFamily: font.poppinsLight,
    color: color.white,
  },
  flatlistContainer: {
    marginTop: 15,
    flexGrow: 1,
    paddingBottom: 100,
  },
  contentWrapper: {
    justifyContent: 'space-between',
    marginBottom: 19,
  },
  addToCart: {
    backgroundColor: color.bottomBackground,
    paddingHorizontal: 20,
    paddingTop: 27,
    paddingBottom: 23,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
  },
  noTextData: {
    color: color.white,
    fontSize: 14,
    fontFamily: font.poppinsRegular,
    textAlign: 'center',
  },
  listEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    color: color.white,
    fontFamily: font.poppinsRegular,
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
  },
  timerContainer: {
    paddingVertical: 8,
  },
});

export default style;
