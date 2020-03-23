import { createSelector } from 'reselect';
import {
  ActionType,
  createAction,
  createCustomAction,
  getType,
} from 'typesafe-actions';
import 'react-native-get-random-values';
import { v4 } from 'uuid';
import { RootAction, RootState } from '../../../../../containers';
import { logout } from '../../../../../models/Auth';

/* ACTIONS */
export const createQuestionnaire = createCustomAction(
  'questionnaires/CREATE',
  (payload: string) => ({
    payload: {
      id: v4(),
      questions: [],
      title: payload,
    },
  })
);
export const updateQuestionnaire = createAction('questionnaires/UPDATE')<
  Questionnaire
>();
export const removeQuestionnaire = createAction('questionnaires/REMOVE')<
  string
>();
export const selectQuestionnaire = createAction('questionnaires/SELECT')<
  string
>();

/* SELECTORS */
export const getQuestionnaires = (state: RootState): QuestionnairesObject =>
  state.questionnaires.items;
export const getQuestionnaireArray = createSelector(
  [getQuestionnaires],
  (questionnaires) => Object.values(questionnaires).filter((item) => item)
);

/* INTERFACES */
export interface Questionnaire {
  acronym?: string;
  formula?: string;
  id: string;
  questions: readonly string[];
  title: string;
}
interface QuestionnairesObject {
  [id: string]: Questionnaire;
}
export interface Questionnaires {
  items: QuestionnairesObject;
  selected: string | undefined;
}
export type QuestionnairesActions = ActionType<
  | typeof createQuestionnaire
  | typeof updateQuestionnaire
  | typeof removeQuestionnaire
  | typeof selectQuestionnaire
>;

/* REDUCERS */
export const questionnairesInitialState: Questionnaires = {
  items: {
    '1': {
      id: '1',
      questions: ['1', '2', '3', '4', '5'],
      title: 'example',
    },
    '2': {
      acronym: 'CSAT',
      formula:
        '(Number of satisfied and very satisfied customers) / (Number of respondents) x 100',
      id: '2',
      questions: ['6'],
      title: 'Customer Satisfaction',
    },
    '3': {
      acronym: 'NPS',
      formula:
        '(Number of promoters (9-10) – number of detractors(0-6)) ÷ (number of respondents) x 100',
      id: '3',
      questions: ['17', '18'],
      title: 'Net Promoter Score',
    },
    '4': {
      acronym: 'SUS',
      formula:
        'For odd items: subtract one from the user response. For even-numbered items: subtract the user responses from 5 This scales all values from 0 to 4 (with four being the most positive response). Add up the converted responses for each user and multiply that total by 2.5. This converts the range of possible values from 0 to 100 instead of from 0 to 40. Good is above 68.',
      id: '4',
      questions: ['7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
      title: 'System Usability Scale',
    },
  },
  selected: undefined,
};

export const questionnairesReducer = (
  state: Questionnaires = questionnairesInitialState,
  action: RootAction
): Questionnaires => {
  switch (action.type) {
    case getType(createQuestionnaire):
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: action.payload,
        },
      };
    case getType(updateQuestionnaire):
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: action.payload,
        },
      };
    case getType(removeQuestionnaire):
      return {
        ...state,
        items: Object.keys(state.items).reduce(
          (acc, key) =>
            key !== action.payload ? { ...acc, [key]: state.items[key] } : acc,
          {}
        ),
        selected:
          state.selected !== action.payload ? state.selected : undefined,
      };
    case getType(selectQuestionnaire):
      return {
        ...state,
        selected:
          state.selected !== action.payload ? action.payload : undefined,
      };
    case getType(logout):
      return questionnairesInitialState;
    default:
      return state;
  }
};
