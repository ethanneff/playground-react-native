import {createSelector} from 'reselect';
import {ActionType, createAction, getType} from 'typesafe-actions';
import {RootAction, RootState} from '../../../../providers';
import {getCurrentChecklist} from '../Checklist';

/* ACTIONS */
export const createChecklistItem = createAction(
  'checklistItem/create',
)<ChecklistItem>();
export const updateChecklistItem = createAction(
  'checklistItem/update',
)<ChecklistItem>();
export const removeChecklistItem = createAction(
  'checklistItem/remove',
)<string>();
export const toggleChecklistItemComplete = createAction(
  'checklistItem/toggleComplete',
)<string>();
export const setActiveChecklistItem = createAction(
  'checklistItem/setActive',
)<string>();

/* SELECTORS */
export const getChecklistItems = (state: RootState): ChecklistItems =>
  state.checklistItems.items;
export const getCurrentChecklistItem = (state: RootState): ChecklistItem => {
  const active = state.checklistItems.active;
  if (!active) {
    throw new Error('missing current checklist item');
  }
  return state.checklistItems.items[active];
};
export const getCurrentActiveChecklistItemsOrderByCreatedAt = createSelector(
  [getCurrentChecklist, getChecklistItems],
  (checklist, items) =>
    Object.values(items)
      .filter((item) => item.checklistId === checklist.id && item.active)
      .sort((a, b) => a.createdAt - b.createdAt),
);

/* INTERFACES */
export type ChecklistItemReducer = {
  active: string | undefined;
  items: ChecklistItems;
};
export type ChecklistItem = {
  id: string;
  name: string;
  checklistId: string;
  description?: string;
  completed: boolean;
  active: boolean;
  userId: string;
  // sources?: string[]; // TODO: move into other reducer
  order?: number;
  createdAt: number;
  updatedAt: number;
};
export type ChecklistItems = {[key: string]: ChecklistItem};
export type ItemActions = ActionType<
  | typeof createChecklistItem
  | typeof removeChecklistItem
  | typeof updateChecklistItem
  | typeof setActiveChecklistItem
  | typeof toggleChecklistItemComplete
>;

/* REDUCER */
const initialState: ChecklistItemReducer = {
  active: undefined,
  items: {},
};
export const checklistItemReducer = (
  state: ChecklistItemReducer = initialState,
  action: RootAction,
): ChecklistItemReducer => {
  switch (action.type) {
    case getType(setActiveChecklistItem):
      return {...state, active: action.payload};
    case getType(createChecklistItem):
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: action.payload,
        },
      };
    case getType(updateChecklistItem):
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
    case getType(removeChecklistItem):
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
    case getType(toggleChecklistItemComplete):
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            ...state.items[action.payload],
            completed: !state.items[action.payload].completed,
            updatedAt: Date.now(),
          },
        },
      };
    default:
      return state;
  }
};
