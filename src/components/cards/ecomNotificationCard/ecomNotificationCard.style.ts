import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  title: {
    fontSize: 14,
    fontFamily: font.poppinsMedium,
    color: color.white,
    lineHeight: 18,
    fontWeight: '600',
    marginRight: 46,
    flex: 1,
  },
  description: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.whiteC6,
    lineHeight: 20,
    fontWeight: '400',
    marginRight: 46,
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    fontFamily: font.poppinsMedium,
    color: color.white,
    lineHeight: 20,
    fontWeight: '400',
  },
  contents: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: color.goldenYellow,
  },
});

export default styles;
