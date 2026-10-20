import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: color.lightShade,
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
  warningContainer: {
    padding: 18,
    borderWidth: 1,
    borderColor: color.borderColor,
    marginHorizontal: 18,
    borderRadius: 14,
    backgroundColor: color.lightOpacity,
  },
  warnText: {
    fontSize: 18,
    fontFamily: font.poppinsMedium,
    color: color.border,
    textAlign: 'center',
  },
  warnInfoText: {
    fontSize: 14,
    fontFamily: font.poppinsRegular,
    color: color.white,
    textAlign: 'center',
    paddingVertical: 10,
    lineHeight: 24,
  },
  buttonContent: {
    height: 40,
  },
  filterButton: {
    width: '30%',
    alignSelf: 'center',
  },
});

export default styles;
