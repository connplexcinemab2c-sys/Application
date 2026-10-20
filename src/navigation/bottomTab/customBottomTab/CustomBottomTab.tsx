import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import imageIndex from '../../../assets/imageIndex';
import svg from '../../../assets/svgIndex';
import LoginModal from '../../../screens/loginModal.ts/LoginModal';
import axiosInstance from '../../../services/api';
import constant from '../../../services/config/constant';
import {useAppSelector} from '../../../services/config/redux/useReduxHooks';
import {color} from '../../../theme';
import screenName from '../../screenName';
import bottomTabController from './customBottomTab.controller';
import style from './customBottomTab.style';

const CustomBottomTab: React.FC<BottomTabBarProps> = props => {
  const {index} = props?.state;
  const {onAccount, visible, setVisible} = bottomTabController();
  const {token} = useAppSelector(state => state.UserReducer);
  const isFocused = useIsFocused();

  const [activeData, setactiveData] = useState<any>([]);

  useEffect(() => {
    if (token) {
      getActivePlan();
    } else {
      setactiveData([]);
    }
  }, [isFocused, token]);

  const getActivePlan = async () => {
    try {
      const {data} = await axiosInstance.get(constant.activePlan, {
        headers: {
          auth: token,
        },
      });

      // Optional: if you only want to use the latest one
      const latestSubscription = data.data?.filter(item => {
        return item.isActive == true;
      })[0];
      setactiveData(latestSubscription); // set a single object, not array
    } catch (error: any) {}
  };

  return (
    <>
      <View style={style.mainContainer}>
        <View>
          <LinearGradient
            colors={
              index == 0 ? color.buttonGradient : color.transparentGradient
            }
            start={{x: 0.6, y: 1}}
            end={{x: 0, y: 0}}
            style={style.topIndicator}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={style.itemContainer}
            onPress={() => props?.navigation?.navigate(screenName.homeScreen)}>
            {index === 0 ? <svg.Home /> : <svg.HomeIcon />}
            <Text
              allowFontScaling={false}
              style={[
                style.title,
                {
                  color: index === 0 ? color.locationText : color.white,
                },
              ]}>
              Home
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <LinearGradient
            colors={
              index == 1 ? color.buttonGradient : color.transparentGradient
            }
            start={{x: 0.6, y: 1}}
            end={{x: 0, y: 0}}
            style={[style.topIndicator, {right: index == 1 ? -10 : 0}]}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={[style.itemContainer, {right: -10}]}
            onPress={() => props?.navigation?.navigate(screenName.cinemas)}>
            {index === 1 ? <svg.CinemaFilled /> : <svg.Cinema />}
            <Text
              allowFontScaling={false}
              style={[
                style.title,
                {
                  color: index === 1 ? color.locationText : color.white,
                },
              ]}>
              Cinemas
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{marginTop: -15, right: -11}}
          onPress={() => props?.navigation?.navigate(screenName.membership)}>
          <Image
            source={
              activeData?.isActive ? imageIndex.logoImage : imageIndex.logo
            }
            style={{
              borderRadius: 10,
              height: 50,
              width: 50,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        <View>
          <LinearGradient
            colors={
              index == 3 ? color.buttonGradient : color.transparentGradient
            }
            start={{x: 0.6, y: 1}}
            end={{x: 0, y: 0}}
            style={style.topIndicator}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={style.itemContainer}
            onPress={() => props?.navigation?.navigate(screenName.comingSoon)}>
            {index === 3 ? <svg.VideoRecorderFilled /> : <svg.VideoRecorder />}
            <Text
              allowFontScaling={false}
              style={[
                style.title,
                {
                  color: index === 3 ? color.locationText : color.white,
                },
              ]}>
              Coming Soon
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <LinearGradient
            colors={
              index == 4 ? color.buttonGradient : color.transparentGradient
            }
            start={{x: 0.6, y: 1}}
            end={{x: 0, y: 0}}
            style={style.topIndicator}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={style.itemContainer}
            onPress={onAccount}>
            {index === 4 ? (
              <svg.UserFilled />
            ) : (
              <svg.User color={color.white} />
            )}
            <Text
              allowFontScaling={false}
              style={[
                style.title,
                {
                  color: index === 4 ? color.locationText : color.white,
                },
              ]}>
              Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <LoginModal visible={visible} onClose={() => setVisible(false)} />
    </>
  );
};

export default CustomBottomTab;
