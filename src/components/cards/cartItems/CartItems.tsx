import React, {memo, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {CartItemsProps} from './cartItemsProps';
import constant from '../../../services/config/constant';
import SvgIndex from '../../../assets/svgIndex';
import styles from './cartItems.style';
import {useAppSelector} from '../../../services/config/redux/useReduxHooks';
import { color } from '../../../theme';

const CartItems: React.FC<CartItemsProps> = ({
  item,
  index,
  onDelete,
  onMinus,
  onPlus,
  onLike,
  valueData,
  hasCheckedDelivery,
}) => {
  let discountedPrice =
    item?.productId?.attributes?.filter(val =>
      val?.price === item?.price && val?.color === item?.attributes?.Color
        ? val?.discountedPrice
        : 0,
    )[0]?.discountedPrice || 0;
  let productPrice = item?.price || 0;
  const {token, cartList, wishListAll} = useAppSelector(
    state => state.UserReducer,
  );

  const isVariantWishlisted = wishListAll.find((wishItem: any) => {
    return (
      wishItem?.attributeId === item?.attributeId &&
      wishItem?.product?._id === item?.productId?._id
    );
  });

  return (
    <View style={styles.mainContainer}>
      <View
        style={[styles.container, {opacity: valueData ? 1 : 0.5}]}
        key={index}>
        <Image
          source={{uri: `${constant.ecomImageUrl}${item?.image}`}}
          style={styles.productThumbnails}
        />
        <View style={styles.flexRow}>
          <Text style={styles.productName}>{item?.productId?.productName}</Text>

          {(item?.attributes?.Size ||
            item?.attributes?.Color ||
            item?.attributes?.colorCode) && (
            <Text style={styles.productSize}>
              {item?.attributes?.Size ? `Size: ${item.attributes.Size}` : ''}
              {item?.attributes?.Size &&
              (item?.attributes?.Color || item?.attributes?.colorCode)
                ? ' | '
                : ''}
              {item?.attributes?.Color
                ? `Color: ${item.attributes.Color}`
                : item?.attributes?.colorCode
                ? `Color: ${item.attributes.colorCode}`
                : ''}
            </Text>
          )}

          <Text style={styles.productPrice}>
            ₹ {!discountedPrice ? productPrice : discountedPrice}
            {'  '}
            {!!discountedPrice && (
              <Text style={styles.strikeText}>₹{productPrice}</Text>
            )}
          </Text>
        </View>
        <View style={styles.cartContainers}>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onLike()}
              style={styles.likeIcon}>
              {item?.liked || isVariantWishlisted ? (
                <SvgIndex.HeartFill height={14} width={14} />
              ) : (
                <SvgIndex.Heart />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onDelete}
              style={styles.deleteIcon}>
              {/* <SvgIndex.DeleteIcn/> */}
              <SvgIndex.RedDeleteIcon/>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              disabled={!valueData || item?.quantity === 1}
              activeOpacity={0.7}
              onPress={onMinus}
              style={[
                styles.cartBtns,
                item?.quantity === 1 && styles.disableCartBtns,
              ]}>
              <SvgIndex.MinusCart />
            </TouchableOpacity>
            <Text style={styles.cartLabel}>{item?.quantity}</Text>
            <TouchableOpacity
              disabled={
                !valueData ||
                item?.quantity >= item?.productId?.maximumPurchaseQty
              }
              activeOpacity={0.7}
              onPress={onPlus}
              style={[
                styles.cartBtns,
                item?.quantity >= item?.productId?.maximumPurchaseQty &&
                  styles.disableCartBtns,
              ]}>
              <SvgIndex.PlusCart />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* {showError && (
  <Text style={styles.error}>Item cannot be delivered to the pincode</Text>
)} */}
      {!valueData && (
        <Text style={styles.error}>
          Item cannot be delivered to the pincode
        </Text>
      )}
    </View>
  );
};

export default memo(CartItems);
