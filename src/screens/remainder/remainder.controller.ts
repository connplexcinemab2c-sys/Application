import {useEffect, useState} from 'react';
import {axiosInstance} from '../../services/api/api';
import constant from '../../services/config/constant';
import {FormDataProps} from './remainder.interface';
import Log from '../../utility/log';
import Snackbar from 'react-native-snackbar';
import {updateData} from '../../services/config/redux/userReducer/action';
import {
  useAppDispatch,
  useAppSelector,
} from '../../services/config/redux/useReduxHooks';

const reminderController = () => {
  const dispatch = useAppDispatch();
  const {token, updateSwitch} = useAppSelector(state => state.UserReducer);
  const [nowPlaying, setNowPlaying] = useState<boolean>(
    updateSwitch?.nowPlayingMovies ? true : false,
  );
  const [upcomingMovies, setUpcomingMovies] = useState<boolean>(
    updateSwitch?.upCommingMovies ? true : false,
  );
  const [upcomingBookings, setUpcomingBookings] = useState<boolean>(
    updateSwitch?.upCommingBookings ? true : false,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [index, setIndex] = useState<string>(updateSwitch?._id);

  useEffect(() => {
    setIndex(updateSwitch?._id);
    setNowPlaying(updateSwitch?.nowPlayingMovies ? true : false);
    setUpcomingMovies(updateSwitch?.upCommingMovies ? true : false);
    setUpcomingBookings(updateSwitch?.upCommingBookings ? true : false);
  }, [updateSwitch]);

  useEffect(() => {
    addUpdateReminders();
  }, [nowPlaying, upcomingMovies, upcomingBookings]);

  const getReminders = async () => {
    /* API call for getting reminders */
    try {
      setLoading(true);
      const {data} = await axiosInstance.get(constant.getReminders, {
        headers: {auth: token},
      });
      setLoading(false);
      setIndex(data?.data?._id);
      setNowPlaying(data?.data?.nowPlayingMovies);
      setUpcomingMovies(data?.data?.upCommingMovies);
      setUpcomingBookings(data?.data?.upCommingBookings);
      Log('get reminder', data);
    } catch (error) {
      setLoading(false);
      Log('get reminder error', error);
    }
  };

  const addUpdateReminders = async () => {
    /* API call for adding/updating reminder */
    try {
      const formData: FormDataProps = {
        nowPlayingMovies: nowPlaying,
        upCommingMovies: upcomingMovies,
        upCommingBookings: upcomingBookings,
      };
      if (index) {
        formData._id = index;
      }
      const {data} = await axiosInstance.post(
        constant.addUpdateReminders,
        formData,
        {
          headers: {auth: token},
        },
      );
      dispatch(updateData(data?.data));
      setIndex(data?.data?._id);
    } catch (error: any) {
      Snackbar.show({text: error?.response?.data?.message ?? error?.message});
      Log('add/update error', error?.response);
    }
  };

  const onNowPlaying = (value: any): void => {
    setNowPlaying(value);
  };

  const onUpcomingMovies = (value: any): void => {
    setUpcomingMovies(value);
  };

  const onUpcomingBookings = (value: any): void => {
    setUpcomingBookings(value);
  };

  return {
    nowPlaying,
    upcomingMovies,
    upcomingBookings,
    onNowPlaying,
    onUpcomingMovies,
    onUpcomingBookings,
    loading,
  };
};

export default reminderController;
