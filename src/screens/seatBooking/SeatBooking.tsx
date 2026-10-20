import moment from 'moment';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import image from '../../assets/imageIndex';
import svg from '../../assets/svgIndex';
import {BookingWarning, Border, Button, Container} from '../../components';
import Layout from '../../components/layoutCard/Layout';
import {color} from '../../theme';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import LoginModal from '../loginModal.ts/LoginModal';
import {seatType} from './seatBooking.const';
import seatBookingController from './seatBooking.controller';
import style from './seatBooking.style';

const SeatBooking: React.FC = () => {
  const {
    selectTime,
    onSeatClick,
    loading,
    movieTimings,
    selectedTime,
    isTimeSelected,
    checkStatus,
    selectedSeat,
    movieName,
    showTime,
    modal,
    setModal,
    disable,
    showSpinner,
    layoutData,
    setArea,
    refRBSheet,
    closeSheet,
    refreshing,
    onRefreshCall,
    visible,
    setVisible,
    seatLayout,
    setSelectedSeatArea,
    strTotalPrice,
    strSelectedSeats,
  } = seatBookingController();
  const {onBack} = commonFunctions();

  return (
    <View style={style.container}>
      <Container
        containerStyle={style.mainContainer}
        scrollContentContainerStyle={style.scrollView}
        backIcon
        onBack={onBack}
        title={movieName ? movieName : 'Select Seats'}
        titleContainerStyle={style.titleContainer}
        isHeaderWithoutScroll
        // scrollViewProps={{
        //   refreshControl: (
        //     <RefreshControl refreshing={refreshing} onRefresh={onRefreshCall} tintColor={color.white} />
        //   ),
        // }}
      >
        <View style={style.containerStyle}>
          {!refreshing && showSpinner ? (
            <ActivityIndicator
              style={style.seatIndicatorStyle}
              color={color.white}
              size={'large'}
            />
          ) : (
            //
            <View style={{flex: 1}}>
              {layoutData?.length > 0 && (
                <View
                  style={{
                    // left: layoutData[0]?.strAreaDesc === 'COUPLE SEAT' ? 10 : 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image source={image.screen} style={style.screen} />
                  <Text allowFontScaling={false} style={style.seatHeader}>
                    SCREEN THIS WAY
                  </Text>
                </View>
              )}
              <ScrollView
                horizontal
                contentContainerStyle={style.scrollViewStyle}
                showsHorizontalScrollIndicator={false}>
                <FlatList
                  scrollEnabled={false}
                  data={seatLayout}
                  renderItem={({item, index}) => (
                    <Layout
                      item={item}
                      onSeat={(key, item, price, newIndex, keys) => {
                        setSelectedSeatArea(seatLayout[index]?.strAreaDesc);
                        onSeatClick(key, item, price, index, newIndex, keys);
                      }}
                      id={index}
                    />
                  )}
                  ListEmptyComponent={() => (
                    <View style={style.noDataView}>
                      <Text allowFontScaling={false} style={style.noTextData}>
                        No Seats Available
                      </Text>
                    </View>
                  )}
                  keyExtractor={(item, index) => {
                    return `${index}`;
                  }}
                  contentContainerStyle={style.listContainer}
                />
              </ScrollView>
            </View>
          )}
        </View>
      </Container>
      <View style={style.seatTypeContainer}>
        {seatType?.map(item => (
          <View style={style.typeContainer} key={item.id}>
            <item.icon />
            <Text allowFontScaling={false} style={style.seatType}>
              {item.name}
            </Text>
          </View>
        ))}
      </View>
      <View style={style.borderViewStyle} />
      <View style={style.dateTimeContainer}>
        <Text allowFontScaling={false} style={style.selectDate}>
          {showTime ? showTime : 'Select Time'}
        </Text>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={style.flatlistContent}>
          <FlatList
            data={movieTimings}
            scrollEnabled={false}
            contentContainerStyle={{
              alignSelf: 'flex-start',
            }}
            numColumns={
              movieTimings?.length > 4 ? Math.ceil(movieTimings?.length / 2) : 5
            }
            key={Math.ceil(movieTimings.length / 2)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.7}
                style={style.timeActivePress}
                onPress={() => {
                  selectTime(item?.sessionRealShow);
                  setArea(
                    (item?.sessionAdditionalData &&
                      item?.sessionAdditionalData?.match(
                        /SCREENATTRIBUTES=([^|]+)/,
                      )?.[1]) ||
                      '',
                  );
                }}
                key={index}>
                <LinearGradient
                  colors={
                    selectedTime === item.sessionRealShow
                      ? color.buttonGradient
                      : color.buttonTransparentGradient
                  }
                  start={{x: 0.4, y: 1}}
                  end={{x: 1, y: 1}}
                  style={[
                    style.timeView,
                    {
                      borderColor:
                        selectedTime === item.sessionRealShow
                          ? undefined
                          : color.timeBorder,
                      paddingHorizontal:
                        selectedTime === item.sessionRealShow ? 16 : 15,
                      paddingVertical:
                        selectedTime === item.sessionRealShow ? 6 : 5,
                    },
                  ]}>
                  <Text allowFontScaling={false} style={style.time}>
                    {moment(item.sessionRealShow).format('hh:mm A')}
                  </Text>
                </LinearGradient>
                {item?.sessionAdditionalData && (
                  <Text allowFontScaling={false} style={style.seatTypeText}>
                    {item?.sessionAdditionalData?.match(
                      /SCREENATTRIBUTES=([^|]+)/,
                    )?.[1] || ''}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </View>
      {strSelectedSeats?.length > 0 && (
        <View style={style.timeShowView}>
          <Border borderStyle={style.border} />
          <View style={style.priceContainer}>
            <View style={style.container}>
              <Text allowFontScaling={false} style={style.total}>
                {`Total Price  `}
                <Text allowFontScaling={false} style={style.noOfSeats}>
                  {strSelectedSeats?.length}{' '}
                  {strSelectedSeats?.length === 1 ? 'Seat' : 'Seats'}
                </Text>
              </Text>
              <Text allowFontScaling={false} style={style.price}>
                <Text allowFontScaling={false} style={style.rupees}>
                  Rs.
                </Text>{' '}
                {(strTotalPrice ?? 0)?.toFixed(2)}
              </Text>
            </View>
            <Button
              title="BOOK NOW"
              containerStyle={[style.button, {opacity: disable ? 0.3 : 1}]}
              leftIcon={svg.BuyTickets}
              onPress={() => refRBSheet?.current?.open()}
              disabled={disable}
            />
          </View>
        </View>
      )}
      <BookingWarning isVisible={modal} onClose={() => setModal(false)} />
      <RBSheet
        //@ts-ignore
        ref={refRBSheet}
        bottomSheetColor={color.white}
        closeOnDragDown={false}
        closeOnPressMask={false}
        height={300}
        animationType="slide"
        customStyles={{
          wrapper: {
            backgroundColor: color.sheetBackground,
          },
          container: style.sheetContainer,
        }}>
        <View style={style.sheetViewStyle}>
          <View style={style.termsContainer}>
            <Text allowFontScaling={false} style={style.title}>
              Terms & Conditions
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            style={style.termsScroll}>
            <Text allowFontScaling={false} style={style.textContent}>
              1. Tickets purchased for a connplex are valid for that particular
              connplex only. {'\n'}2. Patrons below the age of 18 years are not
              allowed for movies certified “A”. {'\n'}3. Patrons must carry
              proof of age for watching movies certified “A”. {'\n'}4. Purchase
              of ticket is required for children above the age of 3 years.{' '}
              {'\n'}5. Tickets once sold are non-transferable and
              non-refundable. {'\n'}6. Outside Food & Beverage is not allowed
              inside the cinema. {'\n'}7. Patrons under the influence of alcohol
              or drugs will be denied entry by the cinema staff.
            </Text>
            <Text allowFontScaling={false} style={style.textStyle}>
              Note:
            </Text>
            <Text allowFontScaling={false} style={style.text}>
              CONNPLEX, it's employees, or management does not take
              responsibility for loss or damage to articles or personal
              belongings that patrons may carry inside the cinema premises.
            </Text>
            <Text allowFontScaling={false} style={style.text}>
              The following items are strictly prohibited inside the cinema:
              Handbags, carry bags, helmets, eatables (including bidi-cigarette,
              gutka, tambaku/ tobacco, paan masala, chewing gum, chocolates,
              chips, etc.), liquor, drinks, camera, laptop, knife, lighter,
              matchbox, cigarette, firearms & all kind of inflammable objects.
            </Text>
            <Text allowFontScaling={false} style={style.text}>
              Please follow all COVID-related guidelines.
            </Text>
            <Text allowFontScaling={false} style={style.text}>
              Movie Schedules and rates are subject to change without prior
              notice.
            </Text>
          </ScrollView>
        </View>
        <View style={style.modelView}>
          <Button
            onPress={closeSheet}
            containerStyle={style.buttonText}
            title="Cancel"
            gradient={color.termsGradient}
            titleStyle={style.buttonTitle}
          />
          <Button
            isLoading={loading}
            title="Accept"
            containerStyle={style.buttonText}
            onPress={checkStatus}
            gradient={color.termsGradient}
            titleStyle={style.buttonTitle}
          />
        </View>
      </RBSheet>
      <LoginModal visible={visible} onClose={() => setVisible(false)} />
    </View>
  );
};

export default SeatBooking;
