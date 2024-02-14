import { type RootAction, type RootState } from 'root-types';
import { createAction, getType } from 'typesafe-actions';
import { type FirebaseAuthTypes } from '../../../../conversions';

/* INTERFACES */
type User = FirebaseAuthTypes.User;
type FocusAuthReducer = {
  status: 'authenticated' | 'initializing' | 'unauthenticated';
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
    case getType(loginAuth): {
      return {
        status: 'authenticated',
        uid: action.payload.uid,
        updatedAt: Date.now(),
      };
    }
    case getType(logoutAuth): {
      return {
        status: 'unauthenticated',
        uid: null,
        updatedAt: Date.now(),
      };
    }
    default: {
      return state;
    }
  }
};
