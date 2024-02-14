import { type RootAction } from 'root-types';
import { createAction, getType } from 'typesafe-actions';
import { type User } from '../types';
import { logoutAuth } from './Auth';

/* INTERFACES */
type FocusUsersReducer = {
  updatedAt: number;
  user: User;
} | null;

/* ACTIONS */
export const loadUsers = createAction('focus/users/load')<User>();
export const focusUsersActions = { loadUsers };

/* REDUCER */
const initialState: FocusUsersReducer = null;

export const focusUsersReducer = (
  state: FocusUsersReducer = initialState,
  action: RootAction,
): FocusUsersReducer => {
  switch (action.type) {
    case getType(loadUsers): {
      return {
        ...state,
        updatedAt: Date.now(),
        user: {
          displayName: action.payload.displayName,
          email: action.payload.email,
          emailVerified: action.payload.emailVerified,
          id: action.payload.id,
          phoneNumber: action.payload.phoneNumber,
          photoUrl: action.payload.photoUrl,
        },
      };
    }
    case getType(logoutAuth): {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
