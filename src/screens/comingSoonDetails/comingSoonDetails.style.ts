import {Dimensions, StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const {height} = Dimensions.get('window');

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  scrollView: {
    paddingBottom: 20,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  backgroundImage: {
    height: height / 1.75,
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
  appLogo: {
    height: '100%',
    width: 108,
    resizeMode: 'contain',
  },
  header: {
    flexDirection: 'row',
    paddingLeft: 18,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
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
  container: {
    paddingLeft: 18,
    paddingRight: 10,
  },
  backContainer: {
    flex: 1,
    paddingTop: 5,
  },
  homeBackground: {
    height: '100%',
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 19,
    marginTop: 15,
  },
  title: {
    fontSize: 26,
    fontFamily: font.poppinsMedium,
    color: color.white,
    lineHeight: 35,
    flex: 1,
  },
  time: {
    fontSize: 10,
    fontFamily: font.poppinsLight,
    color: color.white,
    lineHeight: 16,
    marginLeft: 7,
  },
  movieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  movieTypeButton: {
    backgroundColor: color.transparent,
    borderColor: color.white,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 13,
    marginRight: 7,
    alignSelf: 'flex-start',
    // flexDirection: 'row',
  },
  playIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieTypeButtonText: {
    fontSize: 10,
    fontFamily: font.poppinsRegular,
    lineHeight: 12,
    textTransform: 'capitalize',
    color: color.white,
  },
  aboutContainer: {
    paddingLeft: 18,
    paddingRight: 10,
  },
  textLayout: {
    opacity: 0,
    position: 'absolute',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  addYourRatingContainer: {
    borderWidth: 1,
    borderColor: color.secondary,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginBottom: 15,
  },
  addYourRating: {
    flex: 1,
  },
  addRating: {
    fontSize: 12,
    fontFamily: font.poppinsMedium,
    color: color.white,
  },
  opinion: {
    fontSize: 10,
    fontFamily: font.poppinsRegular,
    color: color.white,
  },
  likeText: {
    fontSize: 13,
    fontFamily: font.poppinsRegular,
    color: color.white,
    marginTop: 2,
    minWidth: '6%',
  },
  about: {
    fontSize: 16,
    fontFamily: font.poppinsMedium,
    color: color.white,
    lineHeight: 21,
  },
  detailText: {
    fontSize: 12,
    fontFamily: font.poppinsLight,
    color: color.white,
    lineHeight: 18,
    marginBottom: 10,
  },
  readMore: {
    fontSize: 10,
    fontFamily: font.poppinsLight,
    color: color.secondary,
    lineHeight: 18,
  },
  releaseDate: {
    fontSize: 10,
    fontFamily: font.poppinsLight,
    color: color.secondary,
    lineHeight: 18,
    marginTop: -1,
  },
  flatlist: {
    marginVertical: 13,
    marginBottom: 13,
  },
  indicator: {
    height: height / 1.3,
  },
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.inputBackground,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    backgroundColor: color.transparentMembership,
    paddingVertical: 25,
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
  flatlistContent: {
    flexGrow: 1,
  },
  noDataView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noTextData: {
    color: color.white,
    fontSize: 10,
    fontFamily: font.poppinsLight,
    textAlign: 'center',
  },
  likeTouchable: {
    padding: 7,
    paddingRight: 7,
  },
  rateContainer: {
    borderWidth: 1,
    backgroundColor: color.imdbBackground,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateNow: {
    fontSize: 10,
    color: color.white,
    fontFamily: font.poppinsLight,
    lineHeight: 21,
  },
});

export default style;
