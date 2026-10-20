import React from 'react';
import {View, ActivityIndicator, StyleSheet, Modal} from 'react-native';

interface FullScreenLoaderProps {
  visible: boolean;
  backgroundColor?: string;
  spinnerColor?: string;
}

const FullScreenLoader = ({
  visible,
  backgroundColor = 'rgba(0, 0, 0, 0.4)',
  spinnerColor = '#fff',
}: FullScreenLoaderProps) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      statusBarTranslucent>
      <View style={[styles.overlay, {backgroundColor}]}>
        <ActivityIndicator size="large" color={spinnerColor} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FullScreenLoader;
