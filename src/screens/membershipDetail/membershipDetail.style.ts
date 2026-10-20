import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  scrollStyle: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  mainView: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  iconView: {
    alignItems: 'center',
    zIndex: 1,
  },
  priceText:{
     fontSize: 14,
    color: color.placeholder,
    fontFamily: font.poppinsSemiBold,
    textDecorationLine: 'line-through',
    marginRight: 4,
  },
  priceContent: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 8,

    borderRadius: 14,
    borderColor: color.golden,
    flexDirection: 'row',
  },
  planContent: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    height: 72,
    width: 72,
    borderRadius: 40,
    alignSelf: 'center',
  },
  indicator: {
    backgroundColor: color.white,
    height: 80,
    width: 80,
    borderRadius: 40,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  userProfile: {
    alignSelf: 'center',
  },
  title: {
    paddingBottom: 15,
    paddingTop: 15,
  },
  name: {
    fontSize: 18,
    color: color.white,
    fontFamily: font.poppinsMedium,
    textAlign: 'center',
  },
  titleText: {
    fontSize: 22,
    color: color.golden,
    fontFamily: font.poppinsMedium,
    flex: 1,
  },
  priceDurationText: {
    fontSize: 14,
    color: color.white,
    fontFamily: font.poppinsSemiBold,
  },
  durationText: {
    fontSize:11,
    fontFamily: font.poppinsRegular,
  },
  labelText: {
    color: color.golden,
    fontSize: 13,
    fontFamily: font.poppinsSemiBold,
    lineHeight: 22,
    paddingHorizontal: 15,
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 15,
  },
  noteText: {
    color: color.red,
    fontSize: 13,
    fontFamily: font.poppinsSemiBold,
    lineHeight: 22,
    paddingHorizontal: 10,
    marginTop: 10,
    textAlign: 'center',
    opacity: 0.8,
  },
  infoMainText: {
    color: color.golden,
    fontSize: 13,
    fontFamily: font.poppinsBold,
    flex: 1,
    paddingLeft: 8,
    lineHeight: 22,
    opacity: 0.8,
  },
  lineView: {
    height: 0.5,
    width: '100%',
    backgroundColor: color.golden,
    marginTop: 8,
  },
  infoText: {
    color: color.white,
    fontSize: 13,
    fontFamily: font.poppinsRegular,
    flex: 1,
    paddingLeft: 8,
    lineHeight: 22,
    opacity: 0.8,
  },
  infoContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  icon: {
    top: 3,
  },
});

export default styles;
