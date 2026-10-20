import {View, Text} from 'react-native';
import React from 'react';
import styles from './sessionOut.style';
import SessionOutController from './sessionOut.controller';
import {Button, CustomStatusBar} from '../../components';
import {color} from '../../theme';

const SessionOut = () => {
  const {logout} = SessionOutController();
  return (
    <View style={styles.main}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <View style={styles.container}>
        <Text allowFontScaling={false} style={styles.sessionOuttext}>
          You've been logged out
        </Text>
        <Text allowFontScaling={false} style={styles.sessionOut}>
          We notice that you aren't active in the session, so we logged you out
          for safety. Please click on the button to login in again
        </Text>
        <Button
          title={'Back to Home'}
          onPress={() => logout()}
          containerStyle={{width: 170}}
        />
      </View>
    </View>
  );
};

export default SessionOut;
