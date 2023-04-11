import { combineReducers } from 'redux';
import {
  authReducer,
  deviceReducer,
  historyReducer,
  networkReducer,
  themeReducer,
} from '.';
import {
  checklistItemReducer,
  checklistReducer,
} from '../apps/Checklists/models';
import {
  completeAuthReducer,
  completeItemReducer,
  completeUserReducer,
} from '../apps/Complete/models';
import {
  focusAuthReducer,
  focusGoalsReducer,
  focusIntervalsReducer,
  focusPreferencesReducer,
  focusUsersReducer,
} from '../apps/Focus/data';
import {
  choicesReducer,
  questionnairesReducer,
  questionsReducer,
  responsesReducer,
} from '../apps/Playground/Creations/Questionnaire/models';
import { chatMessageReducer } from '../apps/Playground/Features/Chat/Messages';
import { gameOfLifeReducer } from '../apps/Playground/Games/GameOfLife/redux';
import { calendarReducer } from '../components/Calendar/calendarReducer';

export const reducers = combineReducers({
  auth: authReducer,
  calendar: calendarReducer,
  chatMessage: chatMessageReducer,
  checklist: checklistReducer,
  checklistItem: checklistItemReducer,
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
