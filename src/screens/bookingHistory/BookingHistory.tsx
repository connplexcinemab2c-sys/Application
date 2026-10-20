import React from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import bookingHistoryController from './bookingHistory.controller';
import {
  BookingHistoryList,
  BookingListShimmer,
  CustomStatusBar,
  Header,
} from '../../components';
import {color} from '../../theme';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import style from './bookingHistory.style';

const BookingHistory: React.FC = () => {
  const {bookingHistory, loading, onBookingHistory, refreshing, refreshJob} =
    bookingHistoryController();
  const {onBack} = commonFunctions();

  return (
    <View style={style.mainContainer}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <Header
        backIcon
        onBack={onBack}
        title="Booking History"
        titleContainerStyle={style.title}
      />
      {!refreshing && loading ? (
        <BookingListShimmer />
      ) : (
        <View style={style.mainContainer}>
          <FlatList
            data={bookingHistory}
            renderItem={({item}) => (
              <BookingHistoryList
                item={item}
                onPress={() => {
                  onBookingHistory(item?.initTransId);
                }}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={style.flatlistContainer}
            ListEmptyComponent={() => (
              <View style={style.noDataContainer}>
                <Text allowFontScaling={false} style={style.noData}>
                  No Booking Available
                </Text>
              </View>
            )}
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

export default BookingHistory;
