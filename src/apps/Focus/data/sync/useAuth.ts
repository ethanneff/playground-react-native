import { useEffect } from 'react';
import { Firebase, type FirebaseAuthTypes } from '../../../../conversions';
import { loginAuth, logoutAuth } from '../reducers';
import { useRootDispatch } from './../../../../redux';

export const useAuth = () => {
  const dispatch = useRootDispatch();

  useEffect(() => {
    const subscription = Firebase.auth().onAuthStateChanged(
      (data: FirebaseAuthTypes.User | null) => {
        dispatch(data ? loginAuth(data) : logoutAuth());
      },
    );
    return () => {
      subscription();
    };
  }, [dispatch]);
};
