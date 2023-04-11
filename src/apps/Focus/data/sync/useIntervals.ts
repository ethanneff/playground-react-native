import { useEffect } from 'react';
import { z } from 'zod';
import { Collections } from '../Collections';
import { loadIntervals } from '../reducers';
import { intervalSchema } from '../types';
import { useAppSelector, useAppDispatch } from './../../../../redux';

export const useIntervals = () => {
  const dispatch = useAppDispatch();
  const uid = useAppSelector((state) => state.focus.auth.uid);

  useEffect(() => {
    if (!uid) return () => undefined;

    const subscription = Collections.intervals
      .where('uid', '==', uid)
      .onSnapshot((snapshot) => {
        const data = z
          .array(intervalSchema)
          .parse(
            snapshot.docs.map((item) => ({ ...item.data(), id: item.id })),
          );
        dispatch(loadIntervals(data));
      });

    return () => {
      subscription();
    };
  }, [dispatch, uid]);

  return null;
};
