import React, {useEffect, useState, useCallback, useRef} from 'react';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {cityData} from '../services/config/redux/userReducer/action';
import axiosInstance from '../services/api';
import constant from '../services/config/constant';
import {
  useAppDispatch,
  useAppSelector,
} from '../services/config/redux/useReduxHooks';

const useNavigationListener = (
  callback: () => void,
  dependencies: any[] = [],
) => {
  const navigationState = useNavigationState(state => state);

  useEffect(() => {
    if (navigationState) {
      // Trigger the callback whenever the navigation state changes
      callback();
    }
  }, [navigationState, ...dependencies]); // Add dependencies here
};

const NavigationListener = ({children}: any) => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.UserReducer);
  const [hasNavigated, setHasNavigated] = useState(false);
  const isProcessing = useRef(false); // Use a ref to prevent re-renders from affecting the navigation logic

  // Refactored getRegionData function
  const getRegionData = useCallback(async () => {
    if (!user?.cityData?._id) return; // Skip if no cityData is available

    try {
      isProcessing.current = true; // Indicate that the process is ongoing
      const {data} = await axiosInstance.get(constant.getRegion);

      if (data && data.data) {
        const isMatched = data.data.find(
          (item: any) => item?._id === user?.cityData?._id,
        );

        // Reset cityData only if no match is found
        if (!isMatched) {
          dispatch(cityData(undefined));
        }
      }
    } catch (error) {
      console.error('Error fetching region data:', error);
      dispatch(cityData(undefined)); // Reset on error
    } finally {
      isProcessing.current = false; // Process is done
    }
  }, [dispatch, user?.cityData]);

  useNavigationListener(() => {
    if (!hasNavigated && !isProcessing.current && user?.cityData) {
      getRegionData(); // Fetch region data

      // Navigate if cityModal is open and no cityData is available
      if (user?.cityModal && !user?.cityData) {
        navigation.navigate('bottom', {screen: 'homeScreen'});
        setHasNavigated(true); // Prevent further navigations

        // Reset the navigation state after some delay
        setTimeout(() => {
          setHasNavigated(false); // Allow future navigations
        }, 2000);
      }
    }
  }, [user, hasNavigated]);

  // Ensure cityModal is handled properly based on cityData
  useEffect(() => {
    if (user?.cityModal && !user?.cityData && !isProcessing.current) {
      getRegionData();
    }
  }, [user?.cityModal, user?.cityData, getRegionData]);

  return <>{children}</>;
};

export default NavigationListener;
