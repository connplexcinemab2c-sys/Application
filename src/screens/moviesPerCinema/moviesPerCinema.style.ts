import {StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  titleContainer: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  indicator: {
    flex: 0.85,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  movieText: {
    color: color.white,
    fontSize: 15,
    fontFamily: font.poppinsMedium,
    marginBottom: 10,
  },
  flatlist: {
    flexGrow: 0,
  },
  border: {
    borderWidth: 0.3,
    marginTop: 20,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContent: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.borderColor,
    marginRight: 8,
    flexDirection: 'row',
    borderRadius: 14,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  filterLabel: {
    color: color.white,
    flex: 1,
    fontSize: 11,
    fontFamily: font.poppinsRegular,
  },
  noData: {
    color: color.white,
    fontSize: 12,
    fontFamily: font.poppinsLight,
    textAlign: 'center',
    marginTop: 15,
  },
  infoContainer: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: color.white,
    paddingVertical: 15,
    height: 'auto',
  },
  filterDataContent: {
    borderWidth: 1,
    borderColor: color.golden,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginBottom: 20,
    marginRight: 8,
    borderRadius: 12,
  },
  filteredText: {
    color: color.white,
    fontFamily: font.poppinsRegular,
    fontSize: 12,
  },
});

export default style;
