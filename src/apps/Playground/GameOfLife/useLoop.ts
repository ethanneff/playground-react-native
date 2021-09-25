import { useCallback, useEffect, useRef } from 'react';
import { useRootDispatch, useRootSelector } from '../../../redux';
import { loopBoard } from './redux';

export const useLoop = (): void => {
  const dispatch = useRootDispatch();
  const run = useRootSelector((state) => state.gameOfLife.run);
  const delay = useRootSelector((state) => state.gameOfLife.delay);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loop = useCallback(() => {
    if (!run) return;
    dispatch(loopBoard());
  }, [dispatch, run]);

  useEffect(() => {
    if (!run) return undefined;
    timeoutRef.current = setInterval(loop, delay);
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [delay, dispatch, loop, run]);
};
