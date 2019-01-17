import { createSelector } from "reselect";
import { ActionType, createStandardAction } from "typesafe-actions";
import { DeepReadonly } from "utility-types";
import { RootAction, RootState } from "../../../../models";

// Interfaces
export type List = DeepReadonly<{
  id: string;
  name: string;
  description?: string;
  active: boolean;
  frequency: string[];
  visibility: string[];
  createdAt: number;
  updatedAt: number;
  userId: string;
  item: string[];
  history: string[];
  viewed: string[];
  liked: string[];
  copied: string[];
  modified: string[];
}>;
export type Lists = DeepReadonly<{ [key: string]: List }>;
export type ListActions = ActionType<
  | typeof createList
  | typeof removeList
  | typeof updateList
  | typeof toggleActiveList
>;
interface CreateList {
  name: string;
  description?: string;
  active?: boolean;
}
type UpdateList = CreateList & { id: string };

// Actions
export const createList = createStandardAction("LIST/CREATE")<CreateList>();
export const updateList = createStandardAction("LIST/UPDATE")<UpdateList>();
export const removeList = createStandardAction("LIST/REMOVE")<string>();
export const toggleActiveList = createStandardAction("LIST/TOGGLE_ACTIVE")<
  string
>();

// Indexes
export const indexByCreatedAt = (rows: Lists) =>
  Object.values(rows).reduce(
    (index: any, row) => ((index[row.createdAt] = row.id), index),
    {}
  );
export const indexByUserId = (rows: Lists) =>
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
export const selectItems = (state: RootState): Lists => state.lists;
export const selectItemsFilterByActive = createSelector(
  [selectItems],
  items => Object.values(items).filter(item => item.active)
);
export const selectItemsByCreatedAt = createSelector(
  [selectItems],
  items => Object.values(items).sort((a, b) => a.createdAt - b.createdAt)
);

// Reducer
export const listReducer = (state: Lists = {}, action: RootAction): Lists => {
  switch (action.type) {
    default:
      return state;
  }
};
