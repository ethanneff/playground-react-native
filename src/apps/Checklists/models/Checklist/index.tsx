import {createSelector} from 'reselect';
import {RootAction, RootState} from 'root-types';
import {createAction, getType} from 'typesafe-actions';

/* ACTIONS */
export const createList = createAction('checklist/create')<Checklist>();
export const updateList = createAction('checklist/update')<Checklist>();
export const removeList = createAction('checklist/remove')<string>();
export const setActiveList = createAction('checklist/setActive')<string>();
export const checklistActions = {
  createList,
  removeList,
  updateList,
  setActiveList,
};

/* SELECTORS */
export const getChecklists = (state: RootState): Checklists =>
  state.checklist.items;
export const getCurrentChecklist = (state: RootState): Checklist => {
  const active = state.checklist.active;
  if (!active) {
    throw new Error('missing current checklist');
  }
  return state.checklist.items[active];
};
export const getActiveChecklistOrderByCreatedAt = createSelector(
  [getChecklists],
  (checklists) =>
    Object.values(checklists)
      .filter((item) => item.active)
      .sort((a, b) => a.createdAt - b.createdAt),
);

/* INTERFACES */
export type ChecklistReducer = {
  active: string | undefined;
  items: Checklists;
};
export type Checklist = {
  id: string;
  name: string;
  description?: string;
  active: boolean;
  // frequency: string[];
  // visibility: UserId[];
  createdAt: number;
  updatedAt: number;
  userId: string;
  // item: string[]; // TODO: move into other reducers
  // history: string[];
  // viewed: string[];
  // liked: UserId[];
  // copied: UserId[];
  // modified: string[];
};
export type Checklists = {[key: string]: Checklist};

/* REDUCER */
const initialState: ChecklistReducer = {
  active: undefined,
  items: {},
};
export const checklistReducer = (
  state: ChecklistReducer = initialState,
  action: RootAction,
): ChecklistReducer => {
  switch (action.type) {
    case getType(setActiveList):
      return {...state, active: action.payload};
    case getType(createList):
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: action.payload,
        },
      };
    case getType(updateList):
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
    case getType(removeList):
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
    default:
      return state;
  }
};
