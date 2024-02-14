import { createSelector } from 'reselect';
import { type RootAction, type RootState } from 'root-types';
import { type DeepReadonly } from 'ts-essentials';
import { createAction, getType } from 'typesafe-actions';
import { logout } from './Auth';
import { getUser } from './User';

/* INTERFACES */
export type Item = DeepReadonly<{
  active: boolean;
  children: string[];
  createdAt: number;
  description: string;
  editable: boolean;
  id: string;
  tags: string[];
  title: string;
  type: 'board' | 'list' | 'note';
  updatedAt: number;
  userId: string;
}>;
type Items = Record<string, Item>;
type ItemUpdateIds = {
  itemId: string;
  parentItemId: string;
};
type ItemSwapId = {
  i: number;
  j: number;
  parentItemId: string;
};
type ItemMoveId = {
  fromParentItemId: string;
  itemId: string;
  toParentItemId: string;
};
type ItemDetailsIds = {
  itemId: string;
  parentItemId: string | null;
};
type ItemProjectIds = {
  projectItemId: string;
};
type ItemNav = {
  itemId: string | null;
  parentItemId: string | null;
  projectItemId: string | null;
};
type CompleteItemReducer = {
  items: Items;
  nav: ItemNav;
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
  addItemToItem,
  createItem,
  moveItemToItem,
  navItemDetails,
  navItemProject,
  removeItem,
  removeItemFromItem,
  swapItemOrderInItem,
  updateItem,
};

/* SELECTORS */
export const getItems = (state: RootState): Items => state.complete.item.items;
export const getActiveItemOrderByCreatedAt = createSelector(
  [getItems],
  (items) =>
    Object.values(items)
      .filter((item) => item.active)
      .sort((a, b) => a.createdAt - b.createdAt),
);

export const getInbox = createSelector([getItems, getUser], (items, user) =>
  user?.items.find((id) => items[id].title === 'Inbox'),
);

export const getProjects = createSelector([getItems, getUser], (items, user) =>
  user?.items.find((id) => items[id].title === 'Projects'),
);

/* REDUCER */
const initialState: CompleteItemReducer = {
  items: {},
  nav: { itemId: null, parentItemId: null, projectItemId: null },
};
export const completeItemReducer = (
  state: CompleteItemReducer = initialState,
  action: RootAction,
): CompleteItemReducer => {
  switch (action.type) {
    case getType(navItemProject):
    case getType(navItemDetails): {
      return {
        ...state,
        nav: {
          ...state.nav,
          ...action.payload,
        },
      };
    }
    case getType(swapItemOrderInItem): {
      const swapParent = state.items[action.payload.parentItemId];
      const children = [...swapParent.children];
      const temporary = children[action.payload.i];
      children[action.payload.i] = children[action.payload.j];
      children[action.payload.j] = temporary;
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
    }
    case getType(moveItemToItem): {
      // TODO: test this
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
    }
    case getType(createItem): {
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: action.payload,
        },
      };
    }
    case getType(updateItem): {
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
    }
    case getType(addItemToItem): {
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
    }
    case getType(removeItemFromItem): {
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
    }
    case getType(removeItem): {
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
    }
    case getType(logout): {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
