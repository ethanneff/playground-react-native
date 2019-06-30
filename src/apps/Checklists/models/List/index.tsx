import { createSelector } from "reselect";
import { ActionType, createStandardAction } from "typesafe-actions";
import { DeepReadonly } from "utility-types";
import { RootAction, RootState } from "../../../../containers";

/* INTERFACES */
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

/* ACTIONS */
export const createList = createStandardAction("LIST/CREATE")<CreateList>();
export const updateList = createStandardAction("LIST/UPDATE")<UpdateList>();
export const removeList = createStandardAction("LIST/REMOVE")<string>();
export const toggleActiveList = createStandardAction("LIST/TOGGLE_ACTIVE")<
  string
>();

/* INDEXES */
export const indexListsByCreatedAt = (rows: Lists) =>
  Object.values(rows).reduce(
    (index: any, row) => ((index[row.createdAt] = row.id), index),
    {}
  );
export const indexListsByUserId = (rows: Lists) =>
  Object.values(rows).reduce(
    (index: any, row) => (
      (index[row.userId] = row.hasOwnProperty("userId")
        ? [...index[row.userId], row.id]
        : [row.id]),
      index
    ),
    {}
  );

/* SELECTORS */
export const selectLists = (state: RootState): Lists => state.lists;
export const selectListsFilterByActive = createSelector(
  [selectLists],
  items => Object.values(items).filter(item => item.active)
);
export const selectListsByCreatedAt = createSelector(
  [selectLists],
  items => Object.values(items).sort((a, b) => a.createdAt - b.createdAt)
);

/* REDUCER */
export const listReducer = (state: Lists = {}, action: RootAction): Lists => {
  switch (action.type) {
    default:
      return state;
  }
};
