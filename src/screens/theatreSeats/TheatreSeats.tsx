import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Dimensions,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  Border,
  CustomStatusBar,
  DateCard,
  FacilitySheet,
  Header,
  MovieShowTime,
  MovieWarning,
  PriceFilterModal,
  TimeDetailShimmer,
  TimeFilterModal,
} from '../../components';
import {color} from '../../theme';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import svg from '../../assets/svgIndex';
import theatreSeatsController from './ theatreSeats.controller';
import style from './ theatreSeats.style';
import {showPriceItem, showTimeItem} from './ theatreSeats.const';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';

const {height} = Dimensions.get('window');

const TheatreSeats: React.FC = () => {
  const route = useRoute<any>();
  const {
    onSelectDate,
    onSelectTime,
    selectedDate,
    selectedTime,
    showDates,
    loading,
    showTimes,
    theatreId,
    getUserInfo,
    infoSheet,
    amenities,
    onPriceFilter,
    onTimeFilter,
    toggleSelection,
    refreshing,
    refreshCall,
    isVisible,
    isTimeVisible,
    handlePriceClear,
    handleTimeClear,
    toggleTimeSelection,
    isAvailable,
    setIsAvailable,
    handleAge,
    handleFilterChange,
    tempSelectedTimeItems,
    handleCloseModal,
    tempSelectedItems,
    handleClosePriceModal,
    filterArray,
  } = theatreSeatsController();
  const {onBack} = commonFunctions();

  const renderItem = ({item}: {item: any}) => {
    const startTime12Hour = moment(item?.startTime, 'HH:mm').format('hh:mm');
    const endTime12Hour = moment(item?.endTime, 'HH:mm').format('hh:mm');
    return (
      <View style={style.filterDataContent}>
        {item.dayTime ? (
          <Text style={style.filteredText}>
            {`${startTime12Hour} ${item?.period} - ${endTime12Hour} ${item?.period}`}
          </Text>
        ) : (
          <Text style={style.filteredText}>
            Rs. {item?.startPrice + ' - ' + item?.endPrice}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={style.mainView}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <Header
        backIcon
        onBack={onBack}
        title="Select Theatre"
        titleContainerStyle={style.titleContainer}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshCall}
            tintColor={color.white}
          />
        }>
        <View style={style.dateTimeContainer}>
          <FlatList
            data={showDates}
            renderItem={({item}) => (
              <DateCard
                item={item}
                selectedDate={selectedDate}
                onSelectDate={onSelectDate}
              />
            )}
            horizontal
            style={style.flatlist}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => {
              return `${index}`;
            }}
          />
          <Border borderStyle={style.borderView} />
          {route?.params?.flag != 'comingSoon' && (
            <View style={style.filterContainer}>
              <TouchableOpacity
                style={style.filterContent}
                activeOpacity={0.6}
                onPress={onPriceFilter}>
                <Text
                  allowFontScaling={false}
                  style={style.filterLabel}
                  numberOfLines={1}>
                  Price Range
                </Text>
                <svg.DownArrow />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  style.filterContent,
                  {
                    marginLeft: 8,
                  },
                ]}
                activeOpacity={0.6}
                onPress={onTimeFilter}>
                <Text
                  allowFontScaling={false}
                  style={style.filterLabel}
                  numberOfLines={1}>
                  Show Time
                </Text>
                <svg.DownArrow />
              </TouchableOpacity>
            </View>
          )}
          {route?.params?.flag != 'comingSoon' && filterArray?.length > 0 && (
            <View>
              <FlatList
                data={filterArray}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()} // Ensure id is a string for the keyExtractor
              />
            </View>
          )}
          {!refreshing && loading ? (
            <TimeDetailShimmer screen="theatreSeats" />
          ) : (
            <>
              <FlatList
                data={route?.params?.flag == 'comingSoon' ? [] : showTimes}
                renderItem={({item, index}) => (
                  <MovieShowTime
                    item={item}
                    index={index}
                    onSelectTime={onSelectTime}
                    selectedTime={selectedTime}
                    theatreId={theatreId}
                    onPress={getUserInfo}
                    containerStyle={style.movieShowContainer}
                  />
                )}
                ListEmptyComponent={() => (
                  <View style={style.noShowContainer}>
                    <svg.NoShowAvailable />
                    <Text allowFontScaling={false} style={style.nowShow}>
                      No Theatre Available
                    </Text>
                  </View>
                )}
                keyExtractor={(item, index) => {
                  return `${index}`;
                }}
                contentContainerStyle={style.timeFlatlist}
              />
            </>
          )}
        </View>
      </ScrollView>
      <RBSheet
        //@ts-ignore
        ref={infoSheet}
        bottomSheetColor={color.white}
        closeOnDragDown={false}
        closeOnPressMask={true}
        height={height / 1.78}
        animationType="slide"
        customStyles={{
          wrapper: {
            backgroundColor: color.sheetBackground,
          },
          container: style.infoContainer,
        }}>
        <FacilitySheet data={amenities} />
      </RBSheet>
      <PriceFilterModal
        isVisible={isVisible}
        showPriceItem={showPriceItem}
        tempSelectedItems={tempSelectedItems}
        toggleSelection={toggleSelection}
        handleClose={handleClosePriceModal}
        handleFilterChange={handleFilterChange}
        handlePriceClear={handlePriceClear}
      />
      <TimeFilterModal
        isVisible={isTimeVisible}
        showTimeItem={showTimeItem}
        tempSelectedItems={tempSelectedTimeItems}
        toggleTimeSelection={toggleTimeSelection}
        handleClose={handleCloseModal}
        handleFilterChange={handleFilterChange}
        handleTimeClear={handleTimeClear}
      />
      <MovieWarning
        isVisible={isAvailable}
        onClick={() => handleAge()}
        onClose={() => setIsAvailable(false)}
      />
    </View>
  );
};

export default TheatreSeats;
