import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  ScrollView,
  FlatList,
  ViewStyle,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import styles from './ecomHomePage.style';
import { CustomStatusBar } from '../../../components';
import imageIndex from '../../../assets/imageIndex';
import { color } from '../../../theme';
import EcomHeader from '../../../components/ecomHeader/EcomHeader';
import SvgIndex from '../../../assets/svgIndex';
import useEcomHomePage from './useEcomHomePage';
import CategoriesCard from '../../../components/cards/categoriesCard/CategoriesCard';
import ProductsCard from '../../../components/cards/products/ProductsCard';
import LinearGradient from 'react-native-linear-gradient';
import constant from '../../../services/config/constant';

const EcomHomePage = () => {
  const {
    values,
    setValues,
    onPressProduct,
    showAllProducts,
    onPressMenu,
    showCategoryProducts,
    onLike,
    onCartPress,
    cartItem,
    notificationCount,
    isHeartDisabled,
  } = useEcomHomePage();

  const filterProducts = (searchText: string) => {
    if (!searchText.trim()) {
      return [];
    }

    const searchTerm = searchText.toLowerCase();

    return values.products.filter(product => {
      const nameMatch = product.productName?.toLowerCase().includes(searchTerm);

      const cleanDescription = product.description?.replace(/<[^>]*>/g, '');
      const descriptionMatch = cleanDescription
        ?.toLowerCase()
        .includes(searchTerm);

      const categoryMatch = product.category?.name
        ?.toLowerCase()
        .includes(searchTerm);

      const codeMatch = product.productCode?.toString().includes(searchTerm);

      const attributesMatch = product.attributes?.some(
        attr =>
          attr.name?.toLowerCase().includes(searchTerm) ||
          attr.value?.toLowerCase().includes(searchTerm),
      );
      return (
        nameMatch ||
        descriptionMatch ||
        categoryMatch ||
        codeMatch ||
        attributesMatch
      );
    });
  };

  const searchResults = filterProducts(values.search);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={imageIndex.ecomhomeBackground}
        style={styles.backgroundImageContainer}>
        <CustomStatusBar transparent backgroundColor={color.blackBackground} />
        <EcomHeader
          cartBadge={cartItem?.length === 0 ? false : cartItem?.length}
          notificationBadge={notificationCount}
          showBack={false}
          showMenu={true}
          onPressMenu={onPressMenu}
        />
        <View style={styles.searchInputContainer}>
          <SvgIndex.SearchIcn height={15} width={15} />
          <TextInput
            placeholder="Search"
            style={styles.inputContainer}
            placeholderTextColor={color.white + '99'}
            onChangeText={txt => setValues('search', txt)}
            value={values?.search}
          />
          {values?.search && (
            <Pressable
              style={styles.closeIcon}
              onPress={() => setValues('search', '')}>
              <SvgIndex.Close />
            </Pressable>
          )}
        </View>
        {values.search ? (
          <View
            style={{
              flex: 1,
              alignSelf: searchResults.length > 1 ? 'center' : 'flex-start',
              marginTop: 20,
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                paddingBottom: 14,
                textAlign: 'left',
              }}>
              {searchResults.length > 0
                ? `Search results for`
                : `No results found`}
            </Text>

            {searchResults.length > 0 && (
              <FlatList
                data={searchResults}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item._id}
                renderItem={({ item, index }) => (
                  <ProductsCard
                    item={item}
                    onPress={() => onPressProduct(item)}
                    onCartPress={() => onCartPress(item?._id, index)}
                    onHeartPress={() => onLike(item, index)}
                    showCategory={true}
                  />
                )}
              />
            )}
          </View>
        ) : (
          <>
            {values?.isLoading ? (
              <ActivityIndicator
                size={'large'}
                color={color.white}
                style={styles.activityIndicator}
              />
            ) : (
              <ScrollView
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}>
                <View style={styles.appBannerView}>
                  <ImageBackground
                    source={imageIndex.appbaner}
                    style={styles.appBannerImage}
                    resizeMode="contain">
                    <View style={styles.welcomeBox}>
                      <Text style={styles.welcomeLabel}>
                        Welcome to Connplex
                      </Text>
                    </View>
                    <Text style={styles.welcomeDescriptionDark}>
                      {`Explore, Discover, Shop.\n`}
                      <Text style={styles.welcomeDescriptionLight}>
                        {`Your Perfect Product\nAwaits!`}
                      </Text>
                    </Text>
                  </ImageBackground>
                </View>
                {/* Category */}
                {values?.categories?.length >= 1 && (
                  <View>
                    <Section title="Categories" onPress={() => null} hideAll />
                    <FlatList
                      data={[
                        { _id: 'all', name: 'All', image: null },
                        ...values.categories,
                      ]}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(_, index) => `${index}`}
                      style={styles.categoryContainer}
                      renderItem={({ index, item }) => (
                        <CategoriesCard
                          key={index}
                          item={item}
                          index={index}
                          onPress={res => showCategoryProducts(res.name, res)}
                          selected={values.selectedCategory}
                        />
                      )}
                    />
                  </View>
                )}
                {values?.products?.length > 0 && (
                  <View>
                    <Section
                      title="Popular Products"
                      onPress={() => showAllProducts('Popular Products')}
                    />
                    <FlatList
                      data={values?.products}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item) => item._id}
                      style={styles.popularList}
                      renderItem={({ item, index }) => (
                        <ProductsCard
                          key={index}
                          item={item}
                          index={index}
                          onPress={() => onPressProduct(item)}
                          onCartPress={() => onCartPress(item?._id, index)}
                          onHeartPress={() => onLike(item)}
                        />
                      )}
                    />
                  </View>
                )}

                {/* Banners */}
                {values?.bannerData?.map((item, index) => (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      showCategoryProducts(
                        item?.categoryId?.name,
                        item?.categoryId,
                      )
                    }>
                    <ImageBackground
                      source={{ uri: constant.ecomImageUrl + item.banner }}
                      key={index}
                      style={styles.collectionBanner}
                      borderRadius={10}>
                      <LinearGradient
                        colors={color.leanerBottomColor}
                        style={[styles.intakeShadow]}>
                        <View
                          style={[
                            styles.collectionView,
                            {
                              alignSelf:
                                index % 2 == 0 ? 'flex-start' : 'flex-end',
                            },
                          ]}>
                          <Text style={styles.bannerName} numberOfLines={2}>
                            {item.title
                              ?.split(' ')
                              .toString()
                              .replace(',', '\n')}
                          </Text>
                          <Text style={styles.bannerDes} numberOfLines={2}>
                            {item.description}
                          </Text>
                          <Pressable
                            onPress={() =>
                              showCategoryProducts(
                                item?.categoryId?.name,
                                item?.categoryId,
                              )
                            }>
                            <Text style={styles.exploreBtn}>Explore</Text>
                          </Pressable>
                        </View>
                      </LinearGradient>
                    </ImageBackground>
                  </TouchableOpacity>
                ))}
                {values?.products?.length > 0 && (
                  <View>
                    <Section
                      title="New IN"
                      onPress={() => showAllProducts('New IN')}
                    />
                    <FlatList
                      data={values?.products}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(_, index) => `${index}`}
                      style={styles.categoryContainer}
                      renderItem={({ index, item }) => (
                        <ProductsCard
                          key={index}
                          item={item}
                          index={index}
                          onPress={() => onPressProduct(item)}
                          onCartPress={() => onCartPress(item?._id, index)}
                          onHeartPress={() => onLike(item, index)}
                        />
                      )}
                    />
                  </View>
                )}
              </ScrollView>
            )}
          </>
        )}
      </ImageBackground>
    </View>
  );
};

export default EcomHomePage;

export const Section: React.FC<{
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  hideAll?: boolean;
}> = ({ onPress, title, style, hideAll = false }) => {
  return (
    <View style={[styles.sectionContainer, style]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {!hideAll && (
        <Pressable onPress={onPress}>
          <Text style={styles.viewAllTitle}>See All</Text>
        </Pressable>
      )}
    </View>
  );
};
