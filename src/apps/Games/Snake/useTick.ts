import { useEffect } from "react";
import { useCallback } from "react";

type Tick = {
  start: number;
  current: number;
  count: number;
};

export const useTick = (next: (tick: Tick) => void) => {
  const fps = 16;
  const now = Date.now();
  let tick: Tick = { start: now, current: now, count: 0 };
  let timer: any;
  const loop = useCallback(() => {
    timer = setTimeout(() => {
      clearTimeout(timer);
      tick = { ...tick, current: Date.now(), count: tick.count + 1 };
      next(tick);
      loop();
    }, fps);
  }, [fps, tick]);

  useEffect(() => {
    loop();
    return () => {
      clearTimeout(timer);
    };
  }, []);
};
