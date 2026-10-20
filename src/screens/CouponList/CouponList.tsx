import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React from 'react';
import style from './couponList.style';
import {CustomStatusBar, Header} from '../../components';
import {color} from '../../theme';
import couponListController from './couponList.controller';
import {PropType} from './couponList.interface';
import LinearGradient from 'react-native-linear-gradient';

const CouponList = () => {
  const {list, loading, refreshing, refreshCall, onApplyCoupon, onBack} =
    couponListController();

  return (
    <View style={style.container}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <Header
        backIcon
        onBack={() => onBack()}
        title="Apply Coupon"
        titleContainerStyle={style.titleContainer}
      />
      {!refreshing && loading ? (
        <ActivityIndicator
          style={style.indicatorStyle}
          size="small"
          color={color.white}
        />
      ) : (
        <FlatList
          data={list}
          contentContainerStyle={style.containerStyle}
          renderItem={({item, index}) => (
            <View
              style={[
                style.divider,
                {
                  opacity: item?.eligible ? 0.5 : 1,
                },
              ]}>
              <LinearGradient
                colors={
                  item?.eligible
                    ? [color.gray, color.gray]
                    : color.couponGradient
                }
                start={{x: 0.4, y: 1}}
                end={{x: 1, y: 1}}
                style={style.parentView}>
                <Text allowFontScaling={false} style={style.offerText}>
                  {item?.discountType == 'flat'
                    ? 'FLAT OFF'
                    : `${item?.discount}% OFF`}
                </Text>
              </LinearGradient>
              <View style={style.couponParent}>
                <View style={style.couponDivider}>
                  <Text
                    allowFontScaling={false}
                    style={style.couponText}
                    numberOfLines={1}>
                    {item?.couponTitle?.toUpperCase()}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={style.applyContent}
                    disabled={item?.disabled || item?.eligible}
                    onPress={() => onApplyCoupon(item)}>
                    <Text
                      allowFontScaling={false}
                      style={[
                        style.applyText,
                        {
                          opacity: item?.disabled || item?.eligible ? 0.8 : 1,
                          color:
                            item?.disabled || item?.eligible
                              ? color.switchThumbColor
                              : color.golden,
                        },
                      ]}>
                      {item.disabled ? `Applied` : `Apply`}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text allowFontScaling={false} style={style.offText}>
                  {item?.discountType == 'flat'
                    ? `Save ₹${item?.discount} on total`
                    : `Get ${item?.discount}% off`}
                </Text>
                <View style={style.lineView} />
                <Text allowFontScaling={false} style={style.infoText}>
                  {item?.discountType == 'flat'
                    ? `Use code ${item?.couponTitle?.toUpperCase()} & get FLAT ₹${
                        item?.discount
                      } off on total`
                    : `Use code ${item?.couponTitle?.toUpperCase()} & get ${
                        item?.discount
                      }% off on total`}
                </Text>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={style.indicatorStyle}>
              <Text allowFontScaling={false} style={style.noTextData}>
                Coupon not available
              </Text>
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshCall}
              tintColor={color.white}
            />
          }
        />
      )}
    </View>
  );
};

export default CouponList;
