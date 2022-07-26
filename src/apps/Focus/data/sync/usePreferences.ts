import { useEffect } from 'react';
import { Collections } from '../Collections';
import { loadPreferences } from '../reducers';
import { preferenceSchema } from '../types';
import { useRootDispatch, useRootSelector } from './../../../../redux';

export const usePreferences = () => {
  const dispatch = useRootDispatch();
  const uid = useRootSelector((state) => state.focus.auth.uid);

  useEffect(() => {
    if (!uid) return () => undefined;

    const subscription = Collections.preferences
      .where('uid', '==', uid)
      .onSnapshot((snapshot) => {
        if (!snapshot.size) return;
        const data = preferenceSchema.parse(snapshot.docs[0].data());
        dispatch(loadPreferences(data));
      });

    return () => {
      subscription();
    };
  }, [dispatch, uid]);

  return null;
};
