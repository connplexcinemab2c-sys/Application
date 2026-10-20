import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const style = StyleSheet.create({
  infoContainer: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    height: '25%',
    backgroundColor: color.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  infoView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 7,
    paddingHorizontal: 20,
  },
  facility: {
    fontSize: 11,
    color: color.black,
    fontFamily: font.poppinsRegular,
    textAlign: 'center',
    marginTop: 5,
  },
  facilityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  available: {
    fontSize: 13,
    color: color.black,
    fontFamily: font.poppinsRegular,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  name: {
    fontSize: 16,
    color: color.black,
    fontFamily: font.poppinsMedium,
    lineHeight: 24,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  address: {
    fontSize: 10,
    color: color.black,
    fontFamily: font.poppinsRegular,
    lineHeight: 21,
    flex: 1,
    marginHorizontal: 8,
  },
  mapMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    borderBottomColor: color.grayBorderColor,
  },
  scrollStyle: {
    flexGrow: 1,
    paddingBottom: 10,
  },
});

export default style;
