import { type RootAction } from 'root-types';
import { createAction, getType } from 'typesafe-actions';
import { type User } from '../types';
import { logoutAuth } from './Auth';

/* INTERFACES */
type Reducer = {
  updatedAt: number;
  user: User;
} | null;

/* ACTIONS */
export const loadUser = createAction('checklists/users/load')<User>();
export const checklistsUsersActions = { loadUser };

/* REDUCER */
const initialState: Reducer = null;

export const checklistsUsersReducer = (
  state: Reducer = initialState,
  action: RootAction,
): Reducer => {
  switch (action.type) {
    case getType(loadUser):
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
    case getType(logoutAuth):
      return initialState;
    default:
      return state;
  }
};
