import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const style = StyleSheet.create({
  container: {
    backgroundColor: color.cinemaBorder,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: color.timeBorder,
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  movieTitle: {
    fontSize: 15,
    color: color.white,
    fontFamily: font.poppinsRegular,
    lineHeight: 21,
    flex: 0.5,
  },
  language: {
    fontSize: 10,
    color: color.secondary,
    fontFamily: font.poppinsLight,
    lineHeight: 21,
  },
  type: {
    fontSize: 10,
    color: color.white,
    fontFamily: font.poppinsLight,
  },
  timingContainer: {
    marginRight: 8,
    marginBottom: 12,
    borderRadius: 30,
  },
  timeView: {
    borderRadius: 30,
    borderWidth: 1,
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
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
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
