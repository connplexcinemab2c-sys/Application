import Slider from '@react-native-community/slider';
import moment from 'moment';
import React, {useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import RBSheet from 'react-native-raw-bottom-sheet';
import YouTubeIframe from 'react-native-youtube-iframe';
import {default as image, default as imageIndex} from '../../assets/imageIndex';
import svg from '../../assets/svgIndex';
import {
  Button,
  CustomStatusBar,
  Header,
  MovieCast,
  MovieDetailShimmer,
  MovieList,
  ReviewCard,
} from '../../components';
import constant from '../../services/config/constant';
import {color} from '../../theme';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import LoginModal from '../loginModal.ts/LoginModal';
import movieDetailsController from './movieDetails.controller';
import style from './movieDetails.style';

const MovieDetails: React.FC = () => {
  const {height, width} = Dimensions.get('window');
  const scrollRef = useRef<any>();
  const {
    moviesData,
    onMovie,
    loading,
    moviesDetails,
    openModal,
    closeModal,
    modalVisible,
    playing,
    onStateChange,
    videoId,
    movieCategory,
    onReadMore,
    description,
    readMore,
    onOtherMovies,
    onShare,
    likes,
    closeSheet,
    openSheet,
    refRBSheet,
    review,
    setReview,
    error,
    validation,
    movieRating,
    theatreRating,
    reviewSpinner,
    likeDislikeMovies,
    totalLikes,
    closeReviewSheet,
    openReviewSheet,
    reviewSheet,
    handleMovieRating,
    handleTheatreRating,
    animationHeight,
    expanded,
    videoSpinner,
    onReadyVideo,
    onTextLayout,
    textRef,
    otherMoviesSpinner,
    onSearch,
    onLocation,
    cityData,
    refreshing,
    onRefreshCall,
    clearState,
    visible,
    setVisible,
    scaleValue,
  } = movieDetailsController();

  const {onBack, formatLikes, formatDuration, displayDuration} =
    commonFunctions();

  const formatNumber = (value: number) => {
    if (!Number.isInteger(value)) {
      return value?.toFixed(1);
    }
    return value?.toString();
  };
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      scrollRef?.current?.scrollTo({y: 200, animated: true});
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {});

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  let name = moviesDetails?.name?.toUpperCase();
  let dimension = '2D';
  if (name?.includes('3D')) {
    dimension = '3D';
  }

  const compactNumberFormat = (number: number) => {
    if (number < 1000) {
      return number.toString();
    }
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixNum = Math.floor(Math.log10(number) / 3);
    let shortValue = number / Math.pow(1000, suffixNum);
    return (
      shortValue.toFixed(shortValue % 1 !== 0 ? 1 : 0) + suffixes[suffixNum]
    );
  };

  return (
    <View style={style.mainContainer}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <View style={style.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={onBack}>
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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefreshCall}
              tintColor={color.white}
            />
          }
          overScrollMode="never">
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
                      Released on{' '}
                      {moment(moviesDetails?.filmOpeningDate)?.format(
                        'DD MMM, YYYY',
                      )}
                    </Text>
                  )}
                  <View style={style.movieContainer}>
                    <View style={style.rowContainer}>
                      {movieCategory?.length > 0 && (
                        <>
                          {movieCategory?.map((item, index) => (
                            <View style={style.movieTypeButton} key={index}>
                              <Text
                                allowFontScaling={false}
                                style={style.movieTypeButtonText}>
                                {item}
                              </Text>
                            </View>
                          ))}
                        </>
                      )}
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={style.likeTouchable}
                      onPress={likeDislikeMovies}>
                      <Animated.View style={{transform: [{scale: scaleValue}]}}>
                        {likes ? <svg.Likes /> : <svg.Unlike />}
                      </Animated.View>
                    </TouchableOpacity>
                    <Text allowFontScaling={false} style={style.likeText}>
                      {Platform.OS == 'android'
                        ? Intl.NumberFormat('en-US', {
                            notation: 'compact',
                            maximumFractionDigits: 1,
                          }).format(totalLikes)
                        : compactNumberFormat(totalLikes)}
                    </Text>
                  </View>
                  <View style={style.ratingContainer}>
                    <Rating
                      tintColor={color.inputBackground}
                      showRating={false}
                      startingValue={1}
                      ratingCount={1}
                      readonly
                      imageSize={20}
                      style={style.rating}
                    />
                    <Text allowFontScaling={false} style={style.ratingText}>
                      {moviesDetails?.averageRating > 5
                        ? formatNumber(moviesDetails?.rating)
                        : formatNumber(moviesDetails?.averageRating) ?? 0}
                      /5
                    </Text>
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
                        (moviesDetails?.languages ?? '') &&
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
              {/* <Text allowFontScaling={false} style={style.about}>About the Movie</Text> */}
              <TouchableOpacity activeOpacity={1} onPress={onReadMore}>
                <Animated.View
                  style={[
                    {
                      height: animationHeight,
                    },
                  ]}>
                  <Text allowFontScaling={false} style={style.detailText}>
                    {description?.replace(/^\s*[\r\n]/gm, '')}
                    {moviesDetails?.description &&
                      moviesDetails?.description?.length > 90 && (
                        <Text allowFontScaling={false} style={style.readMore}>
                          {readMore && expanded ? ' Read less' : '...Read more'}
                        </Text>
                      )}
                  </Text>
                </Animated.View>
              </TouchableOpacity>
              {moviesDetails?.starCast?.length > 0 && (
                <>
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
                </>
              )}
              {moviesDetails?.crew?.length > 0 && (
                <>
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
                </>
              )}
              {!moviesDetails?.isAlreadyRated && (
                <View style={style.addYourRatingContainer}>
                  <View style={style.addYourRating}>
                    <Text allowFontScaling={false} style={style.addRating}>
                      Add Your Rating & Review
                    </Text>
                    <Text allowFontScaling={false} style={style.opinion}>
                      Your opinion matter
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={style.rateContainer}
                    onPress={openSheet}>
                    <Text allowFontScaling={false} style={style.rateNow}>
                      Rate Now
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {moviesDetails?.rateAndReviews?.length > 0 && (
                <>
                  <View style={style.viewMoreContainer}>
                    <Text allowFontScaling={false} style={style.reviewTitle}>
                      Reviews and Ratings
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={style.viewMore}
                      onPress={openReviewSheet}>
                      <Text allowFontScaling={false} style={style.viewMoreText}>
                        All reviews
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={moviesDetails?.rateAndReviews?.slice(0, 3)}
                    renderItem={({item, index}) => (
                      <ReviewCard
                        item={item}
                        index={index}
                        dataLength={
                          moviesDetails?.rateAndReviews?.slice(0, 3)?.length
                        }
                      />
                    )}
                    keyExtractor={({item, index}) => `${index}`}
                    ListEmptyComponent={() => (
                      <Text allowFontScaling={false} style={style.noRatings}>
                        No reviews available
                      </Text>
                    )}
                    style={style.reviewList}
                  />
                </>
              )}
              {moviesData?.length > 0 && (
                <View>
                  <Text allowFontScaling={false} style={style.about}>
                    You Might Also Like
                  </Text>
                  {otherMoviesSpinner ? (
                    <ActivityIndicator size="large" color={color.white} />
                  ) : (
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
                          <Text
                            allowFontScaling={false}
                            style={style.noTextData}>
                            No Show Available
                          </Text>
                        </View>
                      )}
                    />
                  )}
                </View>
              )}
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
          <YouTubeIframe
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
      <RBSheet
        ref={refRBSheet}
        bottomSheetColor={color.white}
        closeOnDragDown={false}
        closeOnPressMask={false}
        animationType="slide"
        onClose={clearState}
        keyboardAvoidingViewEnabled={true}
        customStyles={{
          wrapper: {
            backgroundColor: color.sheetBackground,
          },
          container: {
            height: height,
            backgroundColor: color.white,
          },
        }}>
        <CustomStatusBar
          backgroundColor={color.white}
          barStyle="dark-content"
        />
        <View style={style.headerView}>
          <Text allowFontScaling={false} style={style.headerText}>
            Add Your Review
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={style.sheetClose}
            onPress={closeSheet}>
            <svg.CloseIcon fill={color.black} />
          </TouchableOpacity>
        </View>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={style.sheetScroll}
          showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
            <Image
              source={
                moviesDetails?.poster
                  ? {uri: `${constant.imageURL}${moviesDetails?.poster}`}
                  : image.noImageAvailable
              }
              style={style.poster}
            />
            <Text allowFontScaling={false} style={style.movieTitle}>
              {moviesDetails?.name}
            </Text>
            <View style={style.ratingView}>
              <Text allowFontScaling={false} style={style.ratingQuestion}>
                How would you rate the movie?
              </Text>
              <View style={style.movieRatingContainer}>
                <Slider
                  style={style.slider}
                  step={0.5}
                  minimumValue={0}
                  maximumValue={5}
                  minimumTrackTintColor={color.imdbBackground}
                  maximumTrackTintColor={color.gray}
                  thumbImage={image.ratingStar}
                  tapToSeek
                  value={movieRating}
                  onValueChange={handleMovieRating}
                  // onSlidingComplete={handleMovieRating}
                />
                <Text allowFontScaling={false} style={style.movieRating}>
                  {movieRating}/5
                </Text>
              </View>
              <Text allowFontScaling={false} style={style.ratingQuestion}>
                How would you rate the Connplex?
              </Text>
              <View style={style.movieRatingContainer}>
                <Slider
                  style={style.slider}
                  step={0.5}
                  minimumValue={0}
                  maximumValue={5}
                  minimumTrackTintColor={color.imdbBackground}
                  maximumTrackTintColor={color.gray}
                  thumbImage={image.ratingStar}
                  tapToSeek
                  value={theatreRating}
                  onValueChange={handleTheatreRating}
                  // onSlidingComplete={handleTheatreRating}
                />
                <Text allowFontScaling={false} style={style.movieRating}>
                  {theatreRating}/5
                </Text>
              </View>
              <TextInput
                allowFontScaling={false}
                value={review}
                onChangeText={(value: string) => setReview(value?.trimStart())}
                style={style.input}
                placeholderTextColor={color.black}
                multiline
                placeholder="Your opinion matter"
                maxLength={250}
              />
              {error && (
                <Text allowFontScaling={false} style={style.error}>
                  {error}
                </Text>
              )}
              <Button
                title="Submit"
                mainContainer={style.submitButton}
                containerStyle={{height: 40}}
                titleStyle={style.buttonTitle}
                onPress={validation}
                isLoading={reviewSpinner}
                gradient={color.termsGradient}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </RBSheet>
      <RBSheet
        ref={reviewSheet}
        bottomSheetColor={color.white}
        closeOnDragDown={false}
        closeOnPressMask={false}
        animationType="slide"
        keyboardAvoidingViewEnabled={true}
        customStyles={{
          wrapper: {
            backgroundColor: color.sheetBackground,
          },
          container: {
            height: height,
            backgroundColor: color.white,
          },
        }}>
        <CustomStatusBar
          backgroundColor={color.white}
          barStyle="dark-content"
        />
        <View style={style.headerView}>
          <Text allowFontScaling={false} style={style.headerText}>
            Reviews
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={style.sheetClose}
            onPress={closeReviewSheet}>
            <svg.CloseIcon fill={color.black} />
          </TouchableOpacity>
        </View>
        <View style={style.flatlistContainer}>
          <FlatList
            data={moviesDetails?.rateAndReviews}
            renderItem={({item, index}) => (
              <ReviewCard item={item} index={index} isModal />
            )}
            keyExtractor={({item, index}) => `${index}`}
            contentContainerStyle={style.reviewSheetList}
            ListEmptyComponent={() => (
              <View style={style.noRatingsContainer}>
                <Text allowFontScaling={false} style={style.noRatingsSheet}>
                  No ratings available
                </Text>
              </View>
            )}
          />
        </View>
      </RBSheet>
      <LoginModal visible={visible} onClose={() => setVisible(false)} />
    </View>
  );
};

export default MovieDetails;
