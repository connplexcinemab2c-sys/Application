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
    paddingBottom: 60,
  },
  flatListContainer: {
    marginTop: 16,
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: color.ecomBackground,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: font.poppinsMedium,
    color: color.white,
    lineHeight: 20,
    fontWeight: '400',
  },
  line: {
    height: StyleSheet.hairlineWidth,
    flex: 1,
    backgroundColor: '#252424',
    marginHorizontal: 20,
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  noDataText: {
    color: color.white,
    fontSize: 14,
    fontFamily: font.poppinsLight,
    textAlign: 'center',
  },
  shimmerContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default styles;
