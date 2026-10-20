import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const style = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  titleContainer: {
    paddingBottom: 15,
    paddingTop: 15,
  },
  dateTimeContainer: {
    paddingHorizontal: 18,
    flex: 1,
  },
  flatlist: {
    flexGrow: 0,
  },
  timeFlatlist: {
    flex: 1,
  },
  noShowContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nowShow: {
    color: color.white,
    fontSize: 12,
    fontFamily: font.poppinsLight,
    textAlign: 'center',
    lineHeight: 15,
    marginTop: 10,
  },
  filterLabel: {
    color: color.white,
    flex: 1,
    fontSize: 11,
    fontFamily: font.poppinsRegular,
  },
  filterContent: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.borderColor,
    marginRight: 8,
    flexDirection: 'row',
    borderRadius: 14,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  borderView: {
    marginVertical: 20,
    borderWidth: 0.3,
  },
  infoContainer: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    // minHeight: 100,
    // maxHeight: 180,
    backgroundColor: color.white,
    paddingVertical: 15,
  },
  movieShowContainer: {
    marginBottom: 10,
  },
  filterDataContent: {
    borderWidth: 1,
    borderColor: color.golden,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginBottom: 20,
    marginRight: 8,
    borderRadius: 12,
  },
  filteredText: {
    color: color.white,
    fontFamily: font.poppinsRegular,
    fontSize: 12,
  },
});

export default style;
