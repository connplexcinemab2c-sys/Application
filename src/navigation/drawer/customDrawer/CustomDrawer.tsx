import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './customDrawer.style';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {color} from '../../../theme';
import imageIndex from '../../../assets/imageIndex';
import SvgIndex from '../../../assets/svgIndex';
import {customDrawerConst} from './customDrawer.const';
import {useAppSelector} from '../../../services/config/redux/useReduxHooks';

const CustomDrawer: React.FC<DrawerContentComponentProps> = ({
  navigation,
  state,
}) => {
  const {userData} = useAppSelector(state => state.UserReducer);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.overLays} />
        <Pressable
          style={styles.crossIcn}
          onPress={() => navigation.closeDrawer()}>
          <SvgIndex.CrossIcon height={20} width={20} fill={color.white} />
        </Pressable>
        <View style={styles.overLays2} />
        <View style={styles.details}>
          <Image source={imageIndex.userProfile} style={styles.userImage} />
          <Text style={styles.userName}>
            {userData?.firstName + ' ' + userData?.lastName}
          </Text>
          <Text style={styles.userMobile}>+91{userData?.mobileNumber}</Text>
        </View>
      </View>
      <DrawerContentScrollView contentContainerStyle={styles.contentContainer}>
        {customDrawerConst.map((item, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.itemView,
                {
                  borderBottomWidth:
                    customDrawerConst?.length - 1 === index ? 0 : 0.5,
                },
              ]}
              key={index}
              activeOpacity={0.7}
              onPress={() => {
                navigation.closeDrawer();
                navigation.navigate(item.name);
              }}>
              <View style={styles.iconView}>
                <item.icon height={17} width={18} />
              </View>
              <Text style={styles.itemLabel}>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
