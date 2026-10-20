import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Image,
} from 'react-native';
import {
  BorderWithShadow,
  CinemaList,
  CinemaListShimmer,
  CustomStatusBar,
  Input,
} from '../../components';
import cinemasController from './cinemas.controller';
import {color} from '../../theme';
import svg from '../../assets/svgIndex';
import style from './cinemas.style';
import imageIndex from '../../assets/imageIndex';

const Cinemas: React.FC = () => {
  const {
    search,
    handleSearch,
    cinemaRegionData,
    onSelectLocation,
    loading,
    searchVisible,
    setSearchVisible,
    cityData,
    onCinema,
    refreshing,
    refreshJob,
    onLogoClick,
    onClear,
  } = cinemasController();

  return (
    <View style={style.mainContainer}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      {!searchVisible ? (
        <View style={style.headerContainer}>
          <TouchableOpacity activeOpacity={0.7} onPress={onLogoClick}>
            <Image style={style.appLogo} source={imageIndex.appLogoText} />
          </TouchableOpacity>
          <View style={style.titleContainer}>
            {/* <Text allowFontScaling={false} style={style.title}>
              Cinemas
            </Text> */}
            <TouchableOpacity
              onPress={onSelectLocation}
              activeOpacity={0.7}
              style={style.cityContainer}>
              <Text allowFontScaling={false} style={style.city}>
                {cityData?.region ? cityData?.region : 'Select Location'}
              </Text>
              <svg.DownArrow />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => setSearchVisible(!searchVisible)}
            activeOpacity={0.7}
            style={style.search}>
            <svg.Search />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={style.searchContainer}>
          <TouchableOpacity
            style={style.back}
            activeOpacity={0.7}
            onPress={onLogoClick}>
            <svg.Back />
          </TouchableOpacity>
          <View style={style.inputDivider}>
            <Input
              value={search}
              setValue={(text: any) => handleSearch(text?.trimStart())}
              placeholder="Search..."
              leftIcon={svg.Search}
              inputContainer={style.inputContainer}
              inputMainContainer={style.inputMainContainer}
              inputStyle={style.input}
              inputProps={{placeholderTextColor: color.white}}
              rigthFilterIcon={search ? true : false}
              onPressRightFilterIcon={onClear}
            />
          </View>
        </View>
      )}
      {!searchVisible && <BorderWithShadow />}
      <View style={style.mainContainer}>
        {loading ? (
          <View style={{marginTop: 20}}>
            <CinemaListShimmer />
          </View>
        ) : (
          <FlatList
            data={cinemaRegionData}
            renderItem={({item}) => (
              <CinemaList item={item} onPress={onCinema} />
            )}
            style={style.flatlist}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={style.containerStyles}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => refreshJob()}
                tintColor={color.white}
              />
            }
            ListEmptyComponent={() => (
              <View style={style.noDataView}>
                <Text allowFontScaling={false} style={style.noTextData}>
                  No Cinemas Available
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Cinemas;
