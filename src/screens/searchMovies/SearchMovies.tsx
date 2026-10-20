import React from 'react';
import {
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {color} from '../../theme';
import {
  CinemaCard,
  CustomStatusBar,
  Input,
  OnDemandMovies,
  SearchScreenShimmer,
} from '../../components';
import searchMoviesController from './searchMovies.controller';
import svg from '../../assets/svgIndex';
import style from './searchMovies.style';

const SearchMovies: React.FC = () => {
  const {
    search,
    moviesData,
    handleSearch,
    onSearch,
    loading,
    cinemaRegionData,
    onCinema,
    onBack,
    onClear,
    type,
    refreshing,
    refreshCall,
  } = searchMoviesController();

  return (
    <View style={style.mainContainer}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={style.keyboardAvoid}>
        <View style={style.searchContainer}>
          <TouchableOpacity
            style={style.back}
            activeOpacity={0.7}
            onPress={onBack}>
            <svg.Back />
          </TouchableOpacity>
          <View style={style.inputDivider}>
            <Input
              value={search}
              setValue={(text: any) => handleSearch(text?.trimStart())}
              placeholder={
                type == 'movie'
                  ? 'Search by Movies'
                  : 'Search by Cinemas & Movies'
              }
              leftIcon={svg.Search}
              inputContainer={style.inputContainer}
              inputStyle={style.input}
              inputProps={{placeholderTextColor: color.white}}
              rigthFilterIcon={search ? true : false}
              onPressRightFilterIcon={onClear}
            />
          </View>
        </View>
        {loading ? (
          <View style={{marginTop: 15}}>
            <SearchScreenShimmer />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{flexGrow: 1, paddingHorizontal: 18}}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refreshCall}
                tintColor={color.white}
              />
            }>
            {moviesData?.length == 0 && cinemaRegionData?.length == 0 ? (
              <View style={style.noDataView}>
                <Text allowFontScaling={false} style={style.noTextData}>
                  {type == 'movie'
                    ? 'No Movies Available'
                    : ' No Movies/Cinemas Available'}
                </Text>
              </View>
            ) : (
              <View style={style.keyboardAvoid}>
                {moviesData?.length > 0 && (
                  <>
                    <Text allowFontScaling={false} style={style.onDemand}>
                      Movies
                    </Text>
                    <View>
                      <FlatList
                        data={moviesData}
                        renderItem={({item}) => (
                          <OnDemandMovies
                            item={item}
                            onPress={() => onSearch(item?._id)}
                          />
                        )}
                        style={style.flatlist}
                        contentContainerStyle={style.containerStyle}
                        keyExtractor={(_, index) => `${index}`}
                        key={1}
                        ListEmptyComponent={() => (
                          <View style={style.noDataView}>
                            <Text
                              allowFontScaling={false}
                              style={style.noTextData}>
                              No Movies Available
                            </Text>
                          </View>
                        )}
                      />
                    </View>
                  </>
                )}
                {cinemaRegionData?.length > 0 && (
                  <>
                    <Text allowFontScaling={false} style={style.onDemand}>
                      Cinemas
                    </Text>
                    <View>
                      <FlatList
                        data={cinemaRegionData}
                        key={2}
                        renderItem={({item, index}) => (
                          <CinemaCard
                            item={item}
                            onPress={onCinema}
                            index={index}
                          />
                        )}
                        style={style.flatlist}
                        contentContainerStyle={style.containerStyle}
                        keyExtractor={(_, index) => `${index}`}
                        ListEmptyComponent={() => (
                          <View style={style.noDataView}>
                            <Text
                              allowFontScaling={false}
                              style={style.noTextData}>
                              No Cinemas Available
                            </Text>
                          </View>
                        )}
                      />
                    </View>
                  </>
                )}
              </View>
            )}
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default SearchMovies;
