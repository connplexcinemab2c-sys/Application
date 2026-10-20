import {useEffect, useRef, useState} from 'react';
import {Animated, Linking} from 'react-native';
import {AdDataProps, NextOrPrevious} from './adBanner.interface';
import {axiosInstance} from '../../services/api/api';
import {changeModalState} from '../../services/config/redux/userReducer/action';
import constant from '../../services/config/constant';
import {
  useAppDispatch,
  useAppSelector,
} from '../../services/config/redux/useReduxHooks';

const adBannerController = () => {
  const [imageSpinner, setImageSpinner] = useState<boolean>(true);
  const [adData, setAdData] = useState<AdDataProps[]>([]);
  const [current, setCurrent] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showAd, setShowAd] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);
  const [content, setContent] = useState<any>(
    adData?.map(x => ({
      ...x,
      finish: 0,
    })),
  );

  const {showModal, cityData} = useAppSelector(state => state.UserReducer);

  const usePrevious = (value: any) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const progress = useRef(new Animated.Value(0)).current;

  const prevCurrentPage = usePrevious(currentPage);

  const prevCurrent = usePrevious(current);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (showModal && adData?.length > 0) {
      setCurrent(0);
      setContent(
        adData?.map(x => ({
          ...x,
          finish: 0,
        })),
      );
      setShowAd(true);
    } else {
      dispatch(changeModalState(true));
    }
  }, [adData]);

  useEffect(() => {
    if (cityData?._id) {
      getAdBanner();
    }
  }, [cityData]);

  useEffect(() => {
    setContent(
      adData?.map(x => ({
        ...x,
        finish: 0,
      })),
    );
  }, [adData]);

  useEffect(() => {
    let isPrevious = !!prevCurrentPage && prevCurrentPage > currentPage;
    if (isPrevious) {
      setCurrent(content.length - 1);
    } else {
      setCurrent(0);
    }
    let data = [...content];
    data.map((x, i) => {
      if (isPrevious) {
        x.finish = 1;
        if (i == content.length - 1) {
          x.finish = 0;
        }
      } else {
        x.finish = 0;
      }
    });
    setContent(data);
    if (!imageSpinner) {
      start();
    }
  }, [currentPage]);

  useEffect(() => {
    if (!isNullOrWhitespace(prevCurrent)) {
      if (prevCurrent) {
        if (
          current > prevCurrent &&
          content[current - 1]?.banner == content[current]?.banner
        ) {
          start();
        } else if (
          current < prevCurrent &&
          content[current + 1]?.banner == content[current]?.banner
        ) {
          start();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const isNullOrWhitespace = (input: any) => {
    if (typeof input === 'undefined' || input == null) return true;

    return input.toString().replace(/\s/g, '').length < 1;
  };

  const start = () => {
    setImageSpinner(false);
    progress.setValue(0);
    startAnimation();
  };

  const startAnimation = (type?: string) => {
    Animated.timing(progress, {
      toValue: 1,
      duration: type === 'again' ? (1 - progress?.__getValue()) * 5000 : 5000,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        next();
      }
    });
  };

  const next = () => {
    // check if the next content is not empty
    if (current !== content.length - 1) {
      setImageSpinner(true);

      let data = [...content];
      data[current].finish = 1;
      setContent(data);
      setCurrent(current + 1);
      progress.setValue(0);
    } else {
      // the next content is empty
      if (progress?.__getValue() === 1) {
        setShowAd(false);
      }
      setShowAd(false);
      close('next');
    }
  };

  const previous = () => {
    // checking if the previous content is not empty
    if (current - 1 >= 0) {
      setImageSpinner(true);
      let data = [...content];
      data[current].finish = 0;
      setContent(data);
      setCurrent(current - 1);
      progress.setValue(0);
    } else {
      // the previous content is empty
      close('previous');
      setTimeout(() => {
        startAnimation();
      }, 300);
    }
  };

  const close = (state: NextOrPrevious) => {
    let data = [...content];
    data.map(x => (x.finish = 0));
    setContent(data);
    progress.setValue(0);
    // if (currentPage == index) {
    //   if (onFinish) {
    //     onFinish(state);
    //   }
    // }
  };

  const getAdBanner = async () => {
    /* API call for getting ad banners */
    try {
      const {data} = await axiosInstance.get(
        `${constant.getBanners}?bannerType=App%20Banner`,
      );
      const list = data?.data?.filter(
        (item: any) => item?.bannerType === 'App Banner',
      );
      setAdData(list);
    } catch (error: any) {}
  };

  const onImageLoadStart = (): void => {
    setImageSpinner(true);
  };
  const onImageLoadEnd = (): void => {
    setImageSpinner(false);
    start();
  };

  const onAd = (link: string): void => {
    if (link) {
      Linking.openURL(link);
    } else {
      return;
    }
  };

  const closeAdModal = (): void => {
    setShowAd(false);
  };

  return {
    imageSpinner,
    onImageLoadStart,
    onImageLoadEnd,
    adData,
    current,
    progress,
    content,
    showAd,
    closeAdModal,
    onAd,
    startAnimation,
    setPressed,
    previous,
    next,
    pressed,
  };
};

export default adBannerController;
