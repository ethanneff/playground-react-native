import { useEffect } from 'react';
import { Collections } from '../Collections';
import { loadUsers } from '../reducers';
import { userSchema } from '../types';
import { useRootDispatch, useRootSelector } from './../../../../redux';

export const useUsers = () => {
  const dispatch = useRootDispatch();
  const uid = useRootSelector((state) => state.focus.auth.uid);

  useEffect(() => {
    if (!uid) return () => undefined;

    const subscription = Collections.users.doc(uid).onSnapshot((snapshot) => {
      const data = userSchema.parse({ ...snapshot.data(), id: snapshot.id });
      dispatch(loadUsers(data));
    });

    return () => {
      subscription();
    };
  }, [dispatch, uid]);

  return null;
};