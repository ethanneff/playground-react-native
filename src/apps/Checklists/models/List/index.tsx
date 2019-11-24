import { createSelector } from "reselect";
import { ActionType, createAction } from "typesafe-actions";
import { DeepReadonly } from "utility-types";
import { RootAction, RootState } from "../../../../containers";

/* ACTIONS */
export const createList = createAction("LIST/CREATE")<CreateList>();
export const updateList = createAction("LIST/UPDATE")<UpdateList>();
export const removeList = createAction("LIST/REMOVE")<string>();
export const toggleActiveList = createAction("LIST/TOGGLE_ACTIVE")<string>();

/* INDEXES */
export const indexListsByCreatedAt = (rows: Lists) =>
  Object.values(rows).reduce((index: any, row) => {
    index[row.createdAt] = row.id;
    return index;
  }, {});
export const indexListsByUserId = (rows: Lists) =>
  Object.values(rows).reduce((index: any, row) => {
    index[row.userId] = row.userId ? [...index[row.userId], row.id] : [row.id];
    return index;
  }, {});

/* SELECTORS */
export const getLists = (state: RootState): Lists => state.lists;
export const getListsFilterByActive = createSelector([getLists], items =>
  Object.values(items).filter(item => item.active)
);
export const getListsByCreatedAt = createSelector([getLists], items =>
  Object.values(items).sort((a, b) => a.createdAt - b.createdAt)
);

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

/* REDUCER */
export const listReducer = (state: Lists = {}, action: RootAction): Lists => {
  switch (action.type) {
    default:
      return state;
  }
};
