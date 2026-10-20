import { Dimensions, StyleSheet } from 'react-native';
import { color, font } from '../../theme';

const { height } = Dimensions.get('window');

const style = StyleSheet.create({
  loaderView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  noDataView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height / 5,
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: '100%',
    width: '100%',
  },
  noTextData: {
    color: color.white,
    fontSize: 14,
    fontFamily: font.poppinsLight,
    textAlign: 'center',
  },
  locationView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.white,
    padding: 15,
    marginHorizontal: 18,
    borderRadius: 14,
  },
  currentText: {
    color: color.black,
    fontSize: 14,
    fontFamily: font.poppinsMedium,
    flex: 1,
    marginLeft: 15,
    marginRight: 5,
  },
  containerStyles: {
    flexGrow: 1,
    paddingBottom: 5,
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.lightShade,
  },
  parentView: {
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.borderColor,
    paddingVertical: 10,
    backgroundColor: color.lightOpacity,
  },
  label: {
    color: color.borderColor,
    fontSize: 16,
    fontFamily: font.poppinsMedium,
    textAlign: 'center',
  },
});

export default style;
