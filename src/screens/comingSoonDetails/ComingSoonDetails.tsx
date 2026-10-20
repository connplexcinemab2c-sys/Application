import moment from 'moment';
import React from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import {default as image, default as imageIndex} from '../../assets/imageIndex';
import svg from '../../assets/svgIndex';
import {
  Button,
  CustomStatusBar,
  Header,
  MovieCast,
  MovieDetailShimmer,
  MovieList,
} from '../../components';
import constant from '../../services/config/constant';
import {color} from '../../theme';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import LoginModal from '../loginModal.ts/LoginModal';
import comingSoonDetailsController from './comingSoonDetails.controller';
import style from './comingSoonDetails.style';

const ComingSoonDetails: React.FC = () => {
  const {width} = Dimensions.get('window');
  const {
    moviesData,
    moviesDetails,
    loading,
    modalVisible,
    playing,
    openModal,
    closeModal,
    onStateChange,
    videoId,
    movieCategory,
    onReadMore,
    description,
    readMore,
    onOtherMovies,
    onShare,
    likes,
    likeDislikeMovies,
    totalLikes,
    animationHeight,
    isInterested,
    videoSpinner,
    onReadyVideo,
    onTextLayout,
    textRef,
    onSearch,
    onLocation,
    cityData,
    onInterestCall,
    interested,
    refreshing,
    onRefreshCall,
    onMovie,
    onLogoClick,
    visible,
    setVisible,
  } = comingSoonDetailsController();
  const {onBack, formatDuration, displayDuration} = commonFunctions();

  let name = moviesDetails?.name?.toUpperCase();
  let dimension = '2D';
  if (name?.includes('3D')) {
    dimension = '3D';
  }

  return (
    <View style={style.mainContainer}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <View style={style.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={onLogoClick}>
          <Image style={style.appLogo} source={imageIndex.appLogoText} />
        </TouchableOpacity>
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
      </View>
      {!refreshing && loading ? (
        <MovieDetailShimmer />
      ) : (
        <ScrollView
          style={style.scrollView}
          contentContainerStyle={style.contentContainer}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefreshCall()}
              tintColor={color.white}
            />
          }>
          <ImageBackground
            resizeMode="stretch"
            source={
              loading
                ? undefined
                : moviesDetails?.poster
                ? {
                    uri: `${constant.imageURL}${moviesDetails?.poster}`,
                  }
                : image.noImageAvailable
            }
            style={style.backgroundImage}>
            <ImageBackground
              source={image.homeBackground}
              style={style.homeBackground}>
              <Header
                backIcon
                rightIcon={!loading ? svg.Share : undefined}
                onRightIcon={onShare}
                onBack={onBack}
                backContainerStyle={style.backContainer}
              />

              <>
                <View style={style.playIconContainer}>
                  {videoId && (
                    <TouchableOpacity onPress={openModal} activeOpacity={0.7}>
                      <svg.Play />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={style.container}>
                  <View style={style.titleContainer}>
                    <Text allowFontScaling={false} style={style.title}>
                      {name}
                    </Text>
                  </View>
                  {moviesDetails?.filmOpeningDate && (
                    <Text allowFontScaling={false} style={style.releaseDate}>
                      Releasing on{' '}
                      {moment(moviesDetails?.filmOpeningDate)?.format(
                        'DD MMM, YYYY',
                      )}
                    </Text>
                  )}
                  <View style={style.movieContainer}>
                    {movieCategory?.length > 0 &&
                      movieCategory?.map((item, index) => (
                        <View style={style.movieTypeButton} key={index}>
                          <Text
                            allowFontScaling={false}
                            style={style.movieTypeButtonText}>
                            {item}
                          </Text>
                        </View>
                      ))}
                  </View>
                  <View style={style.ratingContainer}>
                    <svg.Clock />
                    <Text allowFontScaling={false} style={style.time}>
                      {`${
                        moviesDetails?.duration
                          ? displayDuration(parseFloat(moviesDetails?.duration))
                          : '0 hr'
                      }${
                        moviesDetails?.censorRating &&
                        ' | ' + moviesDetails?.censorRating
                      }${
                        moviesDetails?.languages &&
                        ' | ' + moviesDetails?.languages?.toUpperCase()
                      } | ${moviesDetails?.movieType}`}
                    </Text>
                  </View>
                </View>
              </>
            </ImageBackground>
          </ImageBackground>
          {!loading && (
            <View style={style.aboutContainer}>
              <Text
                allowFontScaling={false}
                ref={textRef}
                onLayout={onTextLayout}
                style={style.textLayout}>
                {moviesDetails?.description} read more
              </Text>
              <TouchableOpacity activeOpacity={1} onPress={onReadMore}>
                <Animated.View
                  style={
                    {
                      // height: animationHeight,
                    }
                  }>
                  <Text allowFontScaling={false} style={style.detailText}>
                    {description}
                    {moviesDetails?.description &&
                      moviesDetails?.description?.length > 90 && (
                        <Text allowFontScaling={false} style={style.readMore}>
                          {readMore ? ' Read less' : '...Read more'}
                        </Text>
                      )}
                  </Text>
                </Animated.View>
              </TouchableOpacity>
              <Text allowFontScaling={false} style={style.about}>
                Cast
              </Text>
              <FlatList
                data={moviesDetails?.starCast}
                renderItem={({item}) => <MovieCast item={item} />}
                style={style.flatlist}
                contentContainerStyle={style.flatlistContent}
                horizontal
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={() => (
                  <View style={style.noDataView}>
                    <Text allowFontScaling={false} style={style.noTextData}>
                      No data available
                    </Text>
                  </View>
                )}
              />
              <Text allowFontScaling={false} style={style.about}>
                Crew
              </Text>
              <FlatList
                data={moviesDetails?.crew}
                renderItem={({item}) => <MovieCast item={item} />}
                style={style.flatlist}
                contentContainerStyle={style.flatlistContent}
                horizontal
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={() => (
                  <View style={style.noDataView}>
                    <Text allowFontScaling={false} style={style.noTextData}>
                      No data available
                    </Text>
                  </View>
                )}
              />
              {!isInterested && (
                <View style={style.addYourRatingContainer}>
                  <View style={style.addYourRating}>
                    <Text allowFontScaling={false} style={style.addRating}>
                      Releasing on{' '}
                      {moment(moviesDetails?.filmOpeningDate)?.format(
                        'DD MMM, YYYY',
                      )}
                    </Text>
                    <Text allowFontScaling={false} style={style.opinion}>
                      Are you interested in watching this movie?
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={style.rateContainer}
                    onPress={onInterestCall}>
                    <Text allowFontScaling={false} style={style.rateNow}>
                      {interested ? 'Interested' : "I'm Interested"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <Text allowFontScaling={false} style={style.about}>
                You Might Also Like
              </Text>
              <FlatList
                data={moviesData}
                renderItem={({item, index}) => (
                  <MovieList
                    item={item}
                    index={index}
                    onPress={() => onOtherMovies(item)}
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={style.flatlist}
                ListEmptyComponent={() => (
                  <View style={style.noDataView}>
                    <Text allowFontScaling={false} style={style.noTextData}>
                      No Show Available
                    </Text>
                  </View>
                )}
              />
            </View>
          )}
        </ScrollView>
      )}
      {!loading && (
        <View style={style.buttonContainer}>
          <Button title="BOOK NOW" onPress={onMovie} leftIcon={svg.BookNow} />
        </View>
      )}
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
            videoId={videoId}
            forceAndroidAutoplay={true}
            onChangeState={onStateChange}
            onReady={onReadyVideo}
          />
        </View>
      </Modal>
      <LoginModal visible={visible} onClose={() => setVisible(false)} />
    </View>
  );
};

export default ComingSoonDetails;
