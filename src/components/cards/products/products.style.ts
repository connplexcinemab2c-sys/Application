import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
    marginBottom: 12,
  },
  columnContainer: {
    marginBottom: 12,
    flex: 1 / 2,
  },
  productImage: {
    height: 147,
    width: 157,
    borderRadius: 12,
  },
  columnProductImage: {
    height: 175,
    width: '100%',
    borderRadius: 12,
    resizeMode:"contain"

  },
  cartIcon: {
    backgroundColor: color.goldenYellow,
    height:32,
    width:32,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom:-5,
    right:6,
  },
  cartIconColumn: {
    backgroundColor: color.goldenYellow,
    height: 32,
    width: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 8,
    right: -5,
  },
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    height: 25,
    width: 25,
    backgroundColor:'#D3CBCC',
    borderRadius:99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productName: {
    fontSize: 12,
    fontFamily: font.poppinsMedium,
    color: color.white,
    marginTop:5,
    width: 157,
  },
  productPrice: {
    fontSize: 14,
    fontFamily: font.poppinsMedium,
    color: color.goldenYellow,
  },
  strikeText: {
    textDecorationLine: 'line-through',
    textDecorationColor: color.white,
    textDecorationStyle: 'solid',
    color: color.white,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 14,
  },
});
export default styles;
