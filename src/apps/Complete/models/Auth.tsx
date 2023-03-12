import { type RootAction } from 'root-types';
import { type DeepReadonly } from 'ts-essentials';
import { createAction, getType } from 'typesafe-actions';

/* INTERFACES */
type Auth = DeepReadonly<{
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  uid: string;
}>;
type CompleteAuthReducer = Auth | null;

/* ACTIONS */
export const login = createAction('complete/auth/login')<Auth>();
export const logout = createAction('complete/auth/logout')();
export const completeAuthActions = { login, logout };

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
