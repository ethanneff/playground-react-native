import { useCallback, useState, useRef } from "react";

export type Frame = {
  start: number;
  current: number;
  count: number;
};

const initialFrame = () => {
  const now = Date.now();
  return { start: now, current: now, count: 0 };
};

export const useGameLoop = () => {
  const fps = 16;
  const off = useRef(false);
  const [frame, setFrame] = useState<Frame>(initialFrame());

  const loop = useCallback(() => {
    if (off.current) {
      return;
    }
    const timer = setTimeout(() => {
      clearTimeout(timer);
      if (off.current) {
        return;
      }
      setFrame(prev => ({
        ...prev,
        current: Date.now(),
        count: prev.count + 1
      }));
      loop();
    }, fps);
  }, [off]);

  const start = useCallback(() => {
    off.current = false;
    loop();
  }, [loop]);

  const stop = useCallback(() => {
    off.current = true;
    setFrame(initialFrame());
  }, []);

  return {
    frame,
    start,
    stop
  };
};
