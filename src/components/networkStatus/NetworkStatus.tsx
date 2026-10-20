import React from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import Button from '../button/Button';
import {color} from '../../theme';
import {NetworkStatusProps} from './networkStatus.interface';
import style from './networkStatus.style';

const NetworkStatus: React.FC<NetworkStatusProps> = ({isModal, onTryAgain}) => {
  return (
    <Modal animationIn={'slideInUp'} isVisible={isModal}>
      <View style={style.container}>
        <Text allowFontScaling={false} style={style.textStyle}>
          Connection lost
        </Text>
        <Text allowFontScaling={false} style={style.internetTextShow}>
          Seems like you are not connected to the internet. Check your
          connection and try again.
        </Text>
        <Button
          title="Try Again"
          onPress={onTryAgain}
          gradient={color.termsGradient}
          containerStyle={style.buttonContainer}
        />
      </View>
    </Modal>
  );
};

export default NetworkStatus;
