import {
  View,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React from 'react';
import useOrderHistory from './useOrderHistory';
import styles from './orderHistory.style';
import {Button, CustomStatusBar, OrderHistoryCard} from '../../../components';
import EcomHeader from '../../../components/ecomHeader/EcomHeader';
import {color} from '../../../theme';
import imageIndex from '../../../assets/imageIndex';

const OrderHistory: React.FC = () => {
  const {
    onOrderDetails,
    values,
    onPressWishlist,
    onRefreshData,
    notificationCount,
  } = useOrderHistory();
  return (
    <View style={styles.container}>
      <CustomStatusBar transparent backgroundColor={'#00000000'} />
      <EcomHeader
        showCart={false}
        showLogo={false}
        title="My Orders"
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
          data={values?.orderHistory}
          renderItem={({item, index}) => (
            <OrderHistoryCard
              item={item}
              index={index}
              onOrderDetail={() => onOrderDetails(item)}
            />
          )}
          contentContainerStyle={styles.flatlistContainer}
          keyExtractor={(_, index) => `${index}`}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.contentStyle}>
              <Image
                source={imageIndex.placeholderWishlist}
                style={styles.placeholderWishList}
              />
              <Text style={styles.title}>No Orders Yet!</Text>
              <Text style={styles.description}>
                Explore more and shortlist some items
              </Text>
              <View style={styles.buttonWrapper}>
                <Button
                  title="Start Shopping"
                  buttonTouchable={styles.buttonContainer}
                  containerStyle={styles.btnWrapper}
                  mainContainer={styles.buttonWidth}
                  titleStyle={styles.buttonText}
                  onPress={onPressWishlist}
                  gradient={color.categorySelected}
                />
              </View>
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={values?.isRefreshing}
              onRefresh={onRefreshData}
              tintColor={color.white}
            />
          }
        />
      )}
    </View>
  );
};

export default OrderHistory;
