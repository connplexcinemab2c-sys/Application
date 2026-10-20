import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import {useEffect, useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Snackbar from 'react-native-snackbar';
import axiosInstance from '../../services/api';
import constant from '../../services/config/constant';
import params from '../../services/config/params';
import {useAppSelector} from '../../services/config/redux/useReduxHooks';
import Log from '../../utility/log';
import {SeatBookingControllerProps} from './seatBooking.interface';

const seatBookingController = (): SeatBookingControllerProps => {
  const isFocused = useIsFocused();
  const refRBSheet = useRef<RBSheet | undefined>();
  const navigation = useNavigation<any>();
  const {token} = useAppSelector(state => state.UserReducer);
  const route: any = useRoute<any>();
  const flag = route?.params?.flag;
  const cinemaId = route?.params?.cinemaDetails?.cinemaId;
  const movieName = route?.params?.movieName;
  const showTime = moment(route?.params?.selectTime)?.format('dddd, D MMMM');
  const cinemaNumberId = route?.params?.cinemaDetails?.cinemaNumberId;
  const selectedDate = route?.params?.selectedDate;
  const showId = route?.params?.showId;
  const movieID = route?.params.movieDetail;
  const [modal, setModal] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>(
    route?.params?.selectTime,
  );
  const [visible, setVisible] = useState<boolean>(false);
  const [pGroupCode, setPGroupCode] = useState<string>('');
  const [movieSessionId, setMovieSessionId] = useState<string>('');
  const [showObjId, setShowObjId] = useState<string>('');
  const [seatData, setSeatData] = useState<Array<any>>([]);
  const [selectedSeat, setSelectedSeat] = useState<Array<any>>([]);
  const [seatBookingData, setSeatBookingData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [priceData, setPriceData] = useState<Array<any>>([]);
  const [seatLayout, setSeatLayout] = useState<Array<any>>([]);
  const [seatNumber, setSeatNumber] = useState<any[]>([]);
  const [selectedSeatsCount, setSelectedSeatsCount] = useState(0);
  const [movieTimings, setMovieTimings] = useState<any>([]);
  const [totalPrice, setTotalprice] = useState<number>(0);
  const [tempPrice, setTempPrice] = useState<Array<any>>([]);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [initBookingData, setInitBookingData] = useState<string>('');
  const [lastSeatData, setLastSeatData] = useState();
  const [addSeats, setAddSeats] = useState();
  const [tTypeCode, setTTypeCode] = useState<number>();
  const [disable, setDisable] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [timingDetails, setTimingDetails] = useState<any>([]);
  const [area, setArea] = useState<number>(route?.params?.area);
  const [selectedSeatArea, setSelectedSeatArea] = useState('');
  const [bookingSessionId, setBookingSessionId] = useState<String>('');
  const layoutData = seatLayout;

  useEffect(() => {
    const list =
      timingDetails?.find((item: any) => {
        if (
          (showId &&
            (item?.showId === showId ||
              item?._id === showId ||
              item?.sessionId === showId)) ||
          (item?.sessionRealShow &&
            selectedTime &&
            moment(item.sessionRealShow).isSame(moment(selectedTime))) ||
          item?.sessionRealShow === selectedTime
        ) {
          return true;
        }
        return false;
      }) || timingDetails?.[0];

    if (list) {
      setPGroupCode(list?.pGroupCode);
      setMovieSessionId(list?.sessionId);
      setShowObjId(list?._id);
    }
  }, [selectedTime, timingDetails]);

  useEffect(() => {
    setSelectedTime(route?.params?.selectTime);
    getShowTiming();
  }, []);

  useEffect(() => {
    if (isFocused) {
      // setTimeout(() => {
      //   setShowSpinner(false);
      // }, 2000);
      setBookingSessionId('');
      setShowSpinner(true);
      // setTempPrice([]);
      setSelectedSeatsCount(0);
      // setTotalprice(0);
      setSelectedSeat([]);
      setSeatNumber([]);
      setIsTimeSelected(false);
      setDisable(false);
      if (selectedTime && movieSessionId) {
        getSeatLayout();
      }
    }
  }, [isFocused, movieSessionId]);

  useEffect(() => {
    if (selectedTime && pGroupCode) {
      getPriceDetails();
    }
  }, [pGroupCode]);

  useEffect(() => {
    if (selectedTime && movieSessionId) {
      getSeatLayout();
    }
  }, [movieSessionId]);

  useEffect(() => {
    if (seatData?.length > 0 && priceData?.length > 0) {
      handleSeatLayout(seatData, priceData);
    }
  }, [priceData, seatData, selectedTime]);

  const strSelectedSeats = seatLayout?.flatMap(
    area =>
      area?.rowData?.flatMap((row: any) =>
        row?.seatData
          ?.filter((seat: any) => seat?.strSeatStatus === '2')
          .map((seat: any) => ({
            ...seat,
            strAreaPrice: area?.area_price,
            strAreaDesc: area?.strAreaDesc,
            areaCode: area?.strAreaCode,
            areaNumber: area?.strAreaNum,
            SeatRowId: row?.intGridRowID,
            coupleRowId: `${row?.strRowPhyID}${seat?.strSeatNumber}`,
            dblSeatXPos: area?.dblSeatXPos,
          })),
      ) || [],
  );

  const strTotalPrice = strSelectedSeats.reduce(
    (total, seat) => total + Number(seat.strAreaPrice),
    0,
  );

  useEffect(() => {
    if (priceData?.length) {
      const code = priceData?.filter(
        (item: any) => item?.areaCatCode === strSelectedSeats[0]?.areaCode,
      );
      setTTypeCode(code[0]?.tTypeCode);
    }
  }, [selectedSeat]);

  const onRefreshCall = () => {
    setRefreshing(true);
    getShowTiming();
  };

  const getShowTiming = async () => {
    /* API call for getting show timing */
    try {
      setShowSpinner(true);
      const formData = {
        id: `${cinemaNumberId}|${selectedDate}|${movieID}`,
      };
      const {data} = await axiosInstance.post(constant.getShowTime, formData);
      setRefreshing(false);
      setTimingDetails(data?.data);
      const list =
        data?.data?.find((item: any) => {
          if (
            (showId &&
              (item?.showId === showId ||
                item?._id === showId ||
                item?.sessionId === showId)) ||
            (item?.sessionRealShow &&
              selectedTime &&
              moment(item.sessionRealShow).isSame(moment(selectedTime))) ||
            item?.sessionRealShow === selectedTime
          ) {
            return true;
          }
          return false;
        }) || data?.data?.[0];

      if (list) {
        setPGroupCode(list?.pGroupCode);
        setMovieSessionId(list?.sessionId);
        setShowObjId(list?._id);
      }
      const timingData = data?.data?.filter((item: any) =>
        moment(new Date())?.isBefore(moment(item?.sessionRealShow)),
      );
      setMovieTimings(timingData);
    } catch (error: any) {
      setShowSpinner(false);
      setRefreshing(false);
      // Snackbar.show({text: error?.response?.data?.message ?? error?.message});
    }
  };

  const getPriceDetails = async () => {
    /* API call for getting price details */
    try {
      const priceDetailsUrl = `${constant.priceDetails}/${pGroupCode}/${cinemaId}?showTime=${selectedTime}`;
      const {data} = await axiosInstance.get(priceDetailsUrl);
      setPriceData(data?.data);
    } catch (error: any) {
      setShowSpinner(false);
      setRefreshing(false);
      // Snackbar.show({text: error?.response?.data?.message ?? error?.message});
    }
  };

  const getSeatLayout = async () => {
    /* API call for getting seat layout */
    try {
      const seatLayoutUrl = `${constant.getSeatLayout}/${cinemaId}/${movieSessionId}`;
      const {data} = await axiosInstance.get(seatLayoutUrl);
      function charCode(rowID: any) {
        return rowID.charCodeAt(0);
      }
      function isPrevRowValid(currRowID: any, prevRowID: any) {
        const currCode = charCode(currRowID);
        const prevCode = charCode(prevRowID);
        return (
          prevCode === currCode ||
          prevCode === currCode - 1 ||
          prevCode === currCode + 1
        );
      }
      function checkAndSortArray(arr: any) {
        if (!Array.isArray(arr) || arr.length === 0) return [];
        let shouldSort = false;
        for (let i = 1; i < arr.length; i++) {
          const prevRowID = arr[i - 1]?.rowData?.strRowPhyID;
          const currRowID = arr[i]?.rowData?.strRowPhyID;
          if (prevRowID && currRowID && !isPrevRowValid(currRowID, prevRowID)) {
            shouldSort = true;
            break;
          }
        }
        if (shouldSort) {
          const firstRowID = arr[0]?.rowData?.strRowPhyID;
          arr.sort((a: any, b: any) => {
            const aID = a?.rowData?.strRowPhyID || '';
            const bID = b?.rowData?.strRowPhyID || '';
            if (firstRowID !== 'A') {
              return aID.localeCompare(bID);
            } else {
              return bID.localeCompare(aID);
            }
          });
        }
        return arr;
      }
      const rawSeatData = Array.isArray(data?.data?.data)
        ? data?.data?.data
        : Array.isArray(data?.data)
        ? data?.data
        : [];
      const sortedArray = checkAndSortArray(rawSeatData);
      setSeatData(sortedArray);
    } catch (error: any) {
      setShowSpinner(false);
      setRefreshing(false);
      Log('get seat errrror', error);
      // Snackbar.show({
      //   text: error?.response?.data?.message ?? 'Something went wrong',
      // });
    }
  };

  const handleSeatLayout = (
    newSeatLayout: Array<any>,
    areaData: Array<any>,
  ) => {
    let modifiedData: any = [];
    newSeatLayout.map((seatData, index) => {
      let area = areaData?.find(item => {
        return item?.areaCatCode === seatData?.colData?.strAreaCode;
      });
      if (!modifiedData[seatData?.colData?.strAreaCode])
        modifiedData[seatData?.colData?.strAreaCode] = {
          ...seatData?.colData,
          area_price: area?.currentPrice,
          priceTax1: area?.priceTax1,
          priceTax2: area?.priceTax2,
          priceTax3: area?.priceTax3,
          priceTax4: area?.priceTax4,
          priceSequence: area?.priceSequence,
          priceAdditionalPrice: area?.pPack3DCharge || 0.0,
          rowData: [],
        };
      if (index == 0) modifiedData[seatData.colData.strAreaCode].rowData = [];
      modifiedData[seatData?.colData?.strAreaCode].rowData[
        seatData?.rowData?.strRowPhyID
      ] = seatData?.rowData;
    });
    newSeatLayout?.map((seatData, index) => {
      if (
        !modifiedData[seatData?.colData?.strAreaCode]?.rowData[
          seatData?.rowData?.strRowPhyID
        ]?.seatData
      )
        modifiedData[seatData?.colData?.strAreaCode].rowData[
          seatData?.rowData?.strRowPhyID
        ].seatData = [];

      modifiedData[seatData?.colData?.strAreaCode].rowData[
        seatData?.rowData?.strRowPhyID
      ].seatData[index] = seatData?.seatData;
    });
    let actualData = [];
    for (var key in modifiedData) {
      let actualRowData = [];
      // check if the property/key is defined in the object itself, not in parent
      if (modifiedData.hasOwnProperty(key)) {
      }
      for (var key2 in modifiedData[key].rowData) {
        let actualSeatData = [];
        for (var key3 in modifiedData[key].rowData[key2].seatData) {
          actualSeatData.unshift(
            modifiedData[key].rowData[key2].seatData[key3],
          );
        }
        modifiedData[key].rowData[key2].seatData = actualSeatData;
        actualRowData.unshift(modifiedData[key].rowData[key2]);
      }
      modifiedData[key].rowData = actualRowData;
      actualData.unshift(modifiedData[key]);
    }
    //remove duplicate
    let newData = actualData.map(data => {
      data.rowData = data.rowData.map((rowData: any) => {
        let newRowData: any = [];
        rowData?.seatData?.forEach((seatData: any) => {
          let toPush = newRowData?.find(
            (data: any) => data?.Key && data?.Key === seatData?.Key,
          );
          if (!toPush) {
            newRowData.push(seatData);
          }
        });
        rowData.seatData = newRowData;
        return rowData;
      });
      return data;
    });
    setSeatLayout(actualData);
    setRefreshing(false);
    setShowSpinner(false);
  };

  const onSeatClick = (
    key: any,
    item: any,
    price: number,
    index: number,
    newIndex: number,
    keys: number,
  ): void => {
    let seatStatus =
      seatLayout[index]?.rowData[keys]?.seatData[newIndex]?.strSeatStatus;
    let dataOfSeat = {
      areaCode: seatLayout[index]?.strAreaCode,
      areaNumber: seatLayout[index]?.strAreaNum,
      SeatRowId: seatLayout[index]?.rowData[keys]?.intGridRowID,
      seatNumber:
        seatLayout[index]?.rowData[keys]?.seatData[newIndex]?.intGridSeatNum,
    };
    const coupleRowId = `${seatLayout[index]?.rowData[keys]?.strRowPhyID}${seatLayout[index]?.rowData[keys]?.intGridRowID}`;
    const coupleSeatNumber =
      seatLayout[index]?.rowData[keys]?.seatData[newIndex]?.strSeatNumber;
    const addedSeats = seatLayout[index]?.rowData[keys]?.seatData
      ?.filter((item: any) => item?.strSeatNumber === coupleSeatNumber)
      ?.map((item: any) => ({...item, coupleRowId: coupleRowId}))
      ?.map((item: any) => ({
        areaCode: seatLayout[index]?.strAreaCode,
        areaNumber: seatLayout[index]?.strAreaNum,
        SeatRowId: seatLayout[index]?.rowData[keys]?.intGridRowID,
        seatNumber: item?.intGridSeatNum,
        coupleRowId: coupleRowId,
        dblSeatXPos: item?.dblSeatXPos,
        strSeatNumber:
          seatLayout[index]?.rowData[keys]?.seatData[newIndex]?.strSeatNumber,
      }));
    if (
      seatLayout[index]?.strAreaDesc?.split(' ')[0]?.toLowerCase() == 'couple'
    ) {
      if (seatStatus === '0') {
        if (strSelectedSeats?.length < 10) {
          const updatedSeat = [...selectedSeat, ...addedSeats];
          setSelectedSeat(updatedSeat);
          seatLayout[index].rowData[keys].seatData[
            addedSeats[0]?.dblSeatXPos - 1
          ].strSeatStatus = '2';
          // seatLayout[index].rowData[keys].seatData[
          //   addedSeats[1]?.dblSeatXPos - 1
          // ].strSeatStatus = '2';
          if (seatLayout[index].rowData[keys]?.seatData) {
            const seatIndex = addedSeats[1]?.dblSeatXPos - 1;
            if (seatLayout[index].rowData[keys].seatData[seatIndex]) {
              seatLayout[index].rowData[keys].seatData[
                seatIndex
              ].strSeatStatus = '2';
            }
          }
          setSeatLayout([...seatLayout]);
          setSelectedSeatsCount(updatedSeat?.length);
          // const updatedSeatNumber = addedSeats?.map(
          //   (item: any) =>
          //     `${item?.coupleRowId?.slice(0, 1)}${item?.seatNumber}`,
          // );
          const updatedSeatNumber = addedSeats?.map(
            (item: any) =>
              `${item?.coupleRowId?.slice(0, 1)}${item?.strSeatNumber}`,
          );
          setSeatNumber([...seatNumber, ...updatedSeatNumber]);
          // const updatedPrice = [...tempPrice, price * 2];
          // setTempPrice(updatedPrice);
          // const total = updatedPrice?.reduce(
          //   (acc, current) => acc + current,
          //   0,
          // );
          // setTotalprice(total);
        } else {
          setModal(true);
        }
        handleChangeArea(index);
        setIsTimeSelected(true);
      } else if (seatStatus === '2') {
        seatLayout[index].rowData[keys].seatData[
          addedSeats[0]?.dblSeatXPos - 1
        ].strSeatStatus = '0';
        // seatLayout[index].rowData[keys].seatData[
        //   addedSeats[1]?.dblSeatXPos - 1
        // ].strSeatStatus = '0';
        if (seatLayout[index].rowData[keys]?.seatData) {
          const seatIndex = addedSeats[1]?.dblSeatXPos - 1;
          if (seatLayout[index].rowData[keys].seatData[seatIndex]) {
            seatLayout[index].rowData[keys].seatData[seatIndex].strSeatStatus =
              '0';
          }
        }
        // tempPrice.pop();
        setSeatLayout([...seatLayout]);
        // setTempPrice([...tempPrice]);
        // const total = tempPrice?.reduce((acc, current) => acc + current, 0);
        // setTotalprice(total);
        setSelectedSeatsCount(selectedSeatsCount - 2);
        // setDisable(tempPrice.length === 0);
        setIsTimeSelected(strSelectedSeats?.length > 0);
        const list = seatNumber?.filter(
          value => value !== `${key}${item?.strSeatNumber}`,
        );
        setSeatNumber([...list]);
        const updatedSeats = selectedSeat?.filter(
          val =>
            val?.strSeatNumber !==
              seatLayout[index]?.rowData[keys]?.seatData[newIndex]
                ?.strSeatNumber || val?.coupleRowId !== coupleRowId,
        );
        setSelectedSeat(updatedSeats);
      }
    } else {
      if (seatStatus === '0') {
        if (strSelectedSeats?.length < 10) {
          const filtered = selectedSeat?.filter(
            item => item?.areaCode === dataOfSeat?.areaCode,
          );
          if (!filtered?.length && selectedSeat?.length > 0) {
            const updatedSeat = [...filtered, dataOfSeat];
            setSelectedSeat(updatedSeat);
            setSeatLayout((data: any) => {
              let layout = [...data];
              layout?.map((item, index1) => {
                item?.rowData?.map((rows: any, index2: any) => {
                  rows?.seatData?.map((seats: any, index3: any) => {
                    if (
                      layout[index1]?.rowData[index2]?.seatData[index3]
                        ?.strSeatStatus === '2'
                    ) {
                      layout[index1].rowData[index2].seatData[
                        index3
                      ].strSeatStatus = '0';
                    }
                  });
                });
              });
              layout[index].rowData[keys].seatData[newIndex].strSeatStatus =
                '2';
              return layout;
            });
            setSelectedSeatsCount(updatedSeat?.length);
            setSeatNumber([`${key}${item?.strSeatNumber}`]);
            // setTempPrice([price]);
            // setTotalprice(price);
          } else {
            const updatedSeat = [...selectedSeat, dataOfSeat];
            setSelectedSeat(updatedSeat);
            seatLayout[index].rowData[keys].seatData[newIndex].strSeatStatus =
              '2';
            setSeatLayout([...seatLayout]);
            setSelectedSeatsCount(updatedSeat?.length);
            setSeatNumber([...seatNumber, `${key}${item?.strSeatNumber}`]);
            // const updatedPrice = [...tempPrice, price];
            // setTempPrice(updatedPrice);
            // const total = updatedPrice?.reduce(
            //   (acc, current) => acc + current,
            //   0,
            // );
            // setTotalprice(total);
          }
          setIsTimeSelected(true);
        } else {
          setModal(true);
        }
        handleChangeArea(index);
      } else if (seatStatus === '2') {
        seatLayout[index].rowData[keys].seatData[newIndex].strSeatStatus = '0';
        // tempPrice.pop();
        setSeatLayout([...seatLayout]);
        // setTempPrice([...tempPrice]);
        // const total = tempPrice?.reduce((acc, current) => acc + current, 0);
        // setTotalprice(total);
        setSelectedSeatsCount(selectedSeatsCount - 1);
        // setDisable(tempPrice.length === 0);
        setIsTimeSelected(strSelectedSeats?.length > 0);
        const list = seatNumber?.filter(
          value => value !== `${key}${item?.strSeatNumber}`,
        );
        setSeatNumber([...list]);
        setSelectedSeat(prev => {
          const arr = prev?.filter(item => {
            return (
              `${item?.seatNumber}${item?.SeatRowId}` !==
              `${seatLayout[index]?.rowData[keys]?.seatData[newIndex]?.intGridSeatNum}${seatLayout[index]?.rowData[keys]?.intGridRowID}`
            );
          });
          return arr;
        });
      }
    }
  };

  const handleChangeArea = (index1: number) => {
    if (
      selectedSeatArea != '' &&
      seatLayout[index1].strAreaDesc !== selectedSeatArea
    ) {
      setSeatLayout(e => {
        let arr = [...e];
        arr.forEach((item, index01) => {
          item.rowData?.map((rows: any, index02: number) => {
            rows.seatData?.map((seats: any, index03: number) => {
              if (
                arr[index01].rowData[index02].seatData[index03]
                  .strSeatStatus === '2' &&
                item.strAreaDesc == selectedSeatArea
              ) {
                arr[index01].rowData[index02].seatData[index03].strSeatStatus =
                  '0';
              }
              return false;
            });
            return false;
          });
          return false;
        });
        return arr;
      });
      // if (selectedSeats.length === 10) {
      //   handleSeatSelect(index1, index2, index3);
      // }
    }
  };

  const selectTime = (time: string): void => {
    setSelectedTime(time);
    setIsTimeSelected(false);
    if (time !== selectedTime) {
      setShowSpinner(true);
      setPriceData(priceData.map(item => ({...item, price: 0})));
      // setTempPrice([]);
      setSelectedSeatsCount(0);
      // setTotalprice(0);
      setSelectedSeat([]);
      setSeatNumber([]);
    }
  };

  const onSetSeats = async (transactionId: string, sessionId: string) => {
    /* API call for reserving seats for session */
    const seatNumbers = `|${strSelectedSeats?.length}${strSelectedSeats
      ?.map(
        detail =>
          `|${detail.areaCode}|${detail.areaNumber}|${detail.SeatRowId}|${detail.intGridSeatNum}`,
      )
      .join('')}|`;
    const formData = new URLSearchParams();
    formData.append('cinemaId', cinemaId);
    formData.append('cinemaObjId', cinemaNumberId);
    formData.append('movieObjId', route?.params.movieDetail);
    formData.append('showObjId', showObjId);
    formData.append('strTransId', transactionId);
    formData.append('lngSessionId', movieSessionId);
    formData.append('strSelectedSeats', seatNumbers);
    try {
      const {data} = await axiosInstance.post(
        constant.setSeats,
        formData.toString(),
      );
      setLoading(false);
      refRBSheet?.current?.close();
      if (data?.data) {
        const filterSeats = strSelectedSeats.map(seat => seat?.coupleRowId);
        const uniqueData = [...new Set(filterSeats)];
        const newData = {
          selectedSeatTime: new Date(),
          id: cinemaNumberId,
          cinemaName: cinemaId,
          transactionId: transactionId,
          movieId: route?.params?.movieDetail,
          totalTicket: strSelectedSeats?.length,
          ticketPrice: strTotalPrice,
          time: selectedTime,
          selectedSeat: filterSeats,
          movieSessionId: movieSessionId,
          pGroupCode: pGroupCode,
          areaCatCode: strSelectedSeats[0]?.areaCode,
          flag: flag,
          language: route?.params?.language,
          filmCode: route?.params?.filmCode,
          sessionId: sessionId,
        };
        setTimeout(() => {
          navigation.navigate('payment', newData);
        }, 500);
      }
      setLastSeatData(data?.data?.data);
      Log('set seat response', data);
    } catch (error: any) {
      setLoading(false);
      setDisable(false);
      Snackbar.show({
        text: 'Something went wrong',
        duration: 3000,
      });
      refRBSheet?.current?.close();
      Log('set seat error', error?.response);
    }
  };

  const addMovieSeats = async (transactionId: string, sessionId: string) => {
    /* API call for adding seats */
    try {
      const formData = {
        [params.id]: `${cinemaId}|${transactionId}|${movieSessionId}|${tTypeCode}|${strSelectedSeats?.length}`,
        [params.showId]: showId,
      };
      const {data} = await axiosInstance.post(constant.addSeats, formData);
      if (data?.data?.Status === '1') {
        setAddSeats(data?.data?.data);
        onSetSeats(data?.data?.data?.strTransId, sessionId);
      } else {
        refRBSheet?.current?.close();
      }
      Log('add response', data?.data);
    } catch (error: any) {
      setLoading(false);
      setDisable(false);
      Snackbar.show({
        text: error?.response?.data?.message ?? error?.message,
        duration: 3000,
      });
      refRBSheet?.current?.close();
      Log('add error', error?.response?.data);
    }
  };

  const checkStatus = () => {
    if (token) {
      onInitBooking();
    } else {
      refRBSheet?.current?.close();
      setTimeout(() => {
        setVisible(true);
      }, 500);
    }
  };

  const onInitBooking = async () => {
    /* API call for init booking */
    try {
      setLoading(true);
      setDisable(true);
      const {data} = await axiosInstance.get(
        `${constant.initBooking}/${cinemaId}/${route?.params?.movieDetail}`,
        {
          headers: {
            auth: token,
          },
        },
      );
      console.log('data');
      if (data?.data) {
        addMovieSeats(data?.data?.initTransId, data?.data?.bookingSessionId);
        setInitBookingData(data?.data);
        setBookingSessionId(data?.data?.bookingSessionId);
      } else {
        refRBSheet?.current?.close();
      }
      setDisable(false);
    } catch (error: any) {
      setLoading(false);
      setDisable(false);
      Snackbar.show({
        text: error?.response?.data?.message ?? error?.message,
        duration: 3000,
      });
      refRBSheet?.current?.close();
      if (error?.response?.data?.status == 409) {
        navigation.navigate('bottom', {screen: 'homeScreen'});
      }
      Log('iniit error', error?.response);
    }
  };

  const closeSheet = () => {
    refRBSheet?.current?.close();
  };

  return {
    selectTime,
    onSeatClick,
    loading,
    seatBookingData,
    setSeatBookingData,
    movieTimings,
    selectedTime,
    isTimeSelected,
    setIsTimeSelected,
    refRBSheet,
    initBookingData,
    setInitBookingData,
    checkStatus,
    addSeats,
    setAddSeats,
    lastSeatData,
    setLastSeatData,
    selectedSeat,
    movieName,
    showTime,
    modal,
    setModal,
    disable,
    showSpinner,
    layoutData,
    setArea,
    closeSheet,
    refreshing,
    onRefreshCall,
    visible,
    setVisible,
    seatLayout,
    setSelectedSeatArea,
    strTotalPrice,
    strSelectedSeats,
  };
};

export default seatBookingController;
