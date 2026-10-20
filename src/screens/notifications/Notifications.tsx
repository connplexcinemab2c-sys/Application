import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {color} from '../../theme';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import {
  CustomStatusBar,
  Header,
  NotificationCard,
  NotificationShimmer,
} from '../../components';
import notificationsController from './notifications.controller';
import style from './notifications.style';

const Notifications: React.FC = () => {
  const {notifications, loading, refreshing, refreshJob} =
    notificationsController();
  const {onBack} = commonFunctions();
  return (
    <View style={style.container}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <Header
        backIcon
        onBack={onBack}
        title="Notifications"
        containerStyle={style.title}
      />
      {!refreshing && loading ? (
        <NotificationShimmer />
      ) : (
        <View style={style.indicator}>
          <FlatList
            data={notifications}
            renderItem={({item, index}) => (
              <NotificationCard item={item} index={index} />
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View style={style.noData}>
                <Text allowFontScaling={false} style={style.noDataText}>
                  No Notification Available
                </Text>
              </View>
            )}
            contentContainerStyle={style.titleContainer}
            keyExtractor={(item, index) => `${index}`}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refreshJob}
                tintColor={color.white}
              />
            }
          />
        </View>
      )}
    </View>
  );
};

export default Notifications;
