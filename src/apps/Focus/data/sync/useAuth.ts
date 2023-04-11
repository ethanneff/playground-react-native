import { useEffect } from 'react';
import { Firebase, type FirebaseAuthTypes } from '../../../../conversions';
import { loginAuth, logoutAuth } from '../reducers';
import { useAppDispatch } from './../../../../redux';

export const useAuth = () => {
  const dispatch = useAppDispatch();

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
