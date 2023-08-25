import { type RootAction, type RootState } from 'root-types';
import { type DeepReadonly } from 'ts-essentials';
import { createAction, getType } from 'typesafe-actions';
import { logout } from './Auth';

/* INTERFACES */
export type User = DeepReadonly<{
  active: boolean;
  createdAt: number;
  email: string;
  id: string;
  items: string[];
  name: string;
  updatedAt: number;
}>;
type CompleteUserReducer = User | null;

/* ACTIONS */
export const loadUser = createAction('complete/user/load')<User>();
export const updateUser = createAction('complete/user/update')<User>();
export const completeUserActions = { loadUser, updateUser };

/* SELECTORS */
export const getUser = (state: RootState): CompleteUserReducer =>
  state.complete.user;

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
