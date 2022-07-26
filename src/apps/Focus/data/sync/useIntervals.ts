import { useEffect } from 'react';
import { z } from 'zod';
import { Collections } from '../Collections';
import { loadIntervals } from '../reducers';
import { intervalSchema } from '../types';
import { useRootDispatch, useRootSelector } from './../../../../redux';

export const useIntervals = () => {
  const dispatch = useRootDispatch();
  const uid = useRootSelector((state) => state.focus.auth.uid);

  useEffect(() => {
    if (!uid) return () => undefined;

    const subscription = Collections.intervals
      .where('uid', '==', uid)
      .onSnapshot((snapshot) => {
        if (!snapshot.size) return;
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
