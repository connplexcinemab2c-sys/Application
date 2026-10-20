import {
  View,
  Text,
  Modal,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React from 'react';
import {CustomStatusBar, PopularCities} from '../../components';
import {color} from '../../theme';
import selectCityModalController from './selectCityModal.controller';
import style from './selectCityModal.style';
import {BlurView} from '@react-native-community/blur';

const SelectCityModal = () => {
  const {
    visible,
    regionData,
    loading,
    locationPermission,
    locationSpinner,
    navigateToCinemaScreen,
    refreshing,
    refreshCall,
  } = selectCityModalController();
  return (
    <Modal visible={visible} transparent>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <View style={style.modalView}>
        <TouchableOpacity
          disabled={true}
          style={style.blur}
          activeOpacity={1}
          onPress={locationPermission}>
          <BlurView
            style={style.blur}
            blurType="light"
            blurAmount={2}
            reducedTransparencyFallbackColor={color.lightShade}
          />
        </TouchableOpacity>
        {locationSpinner ? (
          <View style={style.locationView}>
            <ActivityIndicator color={color.black} size={'large'} />
            <Text allowFontScaling={false} style={style.currentText}>
              Fetching Current Location
            </Text>
          </View>
        ) : (
          <>
            {!refreshing && loading ? (
              <View style={style.loaderView}>
                <ActivityIndicator color={color.white} size={'large'} />
              </View>
            ) : (
              <View style={style.parentView}>
                <FlatList
                  data={regionData}
                  numColumns={3}
                  contentContainerStyle={style.containerStyles}
                  ListHeaderComponent={() => (
                    <Text allowFontScaling={false} style={style.label}>
                      Select City
                    </Text>
                  )}
                  ListEmptyComponent={() => (
                    <View style={style.noDataView}>
                      <Text allowFontScaling={false} style={style.noTextData}>
                        No City Available
                      </Text>
                    </View>
                  )}
                  renderItem={({item, index}) => (
                    <PopularCities
                      onPress={navigateToCinemaScreen}
                      item={item}
                      index={index}
                    />
                  )}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={refreshCall}
                      tintColor={color.white}
                    />
                  }
                />
              </View>
            )}
          </>
        )}
      </View>
    </Modal>
  );
};

export default SelectCityModal;
