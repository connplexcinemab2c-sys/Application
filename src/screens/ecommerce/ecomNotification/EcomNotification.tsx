import React from 'react';
import {
  View,
  Text,
  SectionList,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import styles from './ecomNotification.style';
import {color} from '../../../theme';
import {CustomStatusBar, NotificationShimmer} from '../../../components';
import EcomHeader from '../../../components/ecomHeader/EcomHeader';
import useEcomNotification from './useEcomNotification';
import EcomNotificationCard from '../../../components/cards/ecomNotificationCard/EcomNotificationCard';

const EcomNotification = () => {
  const {
    data,
    values,
    loadMore,
    groupedData,
    isPagination,
    handleNotification,
  } = useEcomNotification();
  return (
    <View style={styles.container}>
      <CustomStatusBar transparent backgroundColor={color.blackBackground} />
      <EcomHeader
        showCart={false}
        showLogo={false}
        showNotification={false}
        title="Notifications"
      />
      {/* <SectionList
        sections={data}
        style={styles.flatListContainer}
        renderSectionHeader={({section: {title}}) => (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.line} />
          </View>
        )}
        stickySectionHeadersEnabled
        renderItem={({index, item}) => (
          <EcomNotificationCard item={item} index={index} onPress={() => {}} />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          values.isLoading ? (
            <ActivityIndicator size="small" color={color.primary} />
          ) : null
        } // Show loading spinner at the bottom
      /> */}
      {values?.isRefreshing ? (
        <View style={styles.shimmerContainer}>
          <ActivityIndicator color={color.primary} size="small" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <SectionList
            sections={groupedData}
            style={styles.flatListContainer}
            keyExtractor={(item, index) => item._id + index}
            renderSectionHeader={({section: {title}}) => (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <View style={styles.line} />
              </View>
            )}
            stickySectionHeadersEnabled
            renderItem={({index, item}) => (
              <EcomNotificationCard
                item={item}
                index={index}
                onNotification={() => {
                  handleNotification(item, index);
                }}
              />
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              values?.notificationData?.length >= 10 ? (
                <ActivityIndicator
                  animating={isPagination}
                  color={color.primary}
                />
              ) : null
            }
            ListEmptyComponent={() => (
              <View style={styles.noData}>
                <Text allowFontScaling={false} style={styles.noDataText}>
                  No Notification Available
                </Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default EcomNotification;
