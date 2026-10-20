import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  title: {
    paddingBottom: 15,
    paddingTop: 15,
  },
  titleContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  contentContainer: {
    marginTop: 15,
    paddingHorizontal: 17,
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 16,
    lineHeight: 25,
    fontFamily: font.poppinsRegular,
    color: color.white,
  },
  divider: {
    marginVertical: 20,
  },
});

export default style;
