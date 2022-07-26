import { RootAction, RootState } from 'root-types';
import { createAction, getType } from 'typesafe-actions';
import { FirebaseAuthTypes } from '../../../../conversions';

/* INTERFACES */
type User = FirebaseAuthTypes.User;
type FocusAuthReducer = {
  status: 'initializing' | 'authenticated' | 'unauthenticated';
  uid: string | null;
  updatedAt: number;
};

/* ACTIONS */
export const loginAuth = createAction('focus/auth/login')<User>();
export const logoutAuth = createAction('focus/auth/logout')();
export const focusAuthActions = { loginAuth, logoutAuth };

/* SELECTORS */
export const getLoaded = (state: RootState): boolean =>
  Boolean(state.focus.auth.updatedAt) &&
  Boolean(state.focus.goals.updatedAt) &&
  Boolean(state.focus.users?.updatedAt) &&
  Boolean(state.focus.preferences?.updatedAt) &&
  Boolean(state.focus.intervals.updatedAt);

/* REDUCER */
const initialState: FocusAuthReducer = {
  status: 'initializing',
  uid: null,
  updatedAt: 0,
};

export const focusAuthReducer = (
  state: FocusAuthReducer = initialState,
  action: RootAction,
): FocusAuthReducer => {
  switch (action.type) {
    case getType(loginAuth):
      return {
        uid: action.payload.uid,
        status: 'authenticated',
        updatedAt: Date.now(),
      };
    case getType(logoutAuth):
      return {
        uid: null,
        status: 'unauthenticated',
        updatedAt: Date.now(),
      };
    default:
      return state;
  }
};
