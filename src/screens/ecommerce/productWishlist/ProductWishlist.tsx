import {View, Text, FlatList, Image, ActivityIndicator} from 'react-native';
import React from 'react';
import {Button, CustomStatusBar} from '../../../components';
import EcomHeader from '../../../components/ecomHeader/EcomHeader';
import styles from './productWishlist.style';
import useProductWishlist from './useProductWishlist';
import ProductsCard from '../../../components/cards/products/ProductsCard';
import imageIndex from '../../../assets/imageIndex';
import {color} from '../../../theme';
import WishlistCard from './WishlistCard';

const ProductWishlist: React.FC = () => {
  const {
    onPressProduct,
    onPressWishlist,
    values,
    onRemoveWishlist,
    onCartPress,
    notificationCount,
  } = useProductWishlist();
  return (
    <View style={styles.container}>
      <CustomStatusBar transparent backgroundColor={color.blackBackground} />
      <EcomHeader
        showCart={false}
        showLogo={false}
        title="Wishlist"
        notificationBadge={notificationCount}
      />
      {values?.isLoading ? (
        <ActivityIndicator
          size={'large'}
          color={color.white}
          style={styles.activityIndicator}
        />
      ) : (
        <FlatList
          data={values?.productWishlist}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(_, index) => `${index}`}
          contentContainerStyle={styles.flatlistContainer}
          renderItem={({item, index}) => (
            <WishlistCard
              key={index}
              item={item}
              index={index}
              type={'column'}
              onPress={() => onPressProduct(item)}
              onHeartPress={() => onRemoveWishlist(item?.objectId)}
              onCartPress={() => onCartPress(item?._id, index)}
            />
          )}
          ListEmptyComponent={() => (
            <View style={styles.contentStyle}>
              <Image
                source={imageIndex.placeholderWishlist}
                style={styles.placeholderWishList}
              />
              <Text style={styles.title}>Your Wishlist is Empty!</Text>
              <Text style={styles.description}>
                Explore more and shortlist some items
              </Text>
              <Button
                title="Start Shopping"
                buttonTouchable={styles.buttonContainer}
                containerStyle={styles.btnWrapper}
                titleStyle={styles.buttonText}
                mainContainer={styles.buttonWrapper}
                onPress={onPressWishlist}
                gradient={color.categorySelected}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ProductWishlist;
