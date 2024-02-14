import { type RootAction } from 'root-types';
import { type DeepReadonly } from 'ts-essentials';
import { createAction, getType } from 'typesafe-actions';
import { type Preferences } from '../types';
import { logoutAuth } from './Auth';

/* INTERFACES */
type FocusPreferencesReducer = DeepReadonly<{
  preference: Preferences | null;
  updatedAt: number;
}> | null;

/* ACTIONS */
export const loadPreferences = createAction(
  'focus/preferences/load',
)<Preferences>();
export const focusPreferencesActions = { loadPreferences };

/* REDUCER */
const initialState: FocusPreferencesReducer = null;

export const focusPreferencesReducer = (
  state: FocusPreferencesReducer = initialState,
  action: RootAction,
): FocusPreferencesReducer => {
  switch (action.type) {
    case getType(loadPreferences): {
      return {
        ...state,
        preference: action.payload,
        updatedAt: Date.now(),
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
