import {Dimensions, StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const {width, height} = Dimensions.get('window');

const style = StyleSheet.create({
  sliderContent: {
    position: 'relative',
    height: width * 0.7,
    width: width,
  },
  loadStyle: {
    position: 'absolute',
    alignSelf: 'center',
    top: '45%',
  },
  slideImage: {
    height: width * 0.7,
    width: width,
    resizeMode: 'stretch',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  appLogo: {
    height: '100%',
    width: 108,
    resizeMode: 'contain',
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingLeft: 18,
    justifyContent: 'center',
  },
  menu: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: color.transparent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  locationPress: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 5,
  },
  userLocation: {
    fontSize: 12,
    color: color.white,
    fontFamily: font.poppinsMedium,
    lineHeight: 18,
    marginLeft: 7,
    marginRight: 11,
  },
  search: {
    paddingRight: 18,
    paddingVertical: 7,
    paddingLeft: 10,
  },
  filter: {
    padding: 7,
  },
  appIntroContainer: {
    flex: 1,
  },
  dot: {
    backgroundColor: color.introDot,
    top: 20,
  },
  activeDot: {
    backgroundColor: color.introSelectedDot,
    top: 20,
  },
  imageContainer: {
    height: '100%',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    flex: 1,
  },
  releaseContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 60,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 19,
  },
  viewContainer: {
    paddingHorizontal: 18,
    marginTop: 18,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  nowShowing: {
    fontSize: 16,
    fontFamily: font.poppinsMedium,
    color: color.white,
    lineHeight: 27,
    flex: 1,
  },
  viewAllPress: {
    padding: 5,
  },
  viewAll: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.white,
    lineHeight: 21,
  },
  flatlist: {
    marginBottom: 18,
    flexGrow: 0,
  },
  watchButton: {
    height: 45,
    width: 135,
    marginRight: 10,
    borderWidth: 1,
    borderColor: color.buttonBorder,
  },
  bookButton: {
    height: 45,
    width: 135,
    marginLeft: 10,
  },
  release: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    lineHeight: 18,
    color: color.text,
    textAlign: 'center',
    top: 10,
  },
  appIntroStyle: {
    height: height / 1.5,
    paddingBottom: 0,
  },
  imageBanner: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    justifyContent: 'flex-end',
  },
  homeBackground: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  nowShowIndicator: {
    marginTop: 5,
    marginBottom: 10,
  },
  linearGradient: {
    padding: 0,
    width: '100%',
    alignItems: 'center',
  },
  titleText: {
    color: color.white,
    fontSize: 26,
    textAlign: 'center',
    // textTransform: 'capitalize',
    fontFamily: font.poppinsMedium,
    marginHorizontal: 25,
  },
  watchBtnContainer: {
    marginTop: 15,
    marginBottom: 37,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  releasingText: {
    color: color.text,
    fontSize: 13,
    lineHeight: 19,
    textTransform: 'capitalize',
    fontFamily: font.poppinsRegular,
    marginTop: 10,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.white,
    paddingHorizontal: 13,
    paddingVertical: 2,
  },
  typeText: {
    color: color.white,
    fontSize: 10,
    textTransform: 'capitalize',
    fontFamily: font.poppinsRegular,
    lineHeight: 12,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    color: color.white,
    fontSize: 13,
    lineHeight: 20,
    textTransform: 'capitalize',
    fontFamily: font.poppinsRegular,
  },
  detailsContainer: {
    padding: 0,
    width: '100%',
    alignItems: 'center',
  },
  noDataView: {
    flex: 1,
  },
  noTextData: {
    color: color.white,
    fontSize: 14,
    fontFamily: font.poppinsLight,
    textAlign: 'center',
    flex: 1,
  },
  indicator: {
    flex: 1,
  },
  imageDemoStyle: {
    height: 400,
    width: 400,
    resizeMode: 'contain',
    justifyContent: 'center',
    marginTop: 20,
  },
  noPosterView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPosterData: {
    color: color.white,
    fontSize: 20,
    fontFamily: font.poppinsSemiBold,
  },
  containerStyles: {
    flexGrow: 1,
  },
  flatlistContainer: {
    flexGrow: 1,
  },
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.inputBackground,
  },
  modelView: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 50,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  videoSpinner: {
    flex: 1,
    position: 'absolute',
  },
  buttonTitle: {
    fontSize: 12,
    color: color.white,
    fontFamily: font.poppinsSemiBold,
    lineHeight: 18,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusbar: {
    height: 0,
  },
  adTouchable: {
    width: '80%',
    flex: 1,
  },
  progressBarContainer: {
    width: 200,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modal: {
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  imageSpinner: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: 1,
    marginTop: 35,
  },
  poster: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  bannerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 7,
    marginHorizontal: 20,
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: 2,
  },
  progressLine: {
    borderRadius: 3,
  },
  close: {
    alignSelf: 'flex-end',
    padding: 7,
    marginRight: 11,
    marginTop: 2,
  },
});

export default style;
