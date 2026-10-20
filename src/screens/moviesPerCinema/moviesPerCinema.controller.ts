import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import {useCallback, useEffect, useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Snackbar from 'react-native-snackbar';
import {
  AuthNavigationProps,
  AuthParams,
} from '../../navigation/stacks/authStack';
import {axiosInstance} from '../../services/api/api';
import constant from '../../services/config/constant';
import {showTimeItem} from './moviesPerCinema.const';
import {MoviesPerCinemaControllerProps} from './moviesPerCinema.interface';

const moviesPerCinemaController = (): MoviesPerCinemaControllerProps => {
  const [selectedDate, setSelectedDate] = useState<string>(moment().format());
  const [showDates, setShowDates] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [movieDetails, setMovieDetails] = useState<any>();
  const [movieId, setMovieId] = useState<string>();
  const [amenities, setAmenities] = useState<any[]>([]);
  const [area, setArea] = useState<string>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const infoSheet = useRef<RBSheet>(null);
  const route = useRoute<RouteProp<AuthParams, 'moviesPerCinema'>>();
  const cinemaDetails = route?.params?.data;
  const navigation = useNavigation<AuthNavigationProps>();
  const [filterShowTimes, setFilterShowTimes] = useState<any>([]);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [tempSelectedItems, setTempSelectedItems] = useState<any[]>([]);
  const [selectedTimeItems, setSelectedTimeItems] = useState<any>([]);
  const [tempSelectedTimeItems, setTempSelectedTimeItems] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTimeVisible, setIsTimeVisible] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [movieDetailItem, setMovieDetailItem] = useState<any>({});
  const [detail, setDetail] = useState<any>({});
  const [showId, setShowId] = useState<string>('');
  const [filterArray, setFilterArray] = useState<any>([]);

  useEffect(() => {
    const startDate = moment();
    const dates: any = [];
    //@ts-ignore
    for (let i = 0; i < route?.params?.data?.showExtendedDays; i++) {
      dates.push(startDate.clone().add(i, 'days'));
    }
    setShowDates(dates);
    onSelectDate(moment(selectedDate).format('YYYY-MM-DD'));
  }, []);

  useEffect(() => {
    getMoviesPerCinema();
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
    getMoviesPerCinema();
  };

  const getMoviesPerCinema = async () => {
    /* API call for getting movies per cinema */
    setSelectedTime('');
    setLoading(true);
    try {
      const formData = {
        cinemaId: cinemaDetails?._id,
        regionId: cinemaDetails?.regionId,
        date: selectedDate,
      };
      const {data} = await axiosInstance.post(
        constant.getMoviesByCinema,
        formData,
      );
      setLoading(false);
      setRefreshing(false);
      setData(data?.data);
      const filteredData = data?.data?.movieDetailsWithShows?.filter(
        (item: any) => {
          const shows = item?.shows;
          if (shows && shows?.length > 0) {
            for (const show of shows) {
              const showTime = show?.sessionRealShow;
              if (moment(new Date()).isBefore(moment(showTime))) {
                return true;
              }
            }
          }
          return false;
        },
      );
      setMovieDetails(filteredData);
      setFilterShowTimes(filteredData);
    } catch (error: any) {
      setLoading(false);
      setRefreshing(false);
      Snackbar.show({text: error?.response?.data?.message ?? error?.message});
    }
  };

  const onSelectDate = (date: string): void => {
    const selected = moment(date).format('YYYY-MM-DD');
    // onMoviesShows(selected);
    setSelectedDate(selected);
  };

  const onSelectTime = (item: any, movieDetailData: any): void => {
    setMovieDetailItem(item);
    setShowId(item?.timing?.showId);
    setDetail(movieDetailData);
    if (
      movieDetailData?.censorRating == 'A' ||
      movieDetailData?.censorRating == 'A++'
    ) {
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
      const additionalData =
        item?.sessionAdditionalData?.match(/SCREENATTRIBUTES=([^|]+)/)?.[1] ||
        '';
      setSelectedTime(item?.sessionRealShow);
      // refRBSheet?.current?.open();
      setMovieId(movieDetailData?._id);
      setArea(additionalData);
      const formData = {
        cinemaDetails: {
          cinemaId: data?.cinemaDetails?.cinemaId,
          cinemaNumberId: data?.cinemaDetails?._id,
        },
        selectTime: item?.sessionRealShow,
        movieDetail: movieDetailData?._id,
        movieName: movieDetailData?.name,
        selectedDate: selectedDate,
        flag: 'moviePerCinema',
        showId: item?.timing?.showId,
        area: additionalData,
        language: movieDetailData?.languages,
      };
      // setSelectedTimeItems([]);
      // setSelectedItems([]);
      setIsTimeVisible(false);
      setIsVisible(false);
      // setMovieDetails(filterShowTimes);
      navigation.navigate('seatBooking', formData);
    }
  };

  const handleAge = () => {
    setIsAvailable(false);
    const additionalData =
      movieDetailItem?.sessionAdditionalData?.match(
        /SCREENATTRIBUTES=([^|]+)/,
      )?.[1] || '';
    setSelectedTime(movieDetailItem?.sessionRealShow);
    // refRBSheet?.current?.open();
    setMovieId(detail?._id);
    setArea(additionalData);
    const formData = {
      cinemaDetails: {
        cinemaId: data?.cinemaDetails?.cinemaId,
        cinemaNumberId: data?.cinemaDetails?._id,
      },
      selectTime: movieDetailItem?.sessionRealShow,
      movieDetail: detail?._id,
      movieName: detail?.name,
      selectedDate: selectedDate,
      flag: 'moviePerCinema',
      showId: showId,
      area: additionalData,
      language: detail?.languages,
    };
    // setSelectedTimeItems([]);
    // setSelectedItems([]);
    setIsTimeVisible(false);
    setIsVisible(false);
    // setMovieDetails(filterShowTimes);
    navigation.navigate('seatBooking', formData);
  };

  const getInfo = (item: any) => {
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
    setMovieDetails(filterShowTimes);
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
    setMovieDetails(filterShowTimes);
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
          let timings = cinema?.shows
            .map((showVal: any) => {
              let matchedTimeObj: any = [];
              // Step 2: Time Filtering (if applicable)
              if (getTimeRange?.length > 0 && showVal?.timing) {
                const showTime = moment(showVal.timing.startTime).format(
                  'HH:mm',
                );
                const showTimeMinutes = timeToMinutes(showTime);
                for (let i = 0; i < getTimeRange?.length; i++) {
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
                    matchedTimeObj.push(showVal.timing?.showId);
                  }
                }
              } else {
                showVal?.timing && matchedTimeObj.push(showVal.timing.showId); // Allow if no time filter is selected
              }
              // Step 3: Price Filtering (if applicable)
              let areas;
              if (tempSelectedItems?.length > 0 && showVal?.timing) {
                if (tempSelectedItems.some(item => item.id === 1)) {
                  areas = showVal.timing.areas.filter(
                    (area: any) => area.price >= 0 && area.price <= 100,
                  );
                }
                if (tempSelectedItems.some(item => item.id === 2)) {
                  const areas2 = showVal.timing.areas.filter(
                    (area: any) => area.price > 100 && area.price <= 250,
                  );
                  areas = areas ? [...areas, ...areas2] : areas2;
                }
                if (tempSelectedItems.some(item => item.id === 3)) {
                  const areas3 = showVal.timing.areas.filter(
                    (area: any) => area.price > 250 && area.price <= 500,
                  );
                  areas = areas ? [...areas, ...areas3] : areas3;
                }
                if (tempSelectedItems.some(item => item.id === 4)) {
                  const areas4 = showVal.timing.areas.filter(
                    (area: any) => area.price > 500,
                  );
                  areas = areas ? [...areas, ...areas4] : areas4;
                }
              }
              // Step 4: Return filtered timings if both time and price filters match
              if (
                matchedTimeObj.includes(showVal?.timing?.showId) &&
                (areas?.length > 0 || tempSelectedItems.length === 0)
              ) {
                return {...showVal, areas};
              }
              return null;
            })
            .filter(Boolean);
          return timings.length > 0 ? {...cinema, shows: timings} : null;
        })
        .filter(Boolean);
      setMovieDetails(filteredData);
      setIsTimeVisible(false);
      setIsVisible(false);
    } else {
      if (
        tempSelectedTimeItems?.length == 0 &&
        tempSelectedItems?.length == 0
      ) {
        setMovieDetails(filterShowTimes);
      }
      setIsTimeVisible(false);
      setIsVisible(false);
      // Snackbar.show({text: 'Please select any range'});
    }
  }, [filterShowTimes, tempSelectedTimeItems, tempSelectedItems, selectedDate]);

  return {
    cinemaDetails,
    showDates,
    onSelectDate,
    selectedDate,
    onSelectTime,
    selectedTime,
    loading,
    movieId,
    movieDetails,
    getInfo,
    infoSheet,
    amenities,
    refreshing,
    refreshCall,
    handleCloseModal,
    isVisible,
    isTimeVisible,
    handlePriceClear,
    handleClosePriceModal,
    handleTimeClear,
    toggleTimeSelection,
    toggleSelection,
    onPriceFilter,
    onTimeFilter,
    isAvailable,
    setIsAvailable,
    handleAge,
    handleFilterChange,
    tempSelectedTimeItems,
    tempSelectedItems,
    filterArray,
  };
};

export default moviesPerCinemaController;
