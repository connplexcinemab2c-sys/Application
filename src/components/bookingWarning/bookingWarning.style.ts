import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.sheetBackground,
  },
  modal: {
    backgroundColor: color.inputBackground,
    borderRadius: 15,
    borderColor: color.secondary,
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningTitle: {
    color: color.white,
    fontSize: 14,
    fontFamily: font.poppinsMedium,
    textAlign: 'center',
    marginLeft: 7,
    marginTop: 2,
  },
  warning: {
    color: color.white,
    fontSize: 12,
    fontFamily: font.poppinsLight,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default styles;
