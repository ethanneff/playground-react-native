import { useCallback, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../redux';
import { loopBoard } from './redux';

export const useLoop = (): void => {
  const dispatch = useAppDispatch();
  const run = useAppSelector((state) => state.gameOfLife.run);
  const delay = useAppSelector((state) => state.gameOfLife.delay);
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
