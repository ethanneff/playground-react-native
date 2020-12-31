import {createSelector} from 'reselect';
import {RootAction, RootState} from 'root-types';
import {createAction, getType} from 'typesafe-actions';
import {getBoards, getCategoryBoardId, getInboxBoardId} from './Board';
import {removeUser} from './User';

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
export const updateListRemoveItem = createAction('complete/list/removeItem')<{
  listId: string;
  itemId: string;
}>();

export const completeListActions = {
  createList,
  removeList,
  updateList,
  setActiveList,
  updateListTitle,
  updateListAddItem,
  updateListRemoveItem,
};

/* SELECTORS */
export const getLists = (state: RootState): Lists => state.completeList.items;
export const getInboxListId = createSelector(
  [getInboxBoardId, getBoards],
  (boardId, boards) => {
    const listIds = boards[boardId].lists[0];
    if (!listIds) throw new Error('missing inbox list');

    return listIds;
  },
);

export const getCategoryListIds = createSelector(
  [getCategoryBoardId, getBoards],
  (boardId, boards) => {
    const listIds = boards[boardId].lists;
    if (!listIds) throw new Error('missing category lists');

    return listIds;
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
      const list = state.items[action.payload.listId];
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.listId]: {
            ...list,
            items: [...list.items, action.payload.itemId],
            updatedAt: Date.now(),
          },
        },
      };
    case getType(updateListRemoveItem):
      const deleteList = state.items[action.payload.listId];
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.listId]: {
            ...deleteList,
            items: deleteList.items.filter(
              (itemId) => itemId !== action.payload.itemId,
            ),
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
