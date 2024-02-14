import { type RootAction } from 'root-types';
import { type DeepReadonly } from 'ts-essentials';
import { createAction, getType } from 'typesafe-actions';
import { type Goal } from '../types';
import { logoutAuth } from './Auth';

/* INTERFACES */
type FocusGoalsReducer = DeepReadonly<{
  items: Goal[];
  updatedAt: number;
}>;

/* ACTIONS */
export const loadGoals = createAction('focus/goals/load')<Goal[]>();
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
    case getType(loadGoals): {
      return {
        ...state,
        items: action.payload,
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
