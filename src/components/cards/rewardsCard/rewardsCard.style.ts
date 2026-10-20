import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

export const style = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor:color.bottomBackground,
    borderWidth: 1,
    borderColor: color.timeBorder,
    borderRadius: 5,
  },
  text: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: font.poppinsLight,
    color: color.white,
    textTransform: 'capitalize',
  },
  progressParentContainer: {
    backgroundColor: color.white,
    height: 4,
    borderColor: color.white,
    marginTop: 10,
    width: '100%',
    borderRadius: 30,
  },
  progressChildContainer: {
    backgroundColor: color.cardColor,
    height: 4,
    width: '20%',
    borderRadius: 30,
  },
  pointsContainer: {
    marginTop: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
