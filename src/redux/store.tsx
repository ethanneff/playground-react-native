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
  checklistsAuthActions,
  checklistsAuthReducer,
  checklistsUsersActions,
  checklistsUsersReducer,
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
  chatMessageActions,
  chatMessageReducer,
} from '../apps/Playground/Features/Chat/Messages';
import {
  bejeweledActions,
  bejeweledReducer,
} from '../apps/Playground/Games/Bejeweled/redux';
import {
  gameOfLifeActions,
  gameOfLifeReducer,
} from '../apps/Playground/Games/GameOfLife/redux';
import {
  wordleActions,
  wordleReducer,
} from '../apps/Playground/Games/Wordle/redux';
import {
  calendarActions,
  calendarReducer,
} from '../components/Calendar/calendarReducer';

export const actions = {
  auth: authActions,
  calendar: calendarActions,
  chatMessage: chatMessageActions,
  checklists: {
    ...checklistsAuthActions,
    ...checklistsUsersActions,
  },
  complete: {
    auth: completeAuthActions,
    item: completeItemActions,
    user: completeUserActions,
  },
  device: deviceActions,
  focus: {
    ...focusAuthActions,
    ...focusUsersActions,
    ...focusGoalsActions,
    ...focusPreferencesActions,
    ...focusIntervalsActions,
  },
  games: {
    bejeweled: bejeweledActions,
    life: gameOfLifeActions,
    wordle: wordleActions,
  },
  network: networkActions,
  theme: themeActions,
};

export const reducers = combineReducers({
  auth: authReducer,
  calendar: calendarReducer,
  chatMessage: chatMessageReducer,
  checklists: combineReducers({
    auth: checklistsAuthReducer,
    users: checklistsUsersReducer,
  }),
  complete: combineReducers({
    auth: completeAuthReducer,
    item: completeItemReducer,
    user: completeUserReducer,
  }),
  device: deviceReducer,
  focus: combineReducers({
    auth: focusAuthReducer,
    goals: focusGoalsReducer,
    intervals: focusIntervalsReducer,
    preferences: focusPreferencesReducer,
    users: focusUsersReducer,
  }),
  games: combineReducers({
    bejeweled: bejeweledReducer,
    life: gameOfLifeReducer,
    wordle: wordleReducer,
  }),
  history: historyReducer,
  network: networkReducer,
  theme: themeReducer,
});
