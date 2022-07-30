// 다중 조건 정렬 함수
import React, { useState, useEffect } from "react";
import { getExpiryTimer } from "./utils";

const useTimer = (start: number, end?: number) => {
  const [time, setTime] = useState({
    days: "00",
    hour: "00",
    minute: "00",
    second: "00",
  });

  useEffect(() => {
    if (end) {
      const handle = setInterval(
        () => setTime(getExpiryTimer(start, end)),
        1000
      );
      return () => clearInterval(handle);
    }
  }, [start, end]);

  return time;
};

export default useTimer;
