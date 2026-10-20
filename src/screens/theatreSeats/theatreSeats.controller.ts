import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import {useCallback, useEffect, useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Snackbar from 'react-native-snackbar';
import {
  AuthNavigationProps,
  AuthParams,
} from '../../navigation/stacks/authStack';
import axiosInstance from '../../services/api';
import constant from '../../services/config/constant';
import params from '../../services/config/params';
import {useAppSelector} from '../../services/config/redux/useReduxHooks';
import Log from '../../utility/log';
import {showTimeItem} from './theatreSeats.const';
import {ShowTimesProps} from './theatreSeats.interface';

const theatreSeatsController = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const {cityData} = useAppSelector(state => state.UserReducer);
  const route: any = useRoute<RouteProp<AuthParams, 'theatreSeats'>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(moment().format());
  const [showTimes, setShowTimes] = useState<ShowTimesProps[]>([]);
  const [filterShowTimes, setFilterShowTimes] = useState<ShowTimesProps[]>([]);
  const [showDates, setShowDates] = useState([]);
  const [theatreId, setTheatreId] = useState<string>();
  const [amenities, setAmenities] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [tempSelectedItems, setTempSelectedItems] = useState<any[]>([]);
  const [selectedTimeItems, setSelectedTimeItems] = useState<any>([]);
  const [tempSelectedTimeItems, setTempSelectedTimeItems] = useState<any[]>([]);
  const [area, setArea] = useState<string>();
  const infoSheet = useRef<RBSheet | undefined>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTimeVisible, setIsTimeVisible] = useState<boolean>(false);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [movieDetailItem, setMovieDetailItem] = useState<any>({});
  const [index, setIndex] = useState<any>(0);
  const [showId, setShowId] = useState<string>('');
  const [filterArray, setFilterArray] = useState<any>([]);

  useEffect(() => {
    const startDate = moment();
    const dates: any = [];
    const filmReleaseDate = moment(route?.params?.filmOpeningDate);

    const currentDate = moment();
    let timeisGt = filmReleaseDate.isValid() && filmReleaseDate.isAfter(currentDate);
    const extendedDays = Number(route?.params?.showExtendedDays) || 7;
    for (let i = 0; i < extendedDays; i++) {
      if (timeisGt) {
        dates.push(filmReleaseDate.clone().add(i, 'days'));
      } else {
        dates.push(startDate.clone().add(i, 'days'));
      }
    }
    setShowDates(dates);
    if (timeisGt) {
      onSelectDate(moment(filmReleaseDate).format('YYYY-MM-DD'));
    } else {
      onSelectDate(moment(selectedDate).format('YYYY-MM-DD'));
    }
  }, []);

  useEffect(() => {
    onMoviesShows(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    if (
      selectedDate &&
      (selectedTimeItems?.length > 0 || selectedItems?.length > 0) &&
      filterShowTimes?.length > 0
    ) {
      handleFilterChange();
    }
  }, [selectedDate, filterShowTimes]);

  useEffect(() => {
    if (selectedItems?.length > 0 || selectedTimeItems?.length > 0) {
      const mergedArray = [...selectedItems, ...selectedTimeItems];
      setFilterArray(mergedArray);
    } else {
      setFilterArray([]);
    }
  }, [selectedItems, selectedTimeItems]);

  const refreshCall = () => {
    setRefreshing(true);
    onMoviesShows(selectedDate);
  };

  const onMoviesShows = async (date: string) => {
    setSelectedTime('');
    setLoading(true);
    try {
      const formData = {
        [params.id]: `${cityData?._id}|${date}|${route?.params?.movieId}`,
      };
      const {data} = await axiosInstance.post(
        constant.movieDetilsWithShows,
        formData,
      );
      setLoading(false);
      setRefreshing(false);
      const filteredData = data?.data?.filter((item: any) => {
        const shows = item?.timings;
        if (shows && shows.length > 0) {
          for (const show of shows) {
            const showTime = show?.startTime;
            if (moment(new Date()).isBefore(moment(showTime))) {
              return true;
            }
          }
        }
        return false;
      });
      setShowTimes(filteredData);
      setFilterShowTimes(filteredData);
      Log('movie show timining', JSON.stringify(data?.data));
    } catch (error: any) {
      setLoading(false);
      setRefreshing(false);
      Log('movie show timining error', error?.response);
    }
  };

  const onSelectDate = (date: string): void => {
    const selected = moment(date).format('YYYY-MM-DD');
    onMoviesShows(selected);
    setSelectedDate(selected);
  };

  const onSelectTime = (item: any, cinemaId: string, index: number): void => {
    setMovieDetailItem(item);
    setTheatreId(cinemaId);
    setIndex(index);
    setSelectedTime(item?.startTime);
    setShowId(item?.showId);
    setArea(item?.aData && item?.aData?.match(/SCREENATTRIBUTES=([^|]+)/)?.[1]);
    if (
      route?.params?.censorRating == 'A' ||
      route?.params?.censorRating == 'A++'
    ) {
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
      if (item?.startTime == '') {
        Snackbar.show({text: 'please select show time'});
      } else {
        // setSelectedTimeItems([]);
        // setSelectedItems([]);
        setIsTimeVisible(false);
        setIsVisible(false);
        // setShowTimes(filterShowTimes);
        const formData = {
          cinemaDetails: {
            cinemaId: showTimes[index]?.cinemaDetails?.cinemaId,
            cinemaNumberId: showTimes[index]?.cinemaDetails?._id,
          },
          selectTime: item?.startTime,
          movieDetail: route?.params?.movieId,
          movieName: route?.params?.movieName,
          selectedDate: selectedDate,
          flag: 'theatreSeats',
          showId: item?.showId,
          area:
            item?.aData && item?.aData?.match(/SCREENATTRIBUTES=([^|]+)/)?.[1],
          language: route?.params?.languages,
          filmCode: route?.params?.filmCode,
        };
        navigation.navigate('seatBooking', formData);
      }
    }
  };

  const handleAge = () => {
    setIsAvailable(false);
    if (movieDetailItem?.startTime == '') {
      Snackbar.show({text: 'please select show time'});
    } else {
      // setSelectedTimeItems([]);
      // setSelectedItems([]);
      setIsTimeVisible(false);
      setIsVisible(false);
      // setShowTimes(filterShowTimes);
      const formData = {
        cinemaDetails: {
          cinemaId: showTimes[index]?.cinemaDetails?.cinemaId,
          cinemaNumberId: showTimes[index]?.cinemaDetails?._id,
        },
        selectTime: movieDetailItem?.startTime,
        movieDetail: route?.params?.movieId,
        movieName: route?.params?.movieName,
        selectedDate: selectedDate,
        flag: 'theatreSeats',
        showId: showId,
        area:
          movieDetailItem?.aData &&
          movieDetailItem?.aData?.match(/SCREENATTRIBUTES=([^|]+)/)?.[1],
        language: route?.params?.languages,
        filmCode: route?.params?.filmCode,
      };
      navigation.navigate('seatBooking', formData);
    }
  };

  const getUserInfo = (item: any): void => {
    infoSheet?.current?.open();
    setAmenities(item);
  };

  // PriceFilter
  const onPriceFilter = () => {
    setIsVisible(true);
  };

  const toggleSelection = (item: any) => {
    if (tempSelectedItems.includes(item)) {
      let temp = tempSelectedItems.filter((val: any) => val?.id !== item?.id);
      setTempSelectedItems(temp);
    } else {
      setTempSelectedItems([...tempSelectedItems, item]);
    }
  };

  const handlePriceClear = () => {
    setSelectedItems([]);
    setShowTimes(filterShowTimes);
    setIsVisible(false);
  };

  const handleClosePriceModal = () => {
    setTempSelectedItems(selectedItems); // Reset to previously applied selections
    setIsVisible(false);
  };

  // TimeFilter
  const onTimeFilter = () => {
    setIsTimeVisible(true);
  };

  const toggleTimeSelection = (item: any) => {
    if (tempSelectedTimeItems.includes(item)) {
      let temp = tempSelectedTimeItems.filter(
        (val: any) => val?.id !== item?.id,
      );
      setTempSelectedTimeItems(temp);
    } else {
      setTempSelectedTimeItems([...tempSelectedTimeItems, item]);
    }
  };

  const handleTimeClear = () => {
    setSelectedTimeItems([]);
    setShowTimes(filterShowTimes);
    setIsTimeVisible(false);
  };

  const handleCloseModal = () => {
    setTempSelectedTimeItems(selectedTimeItems); // Reset to previously applied selections
    setIsTimeVisible(false);
  };

  const timeToMinutes = (timeString: any) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const handleFilterChange = useCallback(() => {
    setSelectedTimeItems(tempSelectedTimeItems);
    setSelectedItems(tempSelectedItems);
    if (tempSelectedTimeItems?.length > 0 || tempSelectedItems?.length > 0) {
      // Step 1: Filter by Time
      let getTimeRange =
        tempSelectedTimeItems.length > 0
          ? showTimeItem.filter(item => tempSelectedTimeItems.includes(item))
          : [];
      const filteredData = filterShowTimes
        .map((cinema: any) => {
          let timings = cinema.timings
            .map((timing: any) => {
              let matchedTimeObj: any = [];
              // Step 2: Time Filtering (if applicable)
              if (getTimeRange.length > 0) {
                const showTime = moment(timing.startTime).format('HH:mm');
                const showTimeMinutes = timeToMinutes(showTime);
                for (let i = 0; i < getTimeRange.length; i++) {
                  const startTimeMinutes = timeToMinutes(
                    getTimeRange[i].startTime,
                  );
                  const endTimeMinutes = timeToMinutes(getTimeRange[i].endTime);
                  if (
                    (startTimeMinutes > endTimeMinutes &&
                      (showTimeMinutes >= startTimeMinutes ||
                        showTimeMinutes <= endTimeMinutes)) ||
                    (showTimeMinutes >= startTimeMinutes &&
                      showTimeMinutes <= endTimeMinutes)
                  ) {
                    matchedTimeObj.push(timing.showId);
                  }
                }
              } else {
                matchedTimeObj.push(timing.showId); // Allow if no time filter is selected
              }
              // Step 3: Price Filtering (if applicable)
              let areas;
              if (tempSelectedItems.length > 0) {
                if (tempSelectedItems.some(item => item.id === 1)) {
                  areas = timing.areas.filter(
                    (area: any) => area.price >= 0 && area.price <= 100,
                  );
                }
                if (tempSelectedItems.some(item => item.id === 2)) {
                  const areas2 = timing.areas.filter(
                    (area: any) => area.price > 100 && area.price <= 250,
                  );
                  areas = areas ? [...areas, ...areas2] : areas2;
                }
                if (tempSelectedItems.some(item => item.id === 3)) {
                  const areas3 = timing.areas.filter(
                    (area: any) => area.price > 250 && area.price <= 500,
                  );
                  areas = areas ? [...areas, ...areas3] : areas3;
                }
                if (tempSelectedItems.some(item => item.id === 4)) {
                  const areas4 = timing.areas.filter(
                    (area: any) => area.price > 500,
                  );
                  areas = areas ? [...areas, ...areas4] : areas4;
                }
              }
              // Step 4: Return filtered timings if both time and price filters match
              if (
                matchedTimeObj.includes(timing.showId) &&
                (areas?.length > 0 || tempSelectedItems.length === 0)
              ) {
                return {...timing, areas};
              }
              return null;
            })
            .filter(Boolean);
          return timings.length > 0 ? {...cinema, timings} : null;
        })
        .filter(Boolean);
      setShowTimes(filteredData);
      setIsTimeVisible(false);
      setIsVisible(false);
    } else {
      if (
        tempSelectedTimeItems?.length == 0 &&
        tempSelectedItems?.length == 0
      ) {
        setShowTimes(filterShowTimes);
      }
      setIsTimeVisible(false);
      setIsVisible(false);
      // Snackbar.show({text: 'Please select any range'});
    }
  }, [filterShowTimes, tempSelectedTimeItems, tempSelectedItems, selectedDate]);

  return {
    onSelectDate,
    onSelectTime,
    selectedDate,
    selectedTime,
    setSelectedTime,
    showDates,
    setShowDates,
    onMoviesShows,
    loading,
    showTimes,
    theatreId,
    getUserInfo,
    infoSheet,
    amenities,
    onPriceFilter,
    onTimeFilter,
    toggleSelection,
    refreshing,
    refreshCall,
    isVisible,
    isTimeVisible,
    handlePriceClear,
    handleTimeClear,
    toggleTimeSelection,
    isAvailable,
    setIsAvailable,
    handleAge,
    handleFilterChange,
    tempSelectedTimeItems,
    handleCloseModal,
    tempSelectedItems,
    handleClosePriceModal,
    filterArray,
  };
};

export default theatreSeatsController;
