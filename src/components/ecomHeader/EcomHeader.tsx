import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {FC} from 'react';
import SvgIndex from '../../assets/svgIndex';
import styles from './ecomHeader.style';
import imageIndex from '../../assets/imageIndex';
import useEcomHeader from './useEcomHeader';

const EcomHeader: FC<ecomHeaderProps> = ({
  cartBadge,
  notificationBadge,
  showCart = true,
  showLogo = true,
  showNotification = true,
  title,
  showBack = true,
  showMenu = false,
  onPressMenu,
}) => {
  const {onPressBack, onPressCart, onPressNotification} = useEcomHeader();

  return (
    <View>
      <View style={styles.container}>
        <View style={[styles.rowContainer, {flex: showLogo ? 1 : 0}]}>
          {showBack && (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={onPressBack}>
              <SvgIndex.Back />
            </TouchableOpacity>
          )}
          {showMenu && (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={onPressMenu}>
              <SvgIndex.DrawerIcon />
            </TouchableOpacity>
          )}
          {showLogo && (
            <Image
              source={imageIndex.appLogoText}
              style={styles.appLogoNew}
              resizeMode="contain"
            />
          )}
        </View>
        <View
          style={{flex: 1, marginRight: showNotification || showCart ? 0 : 25}}>
          {title && <Text style={styles.title}>{title}</Text>}
        </View>
        <View style={styles.rowContainer}>
          {showNotification && (
            <TouchableOpacity
              style={styles.notificationContainer}
              activeOpacity={0.7}
              onPress={onPressNotification}>
              <SvgIndex.NotificationEcom height={16} width={16} />
              {notificationBadge && notificationBadge > 0 ? (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeLabel}>{notificationBadge}</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          )}
          {showCart && (
            <TouchableOpacity
              style={styles.notificationContainer}
              activeOpacity={0.7}
              onPress={onPressCart}>
              <SvgIndex.Bag height={16} width={16} />
              {cartBadge && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeLabel}>{cartBadge}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default EcomHeader;
