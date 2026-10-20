import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 16,
  },
  container: {
    borderWidth: 1,
    borderColor: color.whiteBorderLight,
    borderRadius: 16,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  productThumbnails: {
    height: 80,
    width: 80,
    borderRadius: 12,
    resizeMode: 'stretch',
  },
  productName: {
    fontSize: 12,
    fontFamily: font.poppinsMedium,
    color: color.white,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  productSize: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.whiteB7,
    fontWeight: '500',
    lineHeight: 18,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: font.poppinsMedium,
    color: color.goldenYellow,
    lineHeight: 24,
    fontWeight: '600',
  },
  strikeText: {
    textDecorationLine: 'line-through',
    textDecorationColor: color.white,
    textDecorationStyle: 'solid',
    color: color.white,
  },
  flexRow: {
    flex: 1,
  },
  cartBtns: {
    height: 22,
    width: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.white,
  },
  disableCartBtns: {
    height: 22,
    opacity: 0.5,
    width: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.white,
  },
  cartLabel: {
    fontSize: 14,
    fontFamily: font.poppinsRegular,
    color: color.white,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: 10,
  },
  cartContainers: {
    alignItems: 'flex-end',
  },
  deleteIcon: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeIcon: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
  error: {
    marginLeft: 5,
    fontSize: 12,
    color: color.red,
    marginTop: 2,
    fontFamily: font.poppinsRegular,
  },
});

export default styles;
