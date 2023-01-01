import { combineReducers } from 'redux';
import {
  checklistActions,
  checklistItemActions,
  checklistItemReducer,
  checklistReducer,
} from '../apps/Checklists/models';
import {
  completeAuthActions,
  completeAuthReducer,
  completeItemActions,
  completeItemReducer,
  completeUserActions,
  completeUserReducer,
} from '../apps/Complete/models';
import {
  focusAuthActions,
  focusAuthReducer,
  focusGoalsActions,
  focusGoalsReducer,
  focusIntervalsActions,
  focusIntervalsReducer,
  focusPreferencesActions,
  focusPreferencesReducer,
  focusUsersActions,
  focusUsersReducer,
} from '../apps/Focus/data';
import {
  choicesActions,
  choicesReducer,
  questionnairesActions,
  questionnairesReducer,
  questionsActions,
  questionsReducer,
  responsesActions,
  responsesReducer,
} from '../apps/Playground/Creations/Questionnaire/models';
import {
  chatMessageActions,
  chatMessageReducer,
} from '../apps/Playground/Features/Chat/Messages';
import {
  gameOfLifeActions,
  gameOfLifeReducer,
} from '../apps/Playground/Games/GameOfLife/redux';
import {
  authActions,
  authReducer,
  deviceActions,
  deviceReducer,
  dimensionActions,
  dimensionReducer,
  historyReducer,
  networkActions,
  networkReducer,
  themeActions,
  themeReducer,
} from '.';

export const actions = {
  auth: authActions,
  chatMessage: chatMessageActions,
  checklist: checklistActions,
  checklistItem: checklistItemActions,
  choices: choicesActions,
  completeAuth: completeAuthActions,
  completeItem: completeItemActions,
  completeUser: completeUserActions,
  device: deviceActions,
  dimension: dimensionActions,
  focus: {
    ...focusAuthActions,
    ...focusUsersActions,
    ...focusGoalsActions,
    ...focusPreferencesActions,
    ...focusIntervalsActions,
  },
  gameOfLife: gameOfLifeActions,
  network: networkActions,
  questionnaires: questionnairesActions,
  questions: questionsActions,
  responses: responsesActions,
  theme: themeActions,
};

export const reducers = combineReducers({
  auth: authReducer,
  chatMessage: chatMessageReducer,
  checklist: checklistReducer,
  checklistItem: checklistItemReducer,
  choices: choicesReducer,
  completeAuth: completeAuthReducer,
  completeItem: completeItemReducer,
  completeUser: completeUserReducer,
  device: deviceReducer,
  dimension: dimensionReducer,
  focus: combineReducers({
    auth: focusAuthReducer,
    goals: focusGoalsReducer,
    intervals: focusIntervalsReducer,
    preferences: focusPreferencesReducer,
    users: focusUsersReducer,
  }),
  gameOfLife: gameOfLifeReducer,
  history: historyReducer,
  network: networkReducer,
  questionnaires: questionnairesReducer,
  questions: questionsReducer,
  responses: responsesReducer,
  theme: themeReducer,
});
