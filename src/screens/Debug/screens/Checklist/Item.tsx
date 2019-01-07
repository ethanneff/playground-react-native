import { ActionType, createStandardAction, getType } from "typesafe-actions";
import { DeepReadonly } from "utility-types";
import uuid from "uuid/v4";
import { RootState } from "../../../../models";

// Interfaces
type Item = DeepReadonly<{
  id: string;
  name: string;
  description?: string;
  active: boolean;
  sources?: string[];
  createdAt: number;
  updatedAt: number;
}>;
export type Items = DeepReadonly<{ [key: string]: Item }>;
type ItemAction = ActionType<
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

// Selectors
export const selectItem = (state: RootState, id: string) => state.items[id];

// Reducer
export const ItemReducer = (state: Items = {}, action: ItemAction): Items => {
  switch (action.type) {
    case getType(createItem):
      const id = uuid();
      return {
        ...state,
        [id]: {
          ...action.payload,
          id,
          active: true,
          updatedAt: Date.now(),
          createdAt: Date.now()
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
