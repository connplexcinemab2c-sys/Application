import React, {FC} from 'react';
import {ImageBackground, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {color} from '../../theme';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import {Header} from '../../components';
import imageIndex from '../../assets/imageIndex';
import style from './investorSection.style';

const InvestorSection: FC = () => {
  const {onBack} = commonFunctions();
  return (
    <ImageBackground
      style={style.background}
      source={imageIndex.authBackground}
      resizeMode="cover">
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={[color.transparentMembership, color.editProfileColor]}
        style={style.background}>
        <SafeAreaView>
          <Header
            title="Investor Section"
            titleContainerStyle={style.background}
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

export default InvestorSection;
