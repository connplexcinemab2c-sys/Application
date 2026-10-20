import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const style = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingBottom: 10,
    paddingTop: 10,
  },
  backContainer: {
    flex: 1,
  },
  back: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: color.transparent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIcon: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: font.poppinsMedium,
    color: color.white,
    lineHeight: 27,
  },
  rightTextContainer: {
    padding: 5,
  },
  rightText: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.timeBorder,
    lineHeight: 18,
  },
  titleContainerStyle: {
    marginHorizontal: 12,
  },
  skipContainer: {
    paddingHorizontal: 13,
    paddingVertical: 4,
    backgroundColor: color.text,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skip: {
    fontSize: 12,
    fontFamily: font.poppinsMedium,
    color: color.white,
    lineHeight: 21,
  },
});

export default style;
