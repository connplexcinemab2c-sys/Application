import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const style = StyleSheet.create({
  theaterStyle: {
    backgroundColor: color.cinemaBorder,
    borderRadius: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: color.timeBorder,
    paddingTop: 15,
    paddingBottom: 6,
  },
  title: {
    fontSize: 14,
    fontFamily: font.poppinsMedium,
    color: color.white,
    lineHeight: 22,
    marginBottom: 5,
    flex: 1,
    marginRight: 10,
  },
  info: {
    fontSize: 10,
    fontFamily: font.poppinsRegular,
    color: color.secondary,
    lineHeight: 18,
    marginLeft: 4,
    marginTop: -2,
  },
  theatreTitle: {
    flexDirection: 'row',
  },
  infoTouchable: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  addressContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  location: {
    marginTop: 4,
  },
  address: {
    fontSize: 11,
    fontFamily: font.poppinsRegular,
    color: color.white,
    lineHeight: 20,
    marginLeft: 10,
    flex: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  timingContainer: {
    marginRight: 8,
    marginBottom: 12,
    borderRadius: 30,
  },
  timeView: {
    borderRadius: 30,
    borderWidth: 1,
    // paddingBottom: 20,
    paddingHorizontal: 20,
  },
  time: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: font.poppinsRegular,
    color: color.white,
    lineHeight: 18,
  },
  additionTime: {
    fontSize: 8,
    textAlign: 'center',
    fontFamily: font.poppinsMedium,
    color: color.white,
    lineHeight: 18,
    textTransform: 'uppercase',
  },
  seatType: {
    fontSize: 9,
    color: color.imdbBackground,
    textAlign: 'center',
    fontFamily: font.poppinsRegular,
    marginTop: 3,
    marginBottom: -3,
  },
});

export default style;
