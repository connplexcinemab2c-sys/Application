import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {Border, CustomStatusBar, Input, OtherCities} from '../../components';
import {color} from '../../theme';
import selectCityController from './selectCity.controller';
import svg from '../../assets/svgIndex';
import style from './selectCity.style';

const SelectCity: React.FC = () => {
  const {
    search,
    handleSearch,
    regionData,
    loading,
    navigateToCinemaScreen,
    locationPermission,
    locationSpinner,
    refreshing,
    refreshJob,
    onBack,
    onClear,
  } = selectCityController();
  return (
    <View style={style.backHomeContainer}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <View style={style.searchContainer}>
        <TouchableOpacity
          style={style.backIcon}
          activeOpacity={0.7}
          onPress={onBack}>
          <svg.Back />
        </TouchableOpacity>
        <View style={style.inputDivider}>
          <Input
            value={search}
            setValue={(text: any) => handleSearch(text?.trimStart())}
            placeholder="Search for your city"
            leftIcon={svg.Search}
            inputContainer={style.inputContainer}
            inputStyle={style.input}
            inputProps={{placeholderTextColor: color.white}}
            rigthFilterIcon={search ? true : false}
            onPressRightFilterIcon={onClear}
          />
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={style.keyboardAvoid}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshJob}
              tintColor={color.white}
            />
          }>
          <View style={style.container}>
            {/* <TouchableOpacity
              activeOpacity={0.7}
              style={style.locationContainer}
              onPress={locationPermission}>
              {locationSpinner ? (
                <ActivityIndicator
                  color={color.white}
                  size="small"
                  style={style.indicator}
                />
              ) : (
                <View style={style.currentLocation}>
                  <svg.Location />
                  <Text allowFontScaling={false} style={style.locationText}>
                    Current Location
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <Border borderStyle={style.border} /> */}
            {/* <Text allowFontScaling={false} style={style.popularText}>Popular Cities</Text>
            {loading ? (
              <ActivityIndicator
                style={style.activityIndicatorStyle}
                size={'small'}
                color={color.white}
              />
            ) : (
              <FlatList
                data={regionData}
                contentContainerStyle={style.containerStyles}
                ListEmptyComponent={() => (
                  <View style={style.noDataView}>
                    <Text allowFontScaling={false} style={style.noTextData}>No City Found</Text>
                  </View>
                )}
                renderItem={({item, index}) => (
                  <PopularCities
                    onPress={navigateToCinemaScreen}
                    item={item}
                    index={index}
                  />
                )}
                horizontal
                style={style.flatlist}
                showsHorizontalScrollIndicator={false}
              />
            )}
            <Border borderStyle={style.border} /> */}
            <Text allowFontScaling={false} style={style.popularText}>
              Select City
            </Text>
            <View style={{flex: 1}}>
              {loading ? (
                <ActivityIndicator
                  size={'small'}
                  color={color.white}
                  style={style.noDataView}
                />
              ) : (
                <View style={{flex: 1}}>
                  <FlatList
                    data={regionData}
                    contentContainerStyle={style.containerStyles}
                    ListEmptyComponent={() => (
                      <View style={style.noDataView}>
                        <Text allowFontScaling={false} style={style.noTextData}>
                          No City Available
                        </Text>
                      </View>
                    )}
                    renderItem={({item, index}) => (
                      <OtherCities
                        item={item}
                        index={index}
                        onPress={navigateToCinemaScreen}
                      />
                    )}
                  />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        {/* {!loading && !regionData?.length && (
          <Button
            title="Back to home"
            onPress={onBackHome}
            containerStyle={style.backHome}
          />
        )} */}
      </KeyboardAvoidingView>
    </View>
  );
};

export default SelectCity;
