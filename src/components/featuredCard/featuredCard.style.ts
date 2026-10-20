import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const style = StyleSheet.create({
  container: {
    width: 156,
    marginRight: 8,
  },
  image: {
    height: 127,
    width: 156,
  },
  detailsContainer: {
    backgroundColor: color.transparent,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 12,
    fontFamily: font.poppinsMedium,
    color: color.white,
    lineHeight: 18,
  },
  price: {
    fontSize: 12,
    fontFamily: font.poppinsLight,
    color: color.white,
    lineHeight: 18,
  },
  plus: {
    justifyContent: 'flex-end',
    padding: 2,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
    borderRadius: 20,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  quantity: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.black,
    lineHeight: 18,
    marginHorizontal: 3,
  },
});

export default style;
