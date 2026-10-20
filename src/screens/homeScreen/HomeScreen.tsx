import React, {useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import imageIndex from '../../assets/imageIndex';
import svg from '../../assets/svgIndex';
import {
  BorderWithShadow,
  CustomStatusBar,
  HomeShimmer,
  MovieList,
  PosterShimmer,
} from '../../components';
import constant from '../../services/config/constant';
import {color} from '../../theme';
import homeScreenController from './homeScreen.controller';
import {AdDataProps} from './homeScreen.interface';
import style from './homeScreen.style';

const HomeScreen: React.FC = () => {
  const {width, height} = Dimensions.get('window');
  const currentIndexRef = useRef(0);
  const flatListRef = useRef<any>(null);
  const {
    onSearch,
    onMovie,
    onLocation,
    cinemaData,
    loading,
    cityData,
    onMoviesShow,
    modalVisible,
    closeModal,
    playing,
    videoID,
    onStateChange,
    onBookNow,
    getVideoId,
    videoSpinner,
    recentRelease,
    onReadyVideo,
    refreshJob,
    refreshing,
    adData,
    load,
    handleLoadStart,
    handleLoadEnd,
    isAdLoad,
  } = homeScreenController();

  useEffect(() => {
    if (adData?.length > 0) {
      const interval = setInterval(() => {
        currentIndexRef.current =
          (currentIndexRef.current + 1) % adData?.length;
        flatListRef.current?.scrollToIndex({
          index: currentIndexRef.current,
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [adData]);

  useEffect(() => {
    if (adData?.length > 0) {
      currentIndexRef.current = 0;
      flatListRef.current?.scrollToIndex({
        index: 0,
        animated: false,
      });
    }
  }, [cityData]);

  const renderItem = (item: AdDataProps, index: number) => (
    <View style={style.sliderContent}>
      {load[index] && (
        <ActivityIndicator
          size="large"
          color={color.white}
          style={style.loadStyle}
        />
      )}
      <Image
        source={
          item?.image
            ? {
                uri: `${constant.imageURL}${item?.image}`,
              }
            : imageIndex?.noImageAvailable
        }
        style={style.slideImage}
        onLoadStart={() => handleLoadStart(index)}
        onLoadEnd={() => handleLoadEnd(index)}
        onError={() => handleLoadEnd(index)}
      />
    </View>
  );

  return (
    <View style={style.mainContainer}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <View style={style.header}>
        <Image style={style.appLogo} source={imageIndex.appLogoText} />
        <View style={style.locationContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={style.locationPress}
            onPress={onLocation}>
            <svg.UserLocation />
            <Text allowFontScaling={false} style={style.userLocation}>
              {cityData?.region}
            </Text>
            <svg.DownArrow />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={style.search}
          onPress={onSearch}>
          <svg.Search />
        </TouchableOpacity>
        {/* <TouchableOpacity
          activeOpacity={0.7}
          style={style.filter}
          onPress={onFilter}>
          <svg.Filter />
        </TouchableOpacity> */}
      </View>
      <BorderWithShadow borderStyle={{borderBottomWidth: 1.5}} />
      <ScrollView
        contentContainerStyle={style.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        overScrollMode="never"
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => refreshJob()}
            tintColor={color.white}
          />
        }>
        <View>
          {isAdLoad ? (
            <PosterShimmer />
          ) : (
            <FlatList
              ref={flatListRef}
              data={adData}
              renderItem={({item, index}) => renderItem(item, index)}
              horizontal
              pagingEnabled
              bounces={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item._id.toString()}
              getItemLayout={(data, index) => ({
                length: width,
                offset: width * index,
                index,
              })}
            />
          )}
          <View style={style.viewContainer}>
            <View style={style.container}>
              <Text allowFontScaling={false} style={style.nowShowing}>
                Now Showing
              </Text>
              {cinemaData?.length > 0 && (
                <TouchableOpacity
                  onPress={onMoviesShow}
                  style={style.viewAllPress}
                  activeOpacity={0.7}>
                  <Text allowFontScaling={false} style={style.viewAll}>
                    View all
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {loading && !refreshing ? (
              <HomeShimmer />
            ) : (
              <FlatList
                data={cinemaData}
                renderItem={({item, index}) => (
                  <MovieList
                    item={item}
                    onPress={() => onMovie(item)}
                    index={index}
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={style.flatlistContainer}
                style={style.flatlist}
                ListEmptyComponent={() => (
                  <View style={style.noDataView}>
                    <Text allowFontScaling={false} style={style.noTextData}>
                      No Movies Found
                    </Text>
                  </View>
                )}
              />
            )}
            <View style={style.container}>
              <Text allowFontScaling={false} style={style.nowShowing}>
                Recent Release
              </Text>
              {recentRelease?.length > 0 && (
                <TouchableOpacity
                  onPress={onMoviesShow}
                  style={style.viewAllPress}
                  activeOpacity={0.7}>
                  <Text allowFontScaling={false} style={style.viewAll}>
                    View all
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {loading && !refreshing ? (
              <HomeShimmer />
            ) : (
              <FlatList
                data={recentRelease}
                renderItem={({item, index}) => (
                  <MovieList
                    item={item}
                    onPress={() => onMovie(item)}
                    index={index}
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={style.flatlistContainer}
                style={style.flatlist}
                ListEmptyComponent={() => (
                  <View style={style.noDataView}>
                    <Text allowFontScaling={false} style={style.noTextData}>
                      No Movies Found
                    </Text>
                  </View>
                )}
              />
            )}
            {/* <View style={style.container}>
            <Text allowFontScaling={false} style={style.nowShowing}>Featured for Your Movie</Text>
            <TouchableOpacity style={style.viewAllPress} activeOpacity={0.7}>
              <Text allowFontScaling={false} style={style.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={snacksList}
            renderItem={({item}) => <FeaturedCard item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          /> */}
          </View>
          <Modal visible={modalVisible} animationType="slide">
            <CustomStatusBar backgroundColor={color.inputBackground} />
            <View style={style.modelStyle}>
              <TouchableOpacity style={style.modelView} onPress={closeModal}>
                <svg.CloseIcon />
              </TouchableOpacity>
              {videoSpinner && (
                <ActivityIndicator
                  color={color.white}
                  size="large"
                  style={style.videoSpinner}
                />
              )}
              <YoutubeIframe
                height={300}
                width={width}
                play={playing}
                videoId={videoID}
                forceAndroidAutoplay={true}
                onChangeState={onStateChange}
                onReady={onReadyVideo}
              />
            </View>
          </Modal>
        </View>
      </ScrollView>
      {/* <View style={style.modalContainer}>
        <AdBanner />
      </View> */}

      {/* <SelectCityModal /> */}
    </View>
  );
};

export default HomeScreen;
