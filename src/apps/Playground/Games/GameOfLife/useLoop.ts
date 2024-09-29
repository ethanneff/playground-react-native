import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import { loopBoard } from './redux';

export const useLoop = (): void => {
  const dispatch = useAppDispatch();
  const run = useAppSelector((state) => state.games.life.run);
  const delay = useAppSelector((state) => state.games.life.delay);
  const timeoutReference = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loop = useCallback(() => {
    if (!run) return;
    dispatch(loopBoard());
  }, [dispatch, run]);

  useEffect(() => {
    if (!run) return () => null;
    timeoutReference.current = setInterval(loop, delay);
    return () => {
      if (!timeoutReference.current) return;
      clearInterval(timeoutReference.current);
    };
  }, [delay, dispatch, loop, run]);
};
