import React, {memo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Linking,
} from 'react-native';
import {FacilitySheetProps} from './facilitySheet.interface';
import style from './facilitySheet.style';
import svgIndex from '../../assets/svgIndex';
import Log from '../../utility/log';
import MapView, {Marker} from 'react-native-maps';

const FacilitySheet: React.FC<FacilitySheetProps> = ({data}: any) => {
  const initialRegion = {
    latitude: Number(data?.lat),
    longitude: Number(data?.long),
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  const listing = data?.cinemaAmenities?.map((item: any, index: number) => ({
    id: index,
    name: item,
    icon:
      item === 'Wheelchair Facility'
        ? svgIndex.Wheelchair
        : item === 'Parking Facility'
        ? svgIndex.Parking
        : item === 'M Ticket'
        ? svgIndex.MTicket
        : item === 'F&B'
        ? svgIndex.FoodAndBeverages
        : item === 'Ticket Cancellation'
        ? svgIndex.TicketCancellation
        : null,
  }));

  const _renderData = (item: any, index: number) => {
    return (
      <View
        style={[style.facilityContainer, {marginLeft: index == 0 ? 0 : 20}]}>
        <svgIndex.MTicket />
        <Text allowFontScaling={false} style={style.facility}>
          {item.name}
        </Text>
      </View>
    );
  };

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${Number(
      data?.lat,
    )},${Number(data?.long)}`;
    Linking.openURL(url).catch(err => Log('Failed to open Google Maps', err));
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={style.scrollStyle}>
      <Text allowFontScaling={false} style={style.name}>
        {data?.displayName}
      </Text>
      <MapView
        style={{height: 150, width: '100%'}}
        zoomEnabled={false}
        scrollEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        initialRegion={initialRegion}>
        <Marker
          coordinate={{
            latitude: Number(data?.lat),
            longitude: Number(data?.long),
          }}
          title="Marker Title"
          description="Marker Description"
        />
      </MapView>
      <TouchableOpacity
        style={style.mapMain}
        activeOpacity={0.7}
        onPress={openGoogleMaps}>
        <svgIndex.TheatreLocation />
        <Text allowFontScaling={false} style={style.address}>
          {data?.address}
        </Text>
        <svgIndex.MapNav />
      </TouchableOpacity>
      <Text allowFontScaling={false} style={style.available}>
        Available Facilities
      </Text>
      <View style={style.infoView}>
        <FlatList
          data={listing}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => _renderData(item, index)}
        />
      </View>
    </ScrollView>
  );
};

export default memo(FacilitySheet);
