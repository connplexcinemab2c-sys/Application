import {Dimensions, StyleSheet} from 'react-native';
import {color, font} from '../../theme';

const {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.inputBackground,
  },
  title: {
    paddingBottom: 15,
    paddingTop: 15,
  },
  infoText: {
    color: color.white,
    fontSize: 14,
    marginBottom: 6,
  },
  card: {
    backgroundColor: color.white,
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: font.poppinsSemiBold,
    marginBottom: 8,
    color: color.green,
    textTransform: 'capitalize',
  },
  cardText: {
    fontSize: 13,
    color: color.black,
    marginBottom: 4,
    fontFamily: font.poppinsSemiBold,
  },
  cardInfo: {
    fontSize: 15,
    color: color.golden,
    fontFamily: font.poppinsSemiBold,
    marginBottom: 4,
  },
  expiredText: {
    marginTop: 12,
    color: color.red,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: color.secondary,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: color.whiteBackground,
    fontFamily: font.poppinsSemiBold,
    fontSize: 16,
  },
  confirmModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  confirmModalContainer: {
    backgroundColor: color.white,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 30,
    marginHorizontal: 10,
  },
  confirmModalTitle: {
    fontSize: 18,
    color: color.black,
    fontWeight: 'bold',
    marginVertical: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: color.inputBackground,
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    color: color.white,
    fontWeight: 'bold',
    marginVertical: 12,
    textAlign: 'center',
  },
  cinemaItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: color.golden,
  },
  cinemaText: {
    fontSize: 16,
    color: color.white,
  },
  closeButton: {
    backgroundColor: color.red,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  closeText: {
    color: color.white,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: color.green,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  confirmText: {
    color: color.white,
    fontSize: 16,
    fontWeight: '600',
  },
  noDataView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  noDataText: {
    fontSize: 14,
    color: color.white,
    textAlign: 'center',
    fontFamily: font.poppinsLight,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backIcon: {
    paddingRight: 12,
  },
  inputDivider: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    borderColor: color.secondary,
    paddingRight: 5,
  },
  input: {
    fontSize: 12,
    fontFamily: font.poppinsRegular,
    color: color.white,
  },
  buttonContainer: {
    height: 45,
  },
});
