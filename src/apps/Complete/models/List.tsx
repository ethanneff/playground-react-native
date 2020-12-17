import {createSelector} from 'reselect';
import {ActionType, createAction, getType} from 'typesafe-actions';
import {RootAction, RootState} from '../../../providers';

/* ACTIONS */
export const createList = createAction('complete/list/create')<List>();
export const updateList = createAction('complete/list/update')<List>();
export const removeList = createAction('complete/list/remove')<string>();
export const setActiveList = createAction('complete/list/setActive')<string>();

/* SELECTORS */
export const getLists = (state: RootState): Lists => state.completeList.items;
export const getCurrentList = (state: RootState): List => {
  const active = state.completeList.active;
  if (!active) {
    throw new Error('missing current item');
  }
  return state.completeList.items[active];
};
export const getActiveListOrderByCreatedAt = createSelector(
  [getLists],
  (items) =>
    Object.values(items)
      .filter((item) => item.active)
      .sort((a, b) => a.createdAt - b.createdAt),
);

/* INTERFACES */
export type CompleteListReducer = {
  active: string | undefined;
  items: Lists;
};
export type List = {
  id: string;
  name: string;
  active: boolean;
  createdAt: number;
  updatedAt: number;
  items: ReadonlyArray<string>;
};
export type Lists = {[key: string]: List};
export type CompleteListActions = ActionType<
  | typeof createList
  | typeof removeList
  | typeof updateList
  | typeof setActiveList
>;

/* REDUCER */
const initialState: CompleteListReducer = {
  active: undefined,
  items: {},
};
export const completeListReducer = (
  state: CompleteListReducer = initialState,
  action: RootAction,
): CompleteListReducer => {
  switch (action.type) {
    case getType(setActiveList):
      return {...state, active: action.payload};
    case getType(createList):
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: action.payload,
        },
      };
    case getType(updateList):
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
    case getType(removeList):
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
    default:
      return state;
  }
};
