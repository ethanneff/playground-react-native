import { RootAction } from 'root-types';
import { createAction, getType } from 'typesafe-actions';
import { Goal } from '../types';
import { logoutAuth } from './Auth';

/* INTERFACES */
type FocusGoalsReducer = { items: Array<Goal>; updatedAt: number };

/* ACTIONS */
export const loadGoals = createAction('focus/goals/load')<Array<Goal>>();
export const focusGoalsActions = { loadGoals };

/* REDUCER */
const initialState: FocusGoalsReducer = {
  items: [],
  updatedAt: 0,
};

export const focusGoalsReducer = (
  state: FocusGoalsReducer = initialState,
  action: RootAction,
): FocusGoalsReducer => {
  switch (action.type) {
    case getType(loadGoals):
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
