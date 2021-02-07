import {RootAction} from 'root-types';
import {createAction, getType} from 'typesafe-actions';

/* ACTIONS */
export const login = createAction('complete/auth/login')<Auth>();
export const logout = createAction('complete/auth/logout')();
export const completeAuthActions = {login, logout};

/* INTERFACES */
export type CompleteAuthReducer = Auth | null;
export type Auth = {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  uid: string;
};

/* REDUCER */
const initialState: CompleteAuthReducer = null;
export const completeAuthReducer = (
  state: CompleteAuthReducer = initialState,
  action: RootAction,
): CompleteAuthReducer => {
  switch (action.type) {
    case getType(login):
      return action.payload;
    case getType(logout):
      return initialState;
    default:
      return state;
  }
};
