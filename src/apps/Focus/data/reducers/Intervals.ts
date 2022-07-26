import { RootAction } from 'root-types';
import { createAction, getType } from 'typesafe-actions';
import { Interval } from '../types';
import { logoutAuth } from './Auth';

/* INTERFACES */
type FocusIntervalsReducer = { items: Array<Interval>; updatedAt: number };

/* ACTIONS */
export const loadIntervals = createAction('focus/intervals/load')<
  Array<Interval>
>();
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
