import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const style = StyleSheet.create({
  container: {
    width: '47%',
    backgroundColor: color.snacksColor,
    borderRadius: 5,
    paddingTop: 15,
    paddingLeft: 7,
    paddingRight: 10,
  },
  image: {
    height: 73,
    width: 73,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  name: {
    marginVertical: 10,
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.white,
    lineHeight: 18,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  price: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.white,
    lineHeight: 18,
    flex: 1,
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
    paddingTop: 3,
    paddingBottom: 11,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  quantity: {
    fontSize: 10,
    fontFamily: font.poppinsRegular,
    color: color.black,
    lineHeight: 16,
    marginHorizontal: 7,
    textAlign: 'center',
  },
  addQuantity: {
    padding: 5,
    paddingBottom: 0,
  },
});

export default style;
