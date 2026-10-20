import React, {memo, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import {color} from '../../../theme';
import constant from '../../../services/config/constant';
import {ProductsProps} from './productsProps';
import SvgIndex from '../../../assets/svgIndex';
import styles from './products.style';

const ProductsCard: React.FC<ProductsProps> = ({
  index,
  item,
  onPress,
  type = 'row',
  onHeartPress,
  onCartPress,
  disbableCart,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleHeartPress = () => {
    if (isDisabled) return; 

    setIsDisabled(true);
    onHeartPress(); 

    setTimeout(() => {
      setIsDisabled(false);
    }, 1000); 
  };

  let discountedPrice = item?.attributes?.[0]?.discountedPrice || 0;
  let productPrice = item?.attributes?.[0]?.price || 0;
  let stock = item?.attributes?.[0]?.stock || 0;
  return (
    <TouchableOpacity
      style={[
        type == 'row'
          ? styles.container
          : [
              styles.columnContainer,
              {
                marginRight: index % 2 == 0 ? 11 : 0,
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
              height={type == 'row' ? 157 : 175}
              width={type == 'row' ? 157 : 175}
            />
          }>
          <Image
            source={{
              uri: `${constant.ecomImageUrl}${item?.attributes?.[0]?.images?.[0]}`,
            }}
            style={[
              type == 'row' ? styles.productImage : styles.columnProductImage,
            ]}
            resizeMode="stretch"
          />
        </MaskedView>
        <TouchableOpacity
          style={styles.heartIcon}
          activeOpacity={0.7}
          onPress={handleHeartPress}
          >

          
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
            type == 'column'
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
        {item?.productName}
      </Text>
      <Text style={styles.productPrice}>
        ₹ {!discountedPrice ? productPrice : discountedPrice}
        {'  '}
        {!!discountedPrice && (
          <Text style={styles.strikeText}>₹{productPrice}</Text>
        )}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(ProductsCard);
