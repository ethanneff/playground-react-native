import React, { memo, ReactNode } from 'react';
import { Provider } from 'react-redux';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Middleware,
} from 'redux';
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
  chatMessageActions,
  chatMessageReducer,
} from '../apps/Playground/Chat/Messages';
import {
  gameOfLifeActions,
  gameOfLifeReducer,
} from '../apps/Playground/GameOfLife/redux';
import {
  choicesActions,
  choicesReducer,
  questionnairesActions,
  questionnairesReducer,
  questionsActions,
  questionsReducer,
  responsesActions,
  responsesReducer,
} from '../apps/Playground/Questionnaire/models';
import { Storage } from '../conversions';
import { syncMiddleware, useSync } from './sync';

export const actions = {
  auth: authActions,
  choices: choicesActions,
  dimension: dimensionActions,
  device: deviceActions,
  checklistItem: checklistItemActions,
  checklist: checklistActions,
  chatMessage: chatMessageActions,
  network: networkActions,
  questionnaires: questionnairesActions,
  questions: questionsActions,
  responses: responsesActions,
  theme: themeActions,
  completeItem: completeItemActions,
  completeUser: completeUserActions,
  completeAuth: completeAuthActions,
  gameOfLife: gameOfLifeActions,
};

export const reducers = combineReducers({
  auth: authReducer,
  choices: choicesReducer,
  dimension: dimensionReducer,
  device: deviceReducer,
  checklistItem: checklistItemReducer,
  checklist: checklistReducer,
  chatMessage: chatMessageReducer,
  network: networkReducer,
  questionnaires: questionnairesReducer,
  questions: questionsReducer,
  responses: responsesReducer,
  theme: themeReducer,
  completeItem: completeItemReducer,
  completeUser: completeUserReducer,
  completeAuth: completeAuthReducer,
  gameOfLife: gameOfLifeReducer,
});

const blacklist = ['gameOfLife'];
const persistConfig = { key: 'root', storage: Storage, blacklist };
const middlewares = [thunk, syncMiddleware];
if (__DEV__ && !process.env.JEST_WORKER_ID) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares),
);
const persistor = persistStore(store);

type Props = { children: ReactNode };
export const ReduxProvider = memo(function ReduxProvider({ children }: Props) {
  useSync();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
});
