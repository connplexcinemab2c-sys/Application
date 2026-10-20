import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  imageSpinner: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: 1,
    marginTop: 35,
  },
  modelViewStyle: {
    height: 50,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginTop: 4,
  },
  adTouchable: {
    width: '80%',
    flex: 1,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    top: 20,
  },
  poster: {
    height: '95%',
    width: '100%',
    // aspectRatio: 9 / 16,
    alignSelf: 'center',
    resizeMode: 'cover',
    marginTop: 10,
  },
  flexCol: {
    flex: 1,
  },
  animationBarContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  animationBackground: {
    height: 2,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(117, 117, 117, 0.5)',
    marginHorizontal: 2,
    borderRadius: 5,
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  pressView: {
    flex: 1,
    flexDirection: 'row',
  },
  leftRightTouchable: {
    flex: 1 / 2,
    zIndex: 1,
  },
  centerTouchable: {
    flex: 1,
    zIndex: 1,
  },
});

export default style;
