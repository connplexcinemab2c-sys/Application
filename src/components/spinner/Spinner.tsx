import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {color} from '../../theme';
interface SpinnerProps {
  visible: boolean;
}
const Spinner: React.FC<SpinnerProps> = ({visible}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <ActivityIndicator color={color.white} size={'large'} />
      </View>
    </Modal>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.transparentBlack,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
