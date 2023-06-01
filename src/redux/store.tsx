import { combineReducers } from 'redux';
import {
  authActions,
  authReducer,
  deviceActions,
  deviceReducer,
  historyReducer,
  networkActions,
  networkReducer,
  themeActions,
  themeReducer,
} from '.';
import {
  checklistAuthActions,
  checklistAuthReducer,
  checklistUserActions,
  checklistUserReducer,
} from '../apps/Checklists/data';
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
  calendarActions,
  calendarReducer,
} from '../components/Calendar/calendarReducer';

export const actions = {
  auth: authActions,
  calendar: calendarActions,
  chatMessage: chatMessageActions,
  checklist: {
    ...checklistAuthActions,
    ...checklistUserActions,
  },
  choices: choicesActions,
  completeAuth: completeAuthActions,
  completeItem: completeItemActions,
  completeUser: completeUserActions,
  device: deviceActions,
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
  calendar: calendarReducer,
  chatMessage: chatMessageReducer,
  checklist: combineReducers({
    auth: checklistAuthReducer,
    user: checklistUserReducer,
  }),
  choices: choicesReducer,
  completeAuth: completeAuthReducer,
  completeItem: completeItemReducer,
  completeUser: completeUserReducer,
  device: deviceReducer,
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
