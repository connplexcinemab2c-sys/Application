import React, {memo} from 'react';
import {Linking, Modal, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {getStoreUpdateLink} from '../../utility/functions/comman';
import CustomStatusBar from '../customStatusBar/CustomStatusBar';
import {AppUpdateProps} from './appUpdate.interface';
import style from './appUpdate.style';

const AppUpdate: React.FC<AppUpdateProps> = ({visible}) => {
  const onUpdate = () => {
    Linking.openURL(getStoreUpdateLink()).catch(err =>
      console.error('An error occurred', err),
    );
  };
  return (
    <Modal visible={visible} transparent animationType="fade">
      <SafeAreaProvider>
        <CustomStatusBar backgroundColor="rgba(0,0,0,0.6)" />
        <View style={style.overlay}>
          <View style={style.card}>
            <Text style={style.titleText}>Update Required</Text>
            <Text style={style.detailText}>
              A new version of the app is available with exciting improvements.
              Please update to continue using the app.
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={style.updateButtonContainer}
              onPress={onUpdate}>
              <Text style={style.updateButtonText}>Update Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaProvider>
    </Modal>
  );
};

export default memo(AppUpdate);
