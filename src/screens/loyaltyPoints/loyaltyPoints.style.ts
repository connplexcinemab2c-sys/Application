import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: color.inputBackground,
  },
  scrollView: {
    paddingBottom: 20,
  },
  header: {
    paddingBottom: 20,
  },
  progressContainer: {
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 17,
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
    lineHeight: 18,
  },
  flatlistContainer: {
    marginTop: 21,
  },
  contentWrapper: {
    justifyContent: 'space-between',
    marginBottom: 19,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  button: {
    paddingHorizontal: 30,
    width: '100%',
  },
  redeemButton: {
    paddingHorizontal: 30,
    width: '100%',
    borderWidth: 1,
    borderColor: color.redeemColor,
    borderRadius: 30,
  },
  overflow: {
    overflow: 'hidden',
    paddingBottom: 10,
  },
  container: {
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomWidth: 0.5,
    shadowColor: color.shadowColor,
    shadowOffset: {width: -2, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  percentText: {
    fontSize: 50,
    fontFamily: font.poppinsBold,
    color: color.white,
  },
  outOfPoints: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.white,
  },
  rewardText: {
    marginTop: -30,
    fontSize: 16,
    fontFamily: font.poppinsRegular,
    color: color.textsColor,
  },
  rewardBtnCon: {
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
  },
  btnText: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: font.poppinsSemiBold,
  },
  flatlist: {
    marginTop: 20,
    paddingHorizontal: 17,
  },
});

export default style;
