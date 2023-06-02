import { useEffect } from 'react';
import { Firebase, type FirebaseAuthTypes } from '../../../../conversions';
import { useAppDispatch } from '../../../../redux';
import { loginAuth, logoutAuth } from '../reducers';

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
