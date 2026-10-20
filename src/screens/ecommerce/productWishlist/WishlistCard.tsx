import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import {color} from '../../../theme';
import constant from '../../../services/config/constant';
import SvgIndex from '../../../assets/svgIndex';
import {ProductsProps} from '../../../components/cards/products/productsProps';
import styles from '../../../components/cards/products/products.style';

const WishlistCard: React.FC<ProductsProps> = ({
  index,
  item,
  onPress,
  type = 'row',
  onHeartPress,
  onCartPress,
}) => {

  // Safely access attribute values
  const attributeId = item?.attributeId;
  const colorName = item?.attributes?.Color || '';
  const colorCode = item?.attributes?.colorCode || '';
  const size = item?.attributes?.Size || '';
  const imageUrl = `${constant.ecomImageUrl}${item?.product?.attributes[0]?.images[0]}`;

  let discountedPrice = item?.product?.attributes?.[0]?.discountedPrice || 0;
  let productPrice = item?.product?.attributes?.[0]?.price || 0;
  let stock = item?.product?.attributes?.[0]?.stock || 0;

  return (
    <TouchableOpacity
      style={[
        type === 'row'
          ? styles.container
          : [
              styles.columnContainer,
              {
                marginRight: index % 2 === 0 ? 11 : 0,
              },
            ],
      ]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View>
        <MaskedView
          style={{flex: 1}}
          maskElement={
            <SvgIndex.BottomMask
              height={type === 'row' ? 157 : 175}
              width={type === 'row' ? 157 : 175}
            />
          }>
          <Image
            source={{uri: imageUrl}}
            style={[
              type === 'row' ? styles.productImage : styles.columnProductImage,
            ]}
            resizeMode="stretch"
          />
        </MaskedView>

        <TouchableOpacity
          style={styles.heartIcon}
          activeOpacity={0.7}
          onPress={onHeartPress}>
          {item?.liked ? (
            <SvgIndex.HeartFill height={14} width={14} />
          ) : (
            <SvgIndex.Heart />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          disabled={stock === 0}
          style={[
            type === 'column'
              ? [
                  styles.cartIconColumn,
                  {
                    backgroundColor: item?.addedToCart
                      ? color.white
                      : color.goldenYellow,
                  },
                ]
              : [
                  styles.cartIcon,
                  {
                    backgroundColor: item?.addedToCart
                      ? color.white
                      : color.goldenYellow,
                  },
                ],
          ]}
          onPress={onCartPress}>
          {stock === 0 ? (
            <SvgIndex.StockOut />
          ) : item?.addedToCart ? (
            <SvgIndex.GoToCart />
          ) : (
            <SvgIndex.Bag />
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.productName} numberOfLines={1}>
        {item?.product?.productName}
      </Text>

      <Text style={styles.productPrice}>
        ₹ {!discountedPrice ? productPrice : discountedPrice}
        {'  '}
        {!!discountedPrice && (
          <Text style={styles.strikeText}>₹{productPrice}</Text>
        )}
      </Text>

      {/* ✅ Newly added fields from your API */}
      {colorName && <Text style={styles.productName}>Color: {colorName} </Text>}
      {size && <Text style={styles.productName}>Size: {size}</Text>}
      {/* <Text style={styles.productName}>Color: {colorName} </Text> */}
      {/* <Text style={styles.productName}>Size: {size}</Text> */}
    </TouchableOpacity>
  );
};

export default memo(WishlistCard);
