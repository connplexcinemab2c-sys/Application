import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const styles = StyleSheet.create({
  filterParent: {
    flexDirection: 'row',
    paddingLeft: 20,
  },
  modelStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: color.transparentBlack,
  },
  filterText: {
    color: color.white,
    flex: 1,
    fontSize: 12,
    fontFamily: font.poppinsMedium,
  },
  priceView: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  timeText: {
    color: color.black,
    marginRight: 6,
    fontSize: 12,
    fontFamily: font.poppinsMedium,
  },
  checkStyle: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  timeFlatlist: {
    flex: 1,
  },
  priceContainer: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: color.white,
    paddingTop: 10,
    paddingBottom: 15,
  },
  content: {
    flexGrow: 1,
  },
  filterPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  filterButton: {
    width: '30%',
    alignSelf: 'center',
  },
});

export default styles;
