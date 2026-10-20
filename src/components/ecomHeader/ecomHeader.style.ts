import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const styles = StyleSheet.create({
  buttonContainer: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: color.whiteBorderLight,
  },
  notificationContainer: {
    height:35,
    width:35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: color.whiteBorderLight,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  appLogoNew: {
    height: 22,
    width: '100%',
    marginLeft: -10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  badgeContainer: {
    backgroundColor: color.goldenYellow,
    height: 15,
    width: 15,
    borderWidth: 1,
    borderColor: color.white,
    borderRadius:15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -5,
    right: -5,
  },
  badgeLabel: {
    color: color.black,
    fontSize: 8,
    fontFamily: font.poppinsMedium,
    textAlign:"center"
  },
  title: {
    color: color.white,
    fontSize: 18,
    fontFamily: font.poppinsMedium,
    fontWeight: '500',
    textAlign: 'center',
   
  },
});

export default styles;
