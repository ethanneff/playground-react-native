import { useCallback } from "react";

export type Frame = {
  start: number;
  current: number;
  count: number;
};

export const useGameLoop = (next: (frame: Frame) => void) => {
  const fps = 16;
  const now = Date.now();
  let off = false;
  let frame: Frame = { start: now, current: now, count: 0 };
  let timer: any;

  const loop = useCallback(() => {
    if (off) {return;}
    timer = setTimeout(() => {
      clearTimeout(timer);
      if (off) {return;}
      frame = { ...frame, current: Date.now(), count: frame.count + 1 };
      next(frame);
      loop();
    }, fps);
  }, [fps, frame]);

  const start = useCallback(() => {
    off = false;
    loop();
  }, [timer]);

  const stop = useCallback(() => {
    off = true;
    const now = Date.now();
    frame = { start: now, current: now, count: 0 };
    clearTimeout(timer);
  }, [frame, timer]);

  return {
    start,
    stop
  };
};
