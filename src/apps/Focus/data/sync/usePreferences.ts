import { useEffect } from 'react';
import { Collections } from '../Collections';
import { loadPreferences } from '../reducers';
import { preferenceSchema } from '../types';
import { useAppDispatch, useAppSelector } from './../../../../redux';

export const usePreferences = () => {
  const dispatch = useAppDispatch();
  const uid = useAppSelector((state) => state.focus.auth.uid);

  useEffect(() => {
    if (!uid) return () => undefined;

    const subscription = Collections.preferences
      .where('uid', '==', uid)
      .onSnapshot((snapshot) => {
        const data = preferenceSchema.parse(snapshot.docs[0].data());
        dispatch(loadPreferences(data));
      });

    return () => {
      subscription();
    };
  }, [dispatch, uid]);

  return null;
};
