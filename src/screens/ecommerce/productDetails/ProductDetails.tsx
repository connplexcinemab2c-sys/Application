import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Pressable,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  useWindowDimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RenderHtml from 'react-native-render-html';
import {AttributesProps} from '../ecomHomePage/ecomHomePageProps';
import {Button} from '../../../components';
import {color} from '../../../theme';
import constant from '../../../services/config/constant';
import ProductsCard from '../../../components/cards/products/ProductsCard';
import ReadMoreText from '../../../components/readMoreText/ReadMoreText';
import {Section} from '../ecomHomePage/EcomHomePage';
import SvgIndex from '../../../assets/svgIndex';
import useProductDetails from './useProductDetails';
import styles from './productDetails.style';
import LoginModal from '../../loginModal.ts/LoginModal';
import Log from '../../../utility/log';
import HtmlReadMore from '../../../components/htmlreadmore/HtmlReadMore';
import imageIndex from '../../../assets/imageIndex';
import FullScreenLoader from '../../../components/loading/FullScreenLoader';

const ProductDetails = () => {
  const {
    onPressBack,
    values,
    setValues,
    validation,
    onLikeClick,
    handleColor,
    handleProductImage,
    cartItem,
    verifyPincode,
    incrementQuantity,
    decrementQuantity,
    skipFields,
    attributeFilter,
    handleChangeVariant,
    variantDetail,
    productPrice,
    discountedPrice,
    isCartExist,
    handleGoToCart,
    attributeIds,
    getWishlistApi,
    onCartPress,
    onPressProduct,
    handleRefresh,
    onEndReached,
    onLike,
    onPlus,
    isVariantInCart,
    onMinus,
    newLoad,
  } = useProductDetails();

  const {width, height} = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (newLoad) {
      opacityAnim.setValue(1);
    } else {
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }
  }, [newLoad]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FullScreenLoader visible={newLoad} />

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          ref={scrollRef}>
          <ImageBackground
            source={{
              uri: `${constant.ecomImageUrl}${values?.activeProductImage}`,
            }}
            borderBottomLeftRadius={54}
            borderBottomRightRadius={54}
            resizeMode="strech"
            style={{
              aspectRatio: 1,
              borderBottomLeftRadius: 80,
              borderBottomRightRadius: 80,
            }}>
            <Pressable style={styles.backButton} onPress={onPressBack}>
              <SvgIndex.BackArrow />
            </Pressable>

            <View style={styles.imagesWhistContainer}>
              <View style={styles.leftSideImageContainer}>
                {values?.productDetail?.attributes?.[
                  values?.activeColor
                ]?.images
                  ?.slice(0, 3)
                  ?.map((res: string, index: number) => (
                    <Pressable
                      onPress={() => handleProductImage(res)}
                      key={index}>
                      <Image
                        source={{uri: `${constant.ecomImageUrl}${res}`}}
                        style={[
                          styles.smallImage,
                          {
                            borderWidth: 2,
                            borderColor:
                              values?.activeProductImage == res
                                ? color.goldenYellow
                                : '#00000000',
                          },
                        ]}
                      />
                    </Pressable>
                  ))}
              </View>
              <Pressable style={styles.droppedShadow} onPress={onLikeClick}>
                <LinearGradient
                  colors={color.categorySelected}
                  style={styles.whistListButton}>
                  {values?.isWhistListed ? (
                    <SvgIndex.HeartFill />
                  ) : (
                    <SvgIndex.HeartStroke />
                  )}
                </LinearGradient>
              </Pressable>
              <View style={styles.rightSideImageContainer}>
                {values?.productDetail?.attributes?.[
                  values?.activeColor
                ]?.images
                  ?.slice(3)
                  ?.map((res: string, index: number) => (
                    <Pressable
                      onPress={() => handleProductImage(res)}
                      key={index}>
                      <Image
                        source={{uri: `${constant.ecomImageUrl}${res}`}}
                        style={[
                          styles.smallImage,
                          {
                            borderWidth: 2,
                            borderColor:
                              values?.activeProductImage == res
                                ? color.goldenYellow
                                : '#00000000',
                          },
                        ]}
                      />
                    </Pressable>
                  ))}
              </View>
            </View>
          </ImageBackground>
          <View style={styles.productContentContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.productName}>
                {values?.productDetail?.productName}
              </Text>
              <Text style={styles.productPrice}>
                ₹{' '}
                {values?.productDetail?.attributes?.[values?.activeColor]
                  ?.discountedPrice
                  ? values?.productDetail?.attributes?.[values?.activeColor]
                      ?.discountedPrice
                  : values?.productDetail?.attributes?.[values?.activeColor]
                      ?.price}
              </Text>
            </View>

            <View style={{marginTop: 12}}>
              <HtmlReadMore htmlContent={values?.productDetail?.description} />
            </View>

            {values?.productDetail?.attributes?.some(
              (attr: any) => attr?.Color || attr?.colorCode,
            ) && (
              <View>
                <Text style={styles.chooseColor}>Choose Colors</Text>
                <View style={styles.wrapperContainer}>
                  {values?.productDetail?.attributes
                    ?.filter((attr: any) => attr?.Color || attr?.colorCode)
                    ?.map((attr: any, index: number) => {
                      const attrColorCode =
                        attr?.colorCode || attr?.Color?.toLowerCase();
                      const isSelected = values?.activeVariantId === attr?._id;

                      return (
                        <Pressable
                          key={attr?._id}
                          onPress={() => {
                            setValues('activeVariantId', attr._id);
                            setValues('activeColor', index);
                            setValues('activeProductImage', attr?.images?.[0]);
                            setValues('activeProductSize', attr?.Size?.[0]);
                            setValues('variantDetail', attr);
                            setValues('quantity', 1);
                            setValues('attributeFilter', {
                              ...values.attributeFilter,
                              Color: attr?.Color,
                              Size: attr?.size?.[0],
                            });
                            getWishlistApi();
                          }}
                          style={[
                            styles.consumeContainer,
                            {
                              borderColor: isSelected
                                ? attrColorCode
                                : color.whiteBorderLight,
                            },
                          ]}>
                          <View
                            style={[
                              styles.hexCodeContainer,
                              {
                                backgroundColor: attrColorCode,
                              },
                            ]}
                          />
                        </Pressable>
                      );
                    })}
                </View>
              </View>
            )}

            {values?.productDetail?.attributes?.length > 0 &&
  values?.productDetail?.attributes?.every(
    attr => (attr.size || attr.Size || []).length > 0,
  ) &&
  (values?.variantDetail?.size || values?.variantDetail?.Size)?.length > 0 && (
    <View>
      <Text style={[styles.chooseColor, {marginTop: 16}]}>Size</Text>
      <View style={styles.wrapperContainer}>
        {(values?.variantDetail?.size || values?.variantDetail?.Size)?.map(
          (size: string, index: number) => (
            <Pressable
              key={index}
              onPress={() => {
                setValues('activeProductSize', size);
                setValues(
                  'quantity',
                  isVariantInCart ? values.quantity : 1,
                );
                setValues('attributeFilter', {
                  ...values.attributeFilter,
                  Size: size,
                });
              }}>
              <LinearGradient
                colors={
                  values?.activeProductSize === size
                    ? color.categorySelected
                    : [color.translucent, color.translucent]
                }
                style={[styles.consumeContainer]}>
                <Text style={styles.productSize}>{size}</Text>
              </LinearGradient>
            </Pressable>
          ),
        )}
      </View>
    </View>
  )}


