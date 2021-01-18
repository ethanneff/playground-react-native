import {createSelector} from 'reselect';
import {RootAction, RootState} from 'root-types';
import {createAction, getType} from 'typesafe-actions';
import {getUser, removeUser} from './User';

type ItemUpdateIds = {parentItemId: string; itemId: string};
type ItemSwapId = {parentItemId: string; i: number; j: number};
type ItemMoveId = {
  itemId: string;
  fromParentItemId: string;
  toParentItemId: string;
};
type ItemDetailsIds = {parentItemId: string | null; itemId: string};
type ItemProjectIds = {projectItemId: string};
type ItemNav = {
  parentItemId: string | null;
  itemId: string | null;
  projectItemId: string | null;
};

/* ACTIONS */
export const createItem = createAction('complete/item/createItem')<Item>();
export const updateItem = createAction('complete/item/updateItem')<Item>();
export const removeItem = createAction('complete/item/removeItem')<string>();
export const addItemToItem = createAction(
  'complete/item/addItemToItem',
)<ItemUpdateIds>();
export const navItemProject = createAction(
  'complete/item/navItemProject',
)<ItemProjectIds>();
export const navItemDetails = createAction(
  'complete/item/navItemDetails',
)<ItemDetailsIds>();
export const removeItemFromItem = createAction(
  'complete/item/removeItemFromItem',
)<ItemUpdateIds>();
export const swapItemOrderInItem = createAction(
  'complete/item/swapItemOrderInItem',
)<ItemSwapId>();
export const moveItemToItem = createAction(
  'complete/item/moveItemToItem',
)<ItemMoveId>();
export const completeItemActions = {
  createItem,
  removeItem,
  updateItem,
  navItemProject,
  navItemDetails,
  addItemToItem,
  removeItemFromItem,
  swapItemOrderInItem,
  moveItemToItem,
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
    case getType(navItemProject):
    case getType(navItemDetails):
      return {
        ...state,
        nav: {
          ...state.nav,
          ...action.payload,
        },
      };
    case getType(swapItemOrderInItem):
      const swapParent = state.items[action.payload.parentItemId];
      const children = [...swapParent.children];
      const temp = children[action.payload.i];
      children[action.payload.i] = children[action.payload.j];
      children[action.payload.j] = temp;
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.parentItemId]: {
            ...swapParent,
            children,
            updatedAt: Date.now(),
          },
        },
      };
    case getType(moveItemToItem): //TODO: test this
      const moveToParent = state.items[action.payload.toParentItemId];
      const moveFromParent = state.items[action.payload.fromParentItemId];
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.fromParentItemId]: {
            ...moveFromParent,
            children: moveFromParent.children.filter(
              (id) => id !== action.payload.itemId,
            ),
            updatedAt: Date.now(),
          },
          [action.payload.toParentItemId]: {
            ...moveToParent,
            children: [action.payload.itemId, ...moveFromParent.children],
            updatedAt: Date.now(),
          },
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
    case getType(addItemToItem):
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
    case getType(removeItemFromItem):
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
