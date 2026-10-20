import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import React, {FC} from 'react';
import imageIndex from '../../assets/imageIndex';
import LinearGradient from 'react-native-linear-gradient';
import {color} from '../../theme';
import {style} from './helpSupport.style';
import helpSupportController from './helpSupport.controller';
import {Header} from '../../components';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';

const HelpSupport: FC = () => {
  const {onSubscribe} = helpSupportController();
  const {onBack} = commonFunctions();
  return (
    <ImageBackground
      style={style.background}
      source={imageIndex.authBackground}
      resizeMode="cover">
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={[color.transparentMembership, '#291F08']}
        style={style.background}>
        <SafeAreaView>
          <Header
            title="Help & Support"
            titleContainerStyle={style.titleContainer}
            containerStyle={style.header}
            withBackground={false}
            onBack={onBack}
            backIcon
          />
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

export default HelpSupport;
