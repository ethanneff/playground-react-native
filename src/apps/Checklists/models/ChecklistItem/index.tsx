import { createSelector } from 'reselect';
import { RootAction, RootState } from 'root-types';
import { createAction, getType } from 'typesafe-actions';
import { getCurrentChecklist } from '../Checklist';

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

export const checklistItemActions = {
  createChecklistItem,
  removeChecklistItem,
  updateChecklistItem,
  setActiveChecklistItem,
  toggleChecklistItemComplete,
};

/* SELECTORS */
export const getChecklistItems = (state: RootState): ChecklistItems =>
  state.checklistItem.items;
export const getCurrentChecklistItem = (state: RootState): ChecklistItem => {
  const { active } = state.checklistItem;
  if (!active) throw new Error('missing current checklist item');

  return state.checklistItem.items[active];
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
  active: boolean;
  checklistId: string;
  completed: boolean;
  createdAt: number;
  description?: string;
  id: string;
  name: string;
  // sources?: string[]; // TODO: move into other reducer
  order?: number;
  updatedAt: number;
  userId: string;
};
export type ChecklistItems = { [key: string]: ChecklistItem };

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
      return { ...state, active: action.payload };
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
