import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {BookingWarningProps} from './bookingWarning.interface';
import SvgIndex from '../../assets/svgIndex';
import style from './bookingWarning.style';

const BookingWarning: React.FC<BookingWarningProps> = ({
  isVisible,
  onClose,
}) => {
  return (
    <Modal visible={isVisible} transparent onRequestClose={onClose}>
      <TouchableOpacity
        style={style.modalContainer}
        onPress={onClose}
        activeOpacity={1}>
        <View style={style.modal}>
          <View style={style.warningContainer}>
            <SvgIndex.Warning />
            <Text allowFontScaling={false} style={style.warningTitle}>
              Warning
            </Text>
          </View>
          <Text allowFontScaling={false} style={style.warning}>
            You cannot select more than 10 items.
          </Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default BookingWarning;
