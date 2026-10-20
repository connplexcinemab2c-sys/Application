import {StyleSheet} from 'react-native';
import {color, font} from '../../../theme';
import style from '../../../components/appUpdate/appUpdate.style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.ecomBackground,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 60,
  },
  topContainer: {
    height: 250,
    backgroundColor: '#211e1a',
    overflow: 'hidden',
  },
  overLays: {
    height: 180,
    backgroundColor: color.goldenYellow + 10,
    transform: [{rotate: '135deg'}],
  },
  overLays2: {
    height: 250,
    backgroundColor: color.whiteBorderLight,
    transform: [{rotate: '45deg'}],
  },
  crossIcn: {
    top: 60,
    right: 20,
    position: 'absolute',
  },
  details: {
    position: 'absolute',
    bottom: 10,
    left: 16,
  },
  userName: {
    fontSize: 18,
    fontFamily: font.poppinsMedium,
    color: color.white,
  },
  userImage: {
    height: 65,
    width: 65,
    borderRadius: 65 / 2,
    marginBottom: 8,
  },
  userMobile: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.whiteC6,
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomColor: color.grey3A,
    borderBottomWidth: 0.5,
    paddingVertical: 9,
  },
  iconView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
    borderWidth: 0.8,
    borderColor: color.borderColor,
    borderRadius: 5,
  },
  itemLabel: {
    fontSize: 14,
    color: color.white,
    fontFamily: font.poppinsRegular,
    flex: 1,
    marginLeft: 15,
    paddingVertical: 0,
  },
});

export default styles;
