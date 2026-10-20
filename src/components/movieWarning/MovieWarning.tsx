import React, {memo} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {MovieWarningProps} from './movieWarning.interface';
import {BlurView} from '@react-native-community/blur';
import Button from '../button/Button';
import style from './movieWarning.style';
import {color} from '../../theme';

const MovieWarning: React.FC<MovieWarningProps> = ({
  isVisible,
  onClick,
  onClose,
}) => {
  return (
    <Modal visible={isVisible} transparent>
      <View style={style.modalView}>
        <TouchableOpacity
          style={style.blur}
          activeOpacity={1}
          onPress={onClose}>
          <BlurView
            style={style.blur}
            blurType="light"
            blurAmount={2}
            reducedTransparencyFallbackColor={color.lightShade}
          />
        </TouchableOpacity>
        <View style={style.warningContainer}>
          <Text style={style.warnText} allowFontScaling={false}>
            Warning
          </Text>
          <Text style={style.warnInfoText} allowFontScaling={false}>
            This movie has been rated 'A' and is for audiances above the age of
            18. Please carry a valid ID/Age proof to theatre. No refund of
            tickets once bought.
          </Text>
          <Button
            title="Okay"
            mainContainer={style.filterButton}
            containerStyle={style.buttonContent}
            onPress={onClick}
          />
        </View>
      </View>
    </Modal>
  );
};

export default memo(MovieWarning);
