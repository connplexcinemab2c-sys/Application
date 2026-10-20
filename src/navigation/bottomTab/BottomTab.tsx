import React from 'react';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Account from '../../screens/account/Account';
import Cinemas from '../../screens/cinemas/Cinemas';
import ComingSoon from '../../screens/comingSoon/ComingSoon';
import CustomBottomTab from './customBottomTab/CustomBottomTab';
import HomeScreen from '../../screens/homeScreen/HomeScreen';
import screenName from '../screenName';
import Memebership from '../../screens/membership/Memebership';

export type BottomParams = {
  homeScreen: undefined;
  cinemas: undefined;
  membership: undefined;
  comingSoon: undefined;
  account: undefined;
};

export type BottomNavigationProps = BottomTabNavigationProp<BottomParams>;

const BottomTab: React.FC = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomBottomTab {...props} />}>
      <Tab.Screen name={screenName.homeScreen} component={HomeScreen} />
      <Tab.Screen name={screenName.cinemas} component={Cinemas} />
      <Tab.Screen name={screenName.membership} component={Memebership} />
      <Tab.Screen name={screenName.comingSoon} component={ComingSoon} />
      <Tab.Screen name={screenName.account} component={Account} />
    </Tab.Navigator>
  );
};

export default BottomTab;
