import {MutableRefObject, useCallback, useEffect, useRef} from 'react';

export type Frame = {
  start: number;
  current: number;
  count: number;
};

const initialFrame = {
  start: Date.now(),
  current: Date.now(),
  count: 0,
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
        current: Date.now(),
        count: frame.current.count + 1,
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
