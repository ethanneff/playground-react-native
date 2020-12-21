import {createSelector} from 'reselect';
import {ActionType, createAction, getType} from 'typesafe-actions';
import {RootAction, RootState} from '../../../providers';
import {getItems} from './Item';
import {getUser, removeUser} from './User';

/* ACTIONS */
export const createList = createAction('complete/list/create')<List>();
export const updateList = createAction('complete/list/update')<List>();
export const updateListTitle = createAction('complete/list/updateTitle')<{
  listId: string;
  title: string;
}>();
export const removeList = createAction('complete/list/remove')<string>();
export const setActiveList = createAction('complete/list/setActive')<string>();
export const updateListAddItem = createAction('complete/list/addItem')<{
  listId: string;
  itemId: string;
}>();

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

export const getInbox = createSelector(
  [getLists, getUser, getItems],
  (lists, user, items) => {
    const inboxId = user?.inbox;
    if (!inboxId) {
      return;
      throw new Error('missing user inbox');
    }
    const inboxList = lists[inboxId];
    const inboxItems = inboxList.items.map((item) => items[item]);
    return {...inboxList, items: [...inboxItems]};
  },
);

/* INTERFACES */
export type CompleteListReducer = {
  active: string | undefined;
  items: Lists;
};
export type List = {
  id: string;
  title: string;
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
  | typeof updateListTitle
  | typeof updateListAddItem
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
    case getType(updateListTitle):
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.listId]: {
            ...state.items[action.payload.listId],
            title: action.payload.title,
            updatedAt: Date.now(),
          },
        },
      };
    case getType(updateListAddItem):
      const item = state.items[action.payload.listId];
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.listId]: {
            ...item,
            items: [...item.items, action.payload.itemId],
            updatedAt: Date.now(),
          },
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
    case getType(removeUser):
      return initialState;
    default:
      return state;
  }
};
