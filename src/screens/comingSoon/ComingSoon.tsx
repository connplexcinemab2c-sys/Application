import React from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  BorderWithShadow,
  ComingSoonCard,
  ComingSoonShimmer,
  CustomStatusBar,
  Header,
  Input,
} from '../../components';
import {color} from '../../theme';
import comingSoonController from './comingSoon.controller';
import svg from '../../assets/svgIndex';
import style from './comingSoon.style';
import imageIndex from '../../assets/imageIndex';

const ComingSoon: React.FC = () => {
  const {
    search,
    loading,
    upcomingMovies,
    handleSearch,
    handleSearchOpen,
    showSearch,
    onMovieDetails,
    refreshing,
    refreshJob,
    onBack,
    onClear,
  } = comingSoonController();
  return (
    <View style={style.mainContainer}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      {!showSearch ? (
        <>
          <View style={style.headerParent}>
            <TouchableOpacity activeOpacity={0.7} onPress={onBack}>
              <Image style={style.appLogo} source={imageIndex.appLogoText} />
            </TouchableOpacity>
            <View style={style.rightIconContent}>
              <TouchableOpacity
                style={style.rightIcon}
                activeOpacity={0.6}
                onPress={handleSearchOpen}>
                <svg.Search />
              </TouchableOpacity>
            </View>
          </View>
          <BorderWithShadow />
        </>
      ) : (
        <View style={style.searchContainer}>
          <TouchableOpacity
            style={style.back}
            activeOpacity={0.7}
            onPress={onBack}>
            <svg.Back />
          </TouchableOpacity>
          <View style={style.inputDivider}>
            <Input
              leftIcon={svg.Search}
              value={search}
              setValue={(text: any) => handleSearch(text?.trimStart())}
              placeholder="Search here"
              inputContainer={style.searchInput}
              inputStyle={style.inputText}
              inputMainContainer={style.inputMainContainer}
              inputProps={{placeholderTextColor: color.white}}
              rigthFilterIcon={search ? true : false}
              onPressRightFilterIcon={onClear}
            />
          </View>
        </View>
      )}
      <View style={style.main}>
        {loading ? (
          <View style={{marginTop: 10}}>
            <ComingSoonShimmer />
          </View>
        ) : (
          <FlatList
            data={upcomingMovies}
            contentContainerStyle={style.flatListView}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <ComingSoonCard
                item={item}
                onPress={onMovieDetails}
                index={index}
              />
            )}
            numColumns={2}
            ListEmptyComponent={() => (
              <View style={style.noDataContainer}>
                <Text allowFontScaling={false} style={style.noData}>
                  No Movies Available
                </Text>
              </View>
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => refreshJob()}
                tintColor={color.white}
              />
            }
          />
        )}
      </View>
    </View>
  );
};

export default ComingSoon;
