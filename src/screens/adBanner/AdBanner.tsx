import React, {memo} from 'react';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Animated,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import adBannerController from './adBanner.controller';
import {color} from '../../theme';
import constant from '../../services/config/constant';
import {CustomStatusBar} from '../../components';
import svg from '../../assets/svgIndex';
import style from './adBanner.style';

const AdBanner = () => {
  const {
    imageSpinner,
    onImageLoadEnd,
    onImageLoadStart,
    current,
    progress,
    content,
    showAd,
    closeAdModal,
    onAd,
    startAnimation,
    setPressed,
    previous,
    next,
    pressed,
  } = adBannerController();

  return (
    <Modal visible={showAd} transparent>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <BlurView
        style={style.blur}
        blurType="light"
        blurAmount={7}
        reducedTransparencyFallbackColor={color.white}
      />
      {imageSpinner && (
        <ActivityIndicator
          color={color.imdbBackground}
          style={style.imageSpinner}
          size="large"
        />
      )}
      <TouchableOpacity style={style.modelViewStyle} onPress={closeAdModal}>
        <svg.CloseIcon />
      </TouchableOpacity>
      <View style={style.flexCol}>
        <View style={style.animationBarContainer}>
          {content.map((index: any, key: any) => {
            return (
              <View key={key} style={style.animationBackground}>
                <Animated.View
                  style={{
                    flex: current == key ? progress : content[key].finish,
                    height: 2,
                    backgroundColor: color.imdbBackground,
                  }}
                />
              </View>
            );
          })}
        </View>
        <View style={style.pressView}>
          <TouchableWithoutFeedback
            onPressIn={() => progress.stopAnimation()}
            onLongPress={() => setPressed(true)}
            onPressOut={() => {
              setPressed(false);
              startAnimation('again');
            }}
            onPress={() => {
              if (!pressed && !imageSpinner) {
                previous();
              }
            }}>
            <View style={style.leftRightTouchable} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPressIn={() => progress.stopAnimation()}
            onLongPress={() => setPressed(true)}
            onPressOut={() => {
              setPressed(false);
              startAnimation('again');
            }}
            onPress={() => {
              if (content[current]?.bannerLink) {
                onAd(content[current]?.bannerLink);
              }
            }}>
            <View style={style.centerTouchable} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPressIn={() => progress.stopAnimation()}
            onLongPress={() => setPressed(true)}
            onPressOut={() => {
              setPressed(false);
              startAnimation('again');
            }}
            onPress={() => {
              if (!pressed && !imageSpinner) {
                next();
              }
            }}>
            <View style={style.leftRightTouchable} />
          </TouchableWithoutFeedback>
        </View>
        <View style={style.adTouchable}>
          <Image
            source={{
              uri: `${constant.imageURL}${content[current]?.banner}`,
            }}
            onLoadStart={onImageLoadStart}
            onLoadEnd={onImageLoadEnd}
            style={style.poster}
          />
        </View>
      </View>
    </Modal>
  );
};

export default memo(AdBanner);
