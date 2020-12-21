import {createSelector} from 'reselect';
import {ActionType, createAction, getType} from 'typesafe-actions';
import {RootAction, RootState} from '../../../providers';
import {removeUser} from './User';

/* ACTIONS */
export const createGroup = createAction('complete/group/create')<Group>();
export const updateGroup = createAction('complete/group/update')<Group>();
export const removeGroup = createAction('complete/group/remove')<string>();
export const setActiveGroup = createAction(
  'complete/group/setActive',
)<string>();

/* SELECTORS */
export const getGroups = (state: RootState): Groups =>
  state.completeGroup.items;
export const getCurrentGroup = (state: RootState): Group => {
  const active = state.completeGroup.active;
  if (!active) {
    throw new Error('missing current item');
  }
  return state.completeGroup.items[active];
};
export const getActiveGroupOrderByCreatedAt = createSelector(
  [getGroups],
  (items) =>
    Object.values(items)
      .filter((item) => item.active)
      .sort((a, b) => a.createdAt - b.createdAt),
);

/* INTERFACES */
export type CompleteGroupReducer = {
  active: string | undefined;
  items: Groups;
};
export type Group = {
  id: string;
  title: string;
  active: boolean;
  createdAt: number;
  updatedAt: number;
  boards: ReadonlyArray<string>;
};
export type Groups = {[key: string]: Group};
export type CompleteGroupActions = ActionType<
  | typeof createGroup
  | typeof removeGroup
  | typeof updateGroup
  | typeof setActiveGroup
>;

/* REDUCER */
const initialState: CompleteGroupReducer = {
  active: undefined,
  items: {},
};
export const completeGroupReducer = (
  state: CompleteGroupReducer = initialState,
  action: RootAction,
): CompleteGroupReducer => {
  switch (action.type) {
    case getType(setActiveGroup):
      return {...state, active: action.payload};
    case getType(createGroup):
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: action.payload,
        },
      };
    case getType(updateGroup):
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            ...state.items[action.payload.id],
            ...action.payload,
            updatedAt: Date.now(),
          },
        },
      };
    case getType(removeGroup):
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            ...state.items[action.payload],
            active: false,
            updatedAt: Date.now(),
          },
        },
      };
    case getType(removeUser):
      return initialState;
    default:
      return state;
  }
};
