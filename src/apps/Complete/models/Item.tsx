import {createSelector} from 'reselect';
import {RootAction, RootState} from 'root-types';
import {createAction, getType} from 'typesafe-actions';
import {getUser, removeUser} from './User';

type ItemUpdateIds = {parentItemId: string; itemId: string};
type ItemDetailsIds = {parentItemId: string | null; itemId: string};
type ItemProjectIds = {projectItemId: string};
type ItemNav = {
  parentItemId: string | null;
  itemId: string | null;
  projectItemId: string | null;
};

/* ACTIONS */
export const createItem = createAction('complete/item/create')<Item>();
export const updateItem = createAction('complete/item/update')<Item>();
export const removeItem = createAction('complete/item/remove')<string>();
export const updateItemAddItem = createAction(
  'complete/item/addItem',
)<ItemUpdateIds>();
export const setNavItemProject = createAction(
  'complete/item/setNavItemProject',
)<ItemProjectIds>();
export const setNavItemDetail = createAction(
  'complete/item/setNavItemDetail',
)<ItemDetailsIds>();
export const updateItemRemoveItem = createAction(
  'complete/item/removeItem',
)<ItemUpdateIds>();
export const completeItemActions = {
  createItem,
  removeItem,
  updateItem,
  setNavItemProject,
  setNavItemDetail,
  updateItemAddItem,
  updateItemRemoveItem,
};

/* SELECTORS */
export const getItems = (state: RootState): Items => state.completeItem.items;
export const getActiveItemOrderByCreatedAt = createSelector(
  [getItems],
  (items) =>
    Object.values(items)
      .filter((item) => item.active)
      .sort((a, b) => a.createdAt - b.createdAt),
);

export const getInbox = createSelector(
  [getItems, getUser],
  (items, user) => user?.items.filter((id) => items[id].title === 'Inbox')[0],
);

export const getProjects = createSelector(
  [getItems, getUser],
  (items, user) =>
    user?.items.filter((id) => items[id].title === 'Projects')[0],
);

/* INTERFACES */
export type CompleteItemReducer = {
  nav: ItemNav;
  items: Items;
};

export type Item = {
  id: string;
  title: string;
  description: string;
  active: boolean;
  createdAt: number;
  updatedAt: number;
  userId: string;
  tags: ReadonlyArray<string>;
  type: 'board' | 'list' | 'note';
  editable: boolean;
  children: ReadonlyArray<string>;
};
export type Items = {[key: string]: Item};

/* REDUCER */
const initialState: CompleteItemReducer = {
  nav: {projectItemId: null, parentItemId: null, itemId: null},
  items: {},
};
export const completeItemReducer = (
  state: CompleteItemReducer = initialState,
  action: RootAction,
): CompleteItemReducer => {
  switch (action.type) {
    case getType(setNavItemProject):
    case getType(setNavItemDetail):
      return {
        ...state,
        nav: {
          ...state.nav,
          ...action.payload,
        },
      };
    case getType(createItem):
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: action.payload,
        },
      };
    case getType(updateItem):
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
    case getType(updateItemAddItem):
      const addParent = state.items[action.payload.parentItemId];
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.parentItemId]: {
            ...addParent,
            children: [...addParent.children, action.payload.itemId],
            updatedAt: Date.now(),
          },
        },
      };
    case getType(updateItemRemoveItem):
      const deleteParent = state.items[action.payload.parentItemId];
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.parentItemId]: {
            ...deleteParent,
            children: deleteParent.children.filter(
              (itemId) => itemId !== action.payload.itemId,
            ),
            updatedAt: Date.now(),
          },
        },
      };
    case getType(removeItem):
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
