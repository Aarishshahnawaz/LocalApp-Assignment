import { useEffect, useRef, useState } from "react";

export function useSessionTimer(startTime: number) {
  const [seconds, setSeconds] = useState(
    Math.floor((Date.now() - startTime) / 1000)
  );
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startTime]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
