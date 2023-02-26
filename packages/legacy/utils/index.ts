const DAY_SECOND = 86400;
const HOUR_SECOND = 3600;
const MINUTE_SECOND = 60;

const differenceInSeconds = (start: number, end: number) => end - start;

const getTotalSecond = (start: number, end: number) =>
  differenceInSeconds(start, end);

const getTime = (totalSeconds: number) => {
  const days = Math.floor(totalSeconds / DAY_SECOND);
  const hour = Math.floor((totalSeconds - days * DAY_SECOND) / HOUR_SECOND);
  const minute = Math.floor(
    (totalSeconds - days * DAY_SECOND - hour * HOUR_SECOND) / MINUTE_SECOND
  );
  const second = Math.floor(
    totalSeconds -
      days * DAY_SECOND -
      hour * HOUR_SECOND -
      minute * MINUTE_SECOND
  );

  return {
    days: Math.abs(days) < 10 ? `0${Math.abs(days)}` : `${Math.abs(days)}`,
    hour: hour < 10 ? `0${hour}` : `${hour}`,
    minute: minute < 10 ? `0${minute}` : `${minute}`,
    second: second < 10 ? `0${second}` : `${second}`,
  };
};

export const getExpiryTimer = (start: number, end: number) =>
  getTime(getTotalSecond(start, end));
