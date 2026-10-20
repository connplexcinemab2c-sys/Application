import React, {memo} from 'react';
import {
  View,
  ImageBackground,
  Image,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProps} from '../../navigation/stacks/authStack';
import CustomStatusBar from '../customStatusBar/CustomStatusBar';
import Header from '../header/Header';
import {ImageContainerProps} from './imageContainer.interface';
import imageIndex from '../../assets/imageIndex';
import style from './imageContainer.style';
import {color} from '../../theme';

const ImageContainer: React.FC<ImageContainerProps> = props => {
  const navigation = useNavigation<AuthNavigationProps>();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        style={style.keyboardAvoid}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
          overScrollMode="never"
          contentContainerStyle={style.scrollView}>
          <ImageBackground
            style={[style.imageContainer, props.containerStyle]}
            blurRadius={1}
            source={imageIndex.authBackground}>
            {props?.isTransparent ? (
              <CustomStatusBar backgroundColor={color.inputBackground} />
            ) : (
              <CustomStatusBar
                transparent
                containerStyle={style.statusbar}
                backgroundColor="transparent"
              />
            )}

            {props.headerShow && (
              <View style={{marginTop: Platform.OS == 'ios' ? 30 : 20}}>
                <Header
                  title={props.headerTitle}
                  backIcon
                  onBack={() => navigation.goBack()}
                />
              </View>
            )}
            <Image
              source={imageIndex.newLogo}
              resizeMode="contain"
              style={style.logoImage}
            />
            <View style={[style.contentContainer, props.contentContainerStyle]}>
              {props.children}
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default memo(ImageContainer);
