import {useCallback, useEffect, useRef} from 'react';
import {useRootDispatch} from '../../../utils';
import {useRootSelector} from './../../../utils/Redux/index';
import {loopBoard} from './redux';

export const useLoop = (): void => {
  const dispatch = useRootDispatch();
  const run = useRootSelector(state => state.gameOfLife.run);
  const delay = useRootSelector(state => state.gameOfLife.delay);
  const timeoutRef = useRef<number | null>(null);

  const loop = useCallback(() => {
    if (!run) return;
    dispatch(loopBoard());
  }, [dispatch, run]);

  useEffect(() => {
    if (!run) return;
    timeoutRef.current = setInterval(loop, delay);
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [delay, dispatch, loop, run]);
};
