import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {getRemainingTimeUntil10Min} from '../utility/functions/comman';

const useSeatTimer = (selectedSeatTime: Date) => {
  const navigation = useNavigation<any>();
  const [timeLeft, setTimeLeft] = useState(() =>
    getRemainingTimeUntil10Min(selectedSeatTime),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const time = getRemainingTimeUntil10Min(selectedSeatTime);
      setTimeLeft(time);
      if (time === 'Time expired') {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedSeatTime]);

  return timeLeft;
};

export default useSeatTimer;
