import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.black,
  },
  backgroundImageContainer: {
    height: '100%',
    width: '100%',
  },
  searchInputContainer: {
    height: 42,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: color.inputColor,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: color.borderColorLight,
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 1,
    color: color.white + '99',
    fontSize: 14,
    fontFamily: font.poppinsMedium,
    marginLeft: 10,
    paddingVertical: 0,
    height: '100%',
  },
  searchIcon: {
    height: 20,
    width: 20,
  },
  closeIcon: {
    backgroundColor: color.whiteBorderLight,
    padding: 2,
    borderRadius: 20,
    marginLeft: 10,
  },
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBannerImage: {
    height: 250,
    width: '100%',
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexGrow: 1,
  },
  appBannerView: {},
  welcomeBox: {
    height: 30,
    borderRadius: 15,
    backgroundColor: color.goldenYellow,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  welcomeLabel: {
    color: color.black,
    fontSize: 14,
    fontFamily: font.poppinsMedium,
    includeFontPadding: false,
  },
  welcomeDescriptionDark: {
    fontSize:31,
    fontFamily: font.AbhayaLibreRegular,
    color: color.golden,
    marginTop: 15,
    textAlign: 'center',
  },
  welcomeDescriptionLight: {
    color: color.white,
    textAlign: 'center',
    fontSize:31,
  },
  sectionTitle: {
    color: color.white,
    fontSize: 16,
    fontFamily: font.poppinsMedium,
  },
  viewAllTitle: {
    color: color.goldenYellow,
    fontSize: 14,
    fontFamily: font.poppinsMedium,
    fontWeight: '400',
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  categoryContainer: {
    marginHorizontal:8,
    marginVertical: 15,
  },
  popularList: {
    marginHorizontal:8,
    marginTop: 15,
  },
  collectionBanner: {
    height: 147,
    marginHorizontal: 16,
    marginBottom: 15,
  },
  intakeShadow: {
    height: 147,
    borderRadius: 10,
  },
  bannerName: {
    color: color.white,
    fontSize: 18,
    fontFamily: font.poppinsMedium,
    fontWeight: '500',
  },
  bannerDes: {
    color: color.white,
    fontSize: 14,
    fontFamily: font.poppinsMedium,
    fontWeight: '400',
  },
  exploreBtn: {
    color: color.goldenYellow,
    fontSize: 12,
    fontFamily: font.poppinsMedium,
    fontWeight: '400',
    textDecorationLine: 'underline',
    textDecorationColor: color.goldenYellow,
  },
  collectionView: {
    marginHorizontal: 10,
    marginTop: 20,
    width: '48%',
  },
  noResultsText: {
    color: color.white,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  suggestionContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  suggestionText: {
    color: color.gray,
    fontSize: 14,
    marginVertical: 2,
  },
});

export default styles;