{/*         
            {values?.productDetail?.attributes[0]?.Size && (
              <View>
                <Text style={[styles.chooseColor, {marginTop: 16}]}>Size</Text>
                <View style={styles.wrapperContainer}>
                  {values?.productDetail?.attributes[0]?.Size?.map(
                    (size: string, index: number) => (
                      <Pressable
                        key={index}
                        onPress={() => {
                          setValues('activeProductSize', size);
                          setValues(
                            'quantity',
                            isVariantInCart ? values.quantity : 1,
                          );
                        }}>
                        <LinearGradient
                          colors={
                            values?.activeProductSize === size
                              ? color.categorySelected
                              : [color.translucent, color.translucent]
                          }
                          style={[styles.consumeContainer]}>
                          <Text style={styles.productSize}>{size}</Text>
                        </LinearGradient>
                      </Pressable>
                    ),
                  )}
                </View>
              </View>
            )}

            {(values?.variantDetail?.Size || []).length > 0 && (
              <View>
                <Text style={[styles.chooseColor, {marginTop: 16}]}>Size</Text>
                <View style={styles.wrapperContainer}>
                  {values?.variantDetail?.Size.map(
                    (size: string, index: number) => (
                      <Pressable
                        key={index}
                        onPress={() => {
                          setValues('activeProductSize', size);
                          setValues(
                            'quantity',
                            isVariantInCart ? values.quantity : 1,
                          );
                          setValues('attributeFilter', {
                            ...values.attributeFilter,
                            Size: size,
                          });
                        }}>
                        <LinearGradient
                          colors={
                            values?.activeProductSize === size
                              ? color.categorySelected
                              : [color.translucent, color.translucent]
                          }
                          style={[styles.consumeContainer]}>
                          <Text style={styles.productSize}>{size}</Text>
                        </LinearGradient>
                      </Pressable>
                    ),
                  )}
                </View>
              </View>
            )}

            {(values?.variantDetail?.size || []).length > 0 && (
              <View>
                <Text style={[styles.chooseColor, {marginTop: 16}]}>Size</Text>
                <View style={styles.wrapperContainer}>
                  {values?.variantDetail?.size.map(
                    (size: string, index: number) => (
                      <Pressable
                        key={index}
                        onPress={() => {
                          setValues('activeProductSize', size);
                          setValues(
                            'quantity',
                            isVariantInCart ? values.quantity : 1,
                          );
                          setValues('attributeFilter', {
                            ...values.attributeFilter,
                            Size: size,
                          });
                        }}>
                        <LinearGradient
                          colors={
                            values?.activeProductSize === size
                              ? color.categorySelected
                              : [color.translucent, color.translucent]
                          }
                          style={[styles.consumeContainer]}>
                          <Text style={styles.productSize}>{size}</Text>
                        </LinearGradient>
                      </Pressable>
                    ),
                  )}
                </View>
              </View>
            )} */}

            <View style={styles.quantityContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={values.quantity <= 1}
                style={{opacity: values.quantity <= 1 ? 0.5 : 1}}
                onPress={onMinus}>
                <SvgIndex.Minus />
              </TouchableOpacity>

              <Text allowFontScaling={false} style={styles.quantity}>
                {values.quantity}
              </Text>

              <TouchableOpacity
                activeOpacity={0.7}
                disabled={
                  values?.productDetail?.attributes?.[values?.activeColor]
                    ?.stock === 0 ||
                  values?.quantity ===
                    values?.productDetail?.maximumPurchaseQty ||
                  values?.quantity ===
                    values?.productDetail?.attributes?.[values?.activeColor]
                      ?.stock
                }
                style={{
                  opacity:
                    values?.productDetail?.attributes?.[values?.activeColor]
                      ?.stock === 0 ||
                    values?.quantity ===
                      values?.productDetail?.attributes?.[values?.activeColor]
                        ?.stock ||
                    values?.quantity ===
                      values?.productDetail?.maximumPurchaseQty
                      ? 0.5
                      : 1,
                }}
                onPress={onPlus}>
                <SvgIndex.PlusSmall />
              </TouchableOpacity>
            </View>

            <Text style={[styles.chooseColor, {marginTop: 16}]}>
              Check Availability at
            </Text>
            <View style={styles.couponModuleContainer}>
              <TextInput
                style={styles.couponInput}
                placeholder="Enter Pincode / Zip Code"
                placeholderTextColor={color.pincodeText}
                value={values?.pincode}
                onChangeText={(text: string) =>
                  setValues('pincode', text?.trimStart())
                }
                maxLength={6}
                keyboardType="numeric"
              />
              <Button
                title={values?.applyPincode === 'Checked' ? 'Checked' : 'Check'}
                onPress={verifyPincode}
                disabled={values?.pincode?.length !== 6}
                mainContainer={styles.couponApplyButtonMainContainer}
                containerStyle={[
                  styles.couponApplyButtonContainer,
                  {
                    borderWidth: values?.applyPincode === 'Checked' ? 1 : 0,
                    borderColor:
                      values?.applyPincode === 'Checked'
                        ? color.goldenYellow
                        : color.white,
                  },
                ]}
                titleStyle={[
                  styles.check,
                  {
                    color:
                      values?.applyPincode === 'Checked'
                        ? color.goldenYellow
                        : color.white,
                  },
                ]}
                gradient={
                  values?.applyPincode === 'Checked'
                    ? [color.transparent]
                    : color.categorySelected
                }
                isLoading={values?.pincodeSpinner}
              />
            </View>
            <Text
              style={{
                color: values?.pinStatus ? 'green' : 'red',
                fontSize: 13,
                marginTop: 5,
                fontFamily: 'Poppins-Medium',
              }}>
              {values?.pinMessage}
            </Text>
            {values?.relatedProducts.length > 0 ? (
              <>
                <Text style={[styles.chooseColor, {bottom: 6}]}>
                  Related Products
                </Text>
                <View style={{}}>
                  <FlatList
                    data={values?.relatedProducts}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={styles.flatlistContainer}
                    keyExtractor={(_, index) => `${index}`}
                    renderItem={({item, index}) => (
                      <ProductsCard
                        key={index}
                        item={item}
                        index={index}
                        onPress={() => onPressProduct(item, scrollRef)}
                        onCartPress={() => onCartPress(item, index)}
                        onHeartPress={() => onLike(item, index)}
                      />
                    )}
                  />
                </View>
              </>
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footerPrice}>
        <View style={styles.flex}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.productPrice}>
            ₹{!discountedPrice ? productPrice : discountedPrice}
            {'  '}
            {!!discountedPrice && (
              <Text style={styles.strikeText}>₹{productPrice}</Text>
            )}
          </Text>
        </View>

        <LinearGradient
          colors={['#EAAC2F', '#F3ED9A']}
          start={{x: 0.5, y: 0}}
          end={{x: 1, y: 1}}
          style={[
            styles.buttonContainer,
            values?.productDetail?.attributes?.[values?.activeColor]?.stock ==
              0 && {
              opacity: 0.5,
            },
          ]}>
          <TouchableOpacity
            onPress={() => (isVariantInCart ? handleGoToCart() : validation())}
            disabled={
              values?.productDetail?.attributes?.[values?.activeColor]?.stock ==
              0
            }
            style={styles.buttonMain}>
            {values?.addToCartSpinner ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {values?.productDetail?.attributes?.[values?.activeColor]
                  ?.stock === 0
                  ? 'Out Of Stock'
                  : isVariantInCart
                  ? 'Go To Cart'
                  : 'Add To Cart'}
              </Text>
            )}
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

export default ProductDetails;
