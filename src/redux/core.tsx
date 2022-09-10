import React, { memo, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import thunk from 'redux-thunk';
import {
  authActions,
  authReducer,
  deviceActions,
  deviceReducer,
  dimensionActions,
  dimensionReducer,
  networkActions,
  networkReducer,
  themeActions,
  themeReducer,
} from '.';
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
import { addFlipperMiddleware, Storage } from '../conversions';

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
  network: networkReducer,
  questionnaires: questionnairesReducer,
  questions: questionsReducer,
  responses: responsesReducer,
  theme: themeReducer,
});

const blacklist = ['gameOfLife'];
const persistConfig = { blacklist, key: 'root', storage: Storage };
const middlewares = [thunk];
addFlipperMiddleware(middlewares);
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares),
);
const persistor = persistStore(store);

type Props = {
  children: ReactNode;
};
export const ReduxProvider = memo(function ReduxProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
});
