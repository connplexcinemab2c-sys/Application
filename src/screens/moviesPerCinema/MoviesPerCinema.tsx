import React from 'react';
import {
  View,
  FlatList,
  Text,
  RefreshControl,
  TouchableOpacity,
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
  MoviesPerCinemaCard,
  MovieWarning,
  PriceFilterModal,
  TimeDetailShimmer,
  TimeFilterModal,
} from '../../components';
import {color} from '../../theme';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import moviesPerCinemaController from './moviesPerCinema.controller';
import svg from '../../assets/svgIndex';
import style from './moviesPerCinema.style';
import moment from 'moment';
import {showPriceItem, showTimeItem} from './moviesPerCinema.const';

const {height} = Dimensions.get('window');

const MoviesPerCinema: React.FC = () => {
  const {
    cinemaDetails,
    showDates,
    onSelectDate,
    selectedDate,
    onSelectTime,
    selectedTime,
    loading,
    movieId,
    movieDetails,
    getInfo,
    infoSheet,
    amenities,
    refreshing,
    refreshCall,
    onPriceFilter,
    onTimeFilter,
    handleCloseModal,
    isVisible,
    isTimeVisible,
    handlePriceClear,
    handleClosePriceModal,
    handleTimeClear,
    toggleTimeSelection,
    toggleSelection,
    isAvailable,
    setIsAvailable,
    handleAge,
    handleFilterChange,
    tempSelectedTimeItems,
    tempSelectedItems,
    filterArray,
  } = moviesPerCinemaController();
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
    <View style={style.mainContainer}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <Header
        backIcon
        onBack={onBack}
        title={cinemaDetails?.displayName}
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
        <View style={style.container}>
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
          <Border borderStyle={style.border} />
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
          {filterArray?.length > 0 && (
            <View>
              <FlatList
                data={filterArray}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          )}
          <MovieShowTime
            item={cinemaDetails}
            showTime={false}
            onPress={getInfo}
          />
          <Border borderStyle={style.border} />
          {!refreshing && loading ? (
            <TimeDetailShimmer screen="moviePerCinema" />
          ) : (
            <>
              <Text allowFontScaling={false} style={style.movieText}>
                Movies
              </Text>
              <FlatList
                data={movieDetails}
                renderItem={({item}) => (
                  <MoviesPerCinemaCard
                    item={item}
                    onSelectTime={onSelectTime}
                    selectedTime={selectedTime}
                    movieId={movieId}
                  />
                )}
                contentContainerStyle={style.indicator}
                ListEmptyComponent={() => (
                  <View style={style.noDataContainer}>
                    <svg.NoShowAvailable />
                    <Text allowFontScaling={false} style={style.noData}>
                      No Movies Found
                    </Text>
                  </View>
                )}
              />
            </>
          )}
        </View>
      </ScrollView>
      <RBSheet
        ref={infoSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
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

export default MoviesPerCinema;
