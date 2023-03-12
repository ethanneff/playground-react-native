import { type MutableRefObject, useCallback, useEffect, useRef } from 'react';

export type Frame = {
  count: number;
  current: number;
  start: number;
};

const initialFrame = {
  count: 0,
  current: Date.now(),
  start: Date.now(),
};

type UseGameLoop = {
  frame: MutableRefObject<Frame>;
  start: () => void;
  stop: () => void;
};

type Callback = (frame: Frame) => void;

export const useGameLoop = (callback: Callback): UseGameLoop => {
  const fps = 16;
  const off = useRef(false);
  const frame = useRef(initialFrame);

  const loop = useCallback(() => {
    setTimeout(() => {
      if (off.current) return;

      frame.current = {
        ...frame.current,
        count: frame.current.count + 1,
        current: Date.now(),
      };
      callback(frame.current);
      loop();
    }, fps);
  }, [callback]);

  const start = useCallback(() => {
    off.current = false;
    loop();
  }, [loop]);

  const stop = useCallback(() => {
    off.current = true;
    frame.current = initialFrame;
  }, []);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    frame,
    start,
    stop,
  };
};
