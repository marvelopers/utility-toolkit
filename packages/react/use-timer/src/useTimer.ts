import { useState, useEffect } from 'react';
import { getDurationTime } from './duration';

export const useTimer = (start: number, end?: number) => {
  const [time, setTime] = useState({
    days: '00',
    hour: '00',
    minute: '00',
    second: '00',
  });

  useEffect(() => {
    if (end) {
      const handle = setInterval(() => setTime(getDurationTime(start, end)), 1000);
      return () => clearInterval(handle);
    }
  }, [start, end]);

  return time;
};
