import { type RootAction } from 'root-types';
import { type DeepReadonly } from 'ts-essentials';
import { createAction, getType } from 'typesafe-actions';
import { type Interval } from '../types';
import { logoutAuth } from './Auth';

/* INTERFACES */
type FocusIntervalsReducer = DeepReadonly<{
  items: Interval[];
  updatedAt: number;
}>;

/* ACTIONS */
export const loadIntervals = createAction('focus/intervals/load')<Interval[]>();
export const focusIntervalsActions = { loadIntervals };

/* REDUCER */
const initialState: FocusIntervalsReducer = {
  items: [],
  updatedAt: 0,
};

export const focusIntervalsReducer = (
  state: FocusIntervalsReducer = initialState,
  action: RootAction,
): FocusIntervalsReducer => {
  switch (action.type) {
    case getType(loadIntervals):
      return {
        ...state,
        items: action.payload,
        updatedAt: Date.now(),
      };
    case getType(logoutAuth):
      return initialState;
    default:
      return state;
  }
};
