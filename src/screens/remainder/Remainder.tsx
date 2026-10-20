import React from 'react';
import {View, Text, Switch, ActivityIndicator} from 'react-native';
import {Border, CustomStatusBar, Header} from '../../components';
import {color} from '../../theme';
import commonFunctions from '../../utility/functions/commonFunctions/commonFunctions';
import reminderController from './remainder.controller';
import style from './remainder.style';

const Remainder: React.FC = () => {
  const {
    nowPlaying,
    upcomingMovies,
    upcomingBookings,
    onNowPlaying,
    onUpcomingMovies,
    onUpcomingBookings,
    loading,
  } = reminderController();
  const {onBack} = commonFunctions();

  return (
    <View style={style.container}>
      <CustomStatusBar backgroundColor={color.inputBackground} />
      <Header
        title="Reminders"
        onBack={onBack}
        backIcon
        containerStyle={style.title}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color={color.white}
          style={style.titleContainer}
        />
      ) : (
        <View style={style.contentContainer}>
          <View style={style.itemView}>
            <Text allowFontScaling={false} style={style.itemText}>
              Now Playing Movies
            </Text>
            <Switch
              trackColor={{false: color.switchColor, true: color.locationText}}
              thumbColor={nowPlaying ? color.white : color.switchThumbColor}
              ios_backgroundColor={color.switchColor}
              onValueChange={(value: any) => onNowPlaying(value)}
              value={nowPlaying}
            />
          </View>
          <View style={style.divider}>
            <Border />
          </View>
          <View style={style.itemView}>
            <Text allowFontScaling={false} style={style.itemText}>
              Upcoming Movies
            </Text>
            <Switch
              trackColor={{false: color.switchColor, true: color.locationText}}
              thumbColor={upcomingMovies ? color.white : color.switchThumbColor}
              ios_backgroundColor={color.switchColor}
              onValueChange={(value: any) => onUpcomingMovies(value)}
              value={upcomingMovies}
            />
          </View>
          <View style={style.divider}>
            <Border />
          </View>
          <View style={style.itemView}>
            <Text allowFontScaling={false} style={style.itemText}>
              Upcoming Bookings
            </Text>
            <Switch
              trackColor={{false: color.switchColor, true: color.locationText}}
              thumbColor={
                upcomingBookings ? color.white : color.switchThumbColor
              }
              ios_backgroundColor={color.switchColor}
              onValueChange={(value: any) => onUpcomingBookings(value)}
              value={upcomingBookings}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Remainder;
