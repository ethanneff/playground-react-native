import { RootAction, RootState } from 'root-types';
import { createAction, getType } from 'typesafe-actions';
import { logout } from './Auth';

/* ACTIONS */
export const loadUser = createAction('complete/user/load')<User>();
export const updateUser = createAction('complete/user/update')<User>();
export const completeUserActions = { loadUser, updateUser };

/* SELECTORS */
export const getUser = (state: RootState): CompleteUserReducer =>
  state.completeUser;

/* INTERFACES */
export type CompleteUserReducer = User | null;
export type User = {
  id: string;
  name: string;
  email: string;
  active: boolean;
  createdAt: number;
  updatedAt: number;
  items: ReadonlyArray<string>;
};

/* REDUCER */
const initialState: CompleteUserReducer = null;
export const completeUserReducer = (
  state: CompleteUserReducer = initialState,
  action: RootAction,
): CompleteUserReducer => {
  switch (action.type) {
    case getType(loadUser):
      return action.payload;
    case getType(updateUser):
      return {
        ...state,
        ...action.payload,
        updatedAt: Date.now(),
      };
    case getType(logout):
      return initialState;
    default:
      return state;
  }
};
