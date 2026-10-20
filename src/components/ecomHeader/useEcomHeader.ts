import {View, Text} from 'react-native';
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthParams} from '../../navigation/stacks/authStack';
import {useAppDispatch} from '../../services/config/redux/useReduxHooks';
import {clearNotification} from '../../services/config/redux/userReducer/action';

const useEcomHeader = () => {
  const navigation = useNavigation<NavigationProp<AuthParams>>();
  const dispatch = useAppDispatch();

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressNotification = () => {
    navigation.navigate('ecomNotification');
    // dispatch(clearNotification());
  };

  const onPressCart = () => {
    navigation.navigate('ecomCart');
  };
  return {
    onPressBack,
    onPressCart,
    onPressNotification,
  };
};

export default useEcomHeader;
