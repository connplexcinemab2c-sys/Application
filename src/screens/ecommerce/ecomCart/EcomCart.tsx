import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './ecomCart.style';
import {Button, CustomStatusBar} from '../../../components';
import EcomHeader from '../../../components/ecomHeader/EcomHeader';
import {color} from '../../../theme';
import CartItems from '../../../components/cards/cartItems/CartItems';
import useEcomCart from './useEcomCart';
import imageIndex from '../../../assets/imageIndex';
import LinearGradient from 'react-native-linear-gradient';
import SvgIndex from '../../../assets/svgIndex';
import {useIsFocused} from '@react-navigation/native';

const EcomCart = () => {
  const isFocused = useIsFocused();
  const [Loading, setLoading] = useState(false);
  const {
    onPressCheckOut,
    values,
    onPlus,
    onMinus,
    onDelete,
    onPressWishlist,
    onApplyCoupon,
    setValues,
    onPressAddAddress,
    onLike,
    getDeliveryCharges,
    getAllCartApi,
    onLoad,
    onHeartPress,
    showEmpty,
    notificationCount,
  } = useEcomCart();
  return (
    <View style={styles.container}>
      <CustomStatusBar transparent backgroundColor={color.blackBackground} />
      <EcomHeader
        showCart={false}
        showLogo={false}
        title="Shopping Bag"
        notificationBadge={notificationCount}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {values?.isLoading || onLoad ? (
          <ActivityIndicator
            size={'large'}
            color={color.white}
            style={styles.activityIndicator}
          />
        ) : (
          <>
            <ScrollView
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}>
              {values?.cartData?.length > 0 &&
                (!values?.selectedAddress?.addressDetails?.billing_address ? (
                  <Button
                    title="+ Add address"
                    onPress={onPressAddAddress}
                    containerStyle={styles.addAddress}
                  />
                ) : (
                  <LinearGradient
                    locations={[0.5, 0.1, 1]}
                    colors={color.categorySelected}
                    style={styles.linearBox}>
                    <View style={styles.addAddress}>
                      <Text style={styles.addLabel}>Delivery Address</Text>
                      <Text
                        style={styles.address}
                        numberOfLines={2}
                        ellipsizeMode="tail">
                        {`${values?.selectedAddress?.addressDetails?.billing_address}, ${values?.selectedAddress?.addressDetails?.billing_landmark}, ${values?.selectedAddress?.addressDetails?.billing_city}, ${values?.selectedAddress?.addressDetails?.billing_zip}`}
                      </Text>
                      <Pressable
                        style={styles.editAddressContainer}
                        onPress={onPressAddAddress}>
                        <SvgIndex.LocationPin />
                        <Text style={styles.editAddress}>Change Address</Text>
                      </Pressable>
                    </View>
                    <View style={styles.homeIcon}>
                      <SvgIndex.HomeTint />
                    </View>
                  </LinearGradient>
                ))}
              <FlatList
                data={values?.cartData}
                style={styles.cartItemsStyles}
                keyExtractor={(_, index) => `${index}`}
                renderItem={({index, item}) => (
                  <CartItems
                    index={index}
                    item={item}
                    onPlus={() => onPlus(item)}
                    onMinus={() => onMinus(item)}
                    onDelete={() => onDelete(item)}
                    onLike={() => onLike(item, index)}
                    valueData={values?.deliveryPrice}
                  />
                )}
                scrollEnabled={false}
                contentContainerStyle={styles.flatlistContainer}
                ListEmptyComponent={() =>
                  showEmpty ? (
                    <View style={styles.emptyContainer}>
                      <Image
                        source={imageIndex.placeholderWishlist}
                        style={styles.placeholderWishList}
                      />
                      <Text style={styles.emptyLabel}>Your Cart is Empty</Text>
                      <Text style={styles.emptySubLabel}>
                        Add items to it now.
                      </Text>
                      <Button
                        title="Start Shopping"
                        buttonTouchable={styles.btnContainer}
                        containerStyle={styles.btnWrapper}
                        titleStyle={styles.buttonText}
                        mainContainer={styles.buttonWrapper}
                        onPress={onPressWishlist}
                        gradient={color.categorySelected}
                      />
                    </View>
                  ) : null
                }
              />
            </ScrollView>
            {values?.cartData?.length !== 0 && (
              <View style={styles.footerDock}>
                <View style={styles.couponModuleContainer}>
                  <TextInput
                    style={styles.couponInput}
                    placeholder="Enter Coupon Code"
                    value={values?.coupon}
                    onChangeText={(text: string) =>
                      setValues('coupon', text?.trimStart())
                    }
                  />
                  <Button
                    title={
                      values?.applyCoupon === 'Applied' ? 'Remove' : 'Apply'
                    }
                    onPress={onApplyCoupon}
                    isLoading={values?.isLoadCoupon}
                    mainContainer={styles.couponApplyButtonMainContainer}
                    containerStyle={[
                      styles.couponApplyButtonContainer,
                      {
                        borderColor:
                          values?.applyCoupon === 'Applied'
                            ? color.goldenYellow
                            : color.white,
                      },
                    ]}
                    titleStyle={[
                      styles.apply,
                      {
                        color:
                          values?.applyCoupon === 'Applied'
                            ? color.goldenYellow
                            : color.white,
                      },
                    ]}
                    gradient={
                      values?.applyCoupon === 'Applied'
                        ? [color.transparent]
                        : color.categorySelected
                    }
                    disabled={values?.coupon?.length < 1}
                  />
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.dockLabel}>
                    {values?.cartData?.length} Item
                  </Text>
                  <Text style={styles.dockLabel}>
                    ₹{values?.totalPrice.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.dockLabel}>Delivery</Text>
                  <Text style={styles.dockLabel}>
                    ₹{onLoad ? ' Loading...' : values?.deliveryPrice.toFixed(2)}
                  </Text>
                </View>
                {values?.membershipDiscount !== '' && (
                  <View style={styles.rowContainer}>
                    <Text style={styles.dockLabel}>Membership Discount</Text>
                    <Text style={styles.couponValueLabel}>
                      - ₹{values?.membershipDiscountAmount.toFixed(2)}
                    </Text>
                  </View>
                )}
                {values?.applyCoupon === 'Applied' && (
                  <View style={styles.rowContainer}>
                    <Text style={styles.dockLabel}>Coupon Discount</Text>
                    <Text style={styles.couponValueLabel}>
                      - ₹{values?.couponAmount.toFixed(2)}
                    </Text>
                  </View>
                )}
                <View style={styles.sapline} />
                <View style={[styles.rowContainer]}>
                  <Text style={styles.totalCost}>Total Cost</Text>
                  <Text style={styles.totalCost}>
                    ₹{values?.totalCost.toFixed(2) || 'Loading...'}
                  </Text>
                </View>

                <Button
                  title="Check out"
                  containerStyle={styles.buttonContainer}
                  titleStyle={styles.buttonText}
                  gradient={color.checkoutGradient}
                  onPress={onPressCheckOut}
                  isLoading={values?.loadCheckout}
                  disabled={values.deliveryPrice == 0 ? true : false}
                />
              </View>
            )}
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default EcomCart;
