import { type RootAction, type RootState } from 'root-types';
import { createAction, getType } from 'typesafe-actions';
import { type FirebaseAuthTypes } from '../../../../conversions';

/* INTERFACES */
type User = FirebaseAuthTypes.User;
type Reducer = {
  status: 'authenticated' | 'initializing' | 'unauthenticated';
  uid: string | null;
  updatedAt: number;
};

/* ACTIONS */
export const loginAuth = createAction('checklists/auth/login')<User>();
export const logoutAuth = createAction('checklists/auth/logout')();
export const checklistsAuthActions = { loginAuth, logoutAuth };

/* SELECTORS */
export const getLoaded = (state: RootState): boolean =>
  Boolean(state.checklists.auth.updatedAt);

/* REDUCER */
const initialState: Reducer = {
  status: 'initializing',
  uid: null,
  updatedAt: 0,
};

export const checklistsAuthReducer = (
  state: Reducer = initialState,
  action: RootAction,
): Reducer => {
  switch (action.type) {
    case getType(loginAuth):
      return {
        status: 'authenticated',
        uid: action.payload.uid,
        updatedAt: Date.now(),
      };
    case getType(logoutAuth):
      return {
        status: 'unauthenticated',
        uid: null,
        updatedAt: Date.now(),
      };
    default:
      return state;
  }
};
