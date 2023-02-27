import { differenceInSeconds } from 'date-fns';

const DAY_SECOND = 86400;
const HOUR_SECOND = 3600;
const MINUTE_SECOND = 60;

export const convertSecondsToDuration = (durationSeconds: number) => {
  const days = Math.floor(durationSeconds / DAY_SECOND);
  const hour = Math.floor((durationSeconds - days * DAY_SECOND) / HOUR_SECOND);
  const minute = Math.floor((durationSeconds - days * DAY_SECOND - hour * HOUR_SECOND) / MINUTE_SECOND);
  const second = Math.floor(durationSeconds - days * DAY_SECOND - hour * HOUR_SECOND - minute * MINUTE_SECOND);

  return {
    days: Math.abs(days) < 10 ? `0${Math.abs(days)}` : `${Math.abs(days)}`,
    hour: hour < 10 ? `0${hour}` : `${hour}`,
    minute: minute < 10 ? `0${minute}` : `${minute}`,
    second: second < 10 ? `0${second}` : `${second}`,
  };
};

export const getDurationTime = (start: number, end: number) =>
  convertSecondsToDuration(differenceInSeconds(start, end));
