import { useEffect } from 'react';
import { z } from 'zod';
import { Collections } from '../Collections';
import { loadGoals } from '../reducers';
import { goalSchema } from '../types';
import { useAppSelector, useAppDispatch } from './../../../../redux';

export const useGoals = () => {
  const dispatch = useAppDispatch();
  const uid = useAppSelector((state) => state.focus.auth.uid);

  useEffect(() => {
    if (!uid) return () => undefined;

    const subscription = Collections.goals
      .where('uid', '==', uid)
      .onSnapshot((snapshot) => {
        const data = z
          .array(goalSchema)
          .parse(
            snapshot.docs.map((item) => ({ ...item.data(), id: item.id })),
          );
        dispatch(loadGoals(data));
      });

    return () => {
      subscription();
    };
  }, [dispatch, uid]);

  return null;
};
