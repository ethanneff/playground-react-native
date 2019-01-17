import { createSelector } from "reselect";
import { ActionType, createStandardAction, getType } from "typesafe-actions";
import { DeepReadonly } from "utility-types";
import uuid from "uuid/v4";
import { RootAction, RootState } from "../../../../models";

// Interfaces
export type Item = DeepReadonly<{
  id: string;
  name: string;
  description?: string;
  active: boolean;
  userId: string;
  sources?: string[];
  order?: number;
  createdAt: number;
  updatedAt: number;
}>;
export type Items = DeepReadonly<{ [key: string]: Item }>;
export type ItemsArray = DeepReadonly<Item[]>;
export type ItemActions = ActionType<
  | typeof createItem
  | typeof removeItem
  | typeof updateItem
  | typeof toggleActiveItem
>;
interface CreateItem {
  name: string;
  description?: string;
  active?: boolean;
}
type UpdateItem = CreateItem & { id: string };

// Actions
export const createItem = createStandardAction("ITEM/CREATE")<CreateItem>();
export const updateItem = createStandardAction("ITEM/UPDATE")<UpdateItem>();
export const removeItem = createStandardAction("ITEM/REMOVE")<string>();
export const toggleActiveItem = createStandardAction("ITEM/TOGGLE_ACTIVE")<
  string
>();

// Indexes
export const indexByCreatedAt = (rows: Items) =>
  Object.values(rows).reduce(
    (index: any, row) => ((index[row.createdAt] = row.id), index),
    {}
  );
export const indexByUserId = (rows: Items) =>
  Object.values(rows).reduce(
    (index: any, row) => (
      (index[row.userId] = row.hasOwnProperty("userId")
        ? [...index[row.userId], row.id]
        : [row.id]),
      index
    ),
    {}
  );

// Selectors
export const selectItems = (state: RootState): Items => state.items;
export const selectItemsFilterByActive = createSelector(
  [selectItems],
  items => Object.values(items).filter(item => item.active)
);
export const selectItemsByCreatedAt = createSelector(
  [selectItems],
  items => Object.values(items).sort((a, b) => a.createdAt - b.createdAt)
);

// Reducer
export const itemReducer = (state: Items = {}, action: RootAction): Items => {
  switch (action.type) {
    case getType(createItem):
      const id = uuid();
      const timestamp = Date.now();
      return {
        ...state,
        [id]: {
          ...action.payload,
          id,
          userId: "1",
          active: true,
          order: timestamp,
          updatedAt: timestamp,
          createdAt: timestamp
        }
      };
    case getType(updateItem):
      if (!state[action.payload.id]) {
        throw new Error("no item to update");
      }
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
          updatedAt: Date.now()
        }
      };
    case getType(removeItem):
      if (!state[action.payload]) {
        throw new Error("no item to remove");
      }
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          active: false,
          updatedAt: Date.now()
        }
      };
    case getType(toggleActiveItem):
      if (!state[action.payload]) {
        throw new Error("no item to remove");
      }
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          active: !state[action.payload].active,
          updatedAt: Date.now()
        }
      };
    default:
      return state;
  }
};
