import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Image,
  RefreshControl,
} from 'react-native';
import React from 'react';
import styles from './allProducts.style';
import { CustomStatusBar } from '../../../components';
import EcomHeader from '../../../components/ecomHeader/EcomHeader';
import useAllProducts from './useAllProducts';
import ProductsCard from '../../../components/cards/products/ProductsCard';
import { color } from '../../../theme';
import imageIndex from '../../../assets/imageIndex';

const AllProducts = () => {
  const {
    category,
    onPressProduct,
    values,
    onLike,
    onCartPress,
    onEndReached,
    handleRefresh,
    notificationCount,
    onAllCartPress,
    onAllLike,
  } = useAllProducts();
  return (
    <View style={styles.container}>
      <CustomStatusBar transparent backgroundColor={color.blackBackground} />
      <EcomHeader
        showCart={false}
        showLogo={false}
        title={category}
        notificationBadge={notificationCount}
      />
      {values?.isLoading ? (
        <ActivityIndicator
          color={color.white}
          style={styles.activityIndicator}
          size={'large'}
        />
      ) : category === 'All' ? (
        <FlatList
          data={values?.allCategoryProducts}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => `${index}`}
          contentContainerStyle={styles.flatlistContainer}
          renderItem={({ item, index }) => (
            <ProductsCard
              key={index}
              item={item}
              index={index}
              type={'column'}
              onPress={() => onPressProduct(item)}
              onCartPress={() => onAllCartPress(item?._id, index)}
              onHeartPress={() => onAllLike(item, index)}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={values?.isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          onEndReached={onEndReached}
          ListFooterComponent={() =>
            values?.products?.length >= 6 &&
            values.isPagination && (
              <ActivityIndicator
                color={color.white}
                style={styles.indicatorStyle}
              />
            )
          }

        />

      ) : (
        <FlatList
          data={values?.products}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={styles.flatlistContainer}
          keyExtractor={(_, index) => `${index}`}
          renderItem={({ item, index }) => (
            <>
              <Text style={{ color: '#fff' }}>{item?.name}</Text>
              <ProductsCard
                key={index}
                item={item}
                index={index}
                onPress={() => onPressProduct(item)}
                type={'column'}
                onCartPress={() => onCartPress(item?._id, index)}
                onHeartPress={() => onLike(item, index)}
              />
            </>


          )}
          refreshControl={
            <RefreshControl
              refreshing={values?.isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          onEndReached={onEndReached}
          ListFooterComponent={() =>
            values?.products?.length >= 6 &&
            values.isPagination && (
              <ActivityIndicator
                color={color.white}
                style={styles.indicatorStyle}
              />
            )
          }
          ListEmptyComponent={() => (
            <View style={styles.contentStyle}>
              <Image
                source={imageIndex.placeholderWishlist}
                style={styles.placeholderWishList}
              />
              <Text style={styles.title}>No Product Found!</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default AllProducts;
