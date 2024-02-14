import { useCallback, useEffect, useRef } from 'react';

type Properties = {
  frequency?: number;
  onUpdate: (time: number) => void;
  precision?: number;
};

type State = 'off' | 'on';

type UseClock = {
  start: () => void;
  stop: () => void;
};

export const useClock = ({
  frequency = 60,
  onUpdate,
  precision = 16,
}: Properties): UseClock => {
  const state = useRef<State>('off');
  const previous = useRef(0);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loop = useCallback(() => {
    timeout.current = setTimeout(() => {
      const time = Date.now();
      if (time - previous.current >= frequency) {
        previous.current = time;
        onUpdate(time);
      }
      loop();
    }, precision);
  }, [frequency, precision, onUpdate]);

  const stop = useCallback(() => {
    state.current = 'off';
    if (timeout.current) clearTimeout(timeout.current);
  }, []);

  const start = useCallback(() => {
    stop();
    state.current = 'on';
    const time = Date.now();
    previous.current = time;
    onUpdate(time);
    loop();
  }, [stop, loop, onUpdate]);

  useEffect(
    () => () => {
      stop();
    },
    [stop],
  );

  return { start, stop };
};
