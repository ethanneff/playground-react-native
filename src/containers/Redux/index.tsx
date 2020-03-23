import React, { memo } from 'react';
import { persistReducer, persistStore } from 'redux-persist';
import {
  Middleware,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { DeepReadonly } from 'utility-types';
import {
  ItemActions,
  ListActions,
  ChecklistReducer,
  checklistItemReducer,
  checklistReducer,
  ChecklistItemReducer,
} from '../../apps/Checklists/models';
import {
  Choices,
  ChoicesActions,
  Questionnaires,
  QuestionnairesActions,
  Questions,
  QuestionsActions,
  Responses,
  ResponsesActions,
  choicesReducer,
  questionnairesReducer,
  questionsReducer,
  responsesReducer,
} from '../../apps/Debug/screens/Questionnaire/models';
import {
  AuthActions,
  AuthState,
  DeviceActions,
  DeviceState,
  Navigation,
  NavigationActions,
  Theme,
  ThemeActions,
  authReducer,
  deviceReducer,
  navigationReducer,
  themeReducer,
  NetworkActions,
  NetworkState,
  networkReducer,
  dimensionReducer,
  DimensionState,
  DimensionActions,
} from '../../models';
import { Storage } from '../../conversions';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import {
  ChatMessageReducer,
  chatMessageReducer,
  ChatMessageActions,
} from '../../apps/Debug/screens/Chat/Messages';

/* INTERFACES */
export type RootState = DeepReadonly<{
  auth: AuthState;
  dimension: DimensionState;
  device: DeviceState;
  checklistItems: ChecklistItemReducer; // TODO: figure out better naming without plural (e.g. checklists.items vs checklist.items)
  checklists: ChecklistReducer;
  chatMessage: ChatMessageReducer;
  navigation: Navigation;
  network: NetworkState;
  questions: Questions;
  choices: Choices;
  responses: Responses;
  questionnaires: Questionnaires;
  theme: Theme;
}>;

/* REDUCERS */
const reducers = combineReducers<RootState>({
  auth: authReducer,
  choices: choicesReducer,
  dimension: dimensionReducer,
  device: deviceReducer,
  checklistItems: checklistItemReducer,
  checklists: checklistReducer,
  chatMessage: chatMessageReducer,
  navigation: navigationReducer,
  network: networkReducer,
  questionnaires: questionnairesReducer,
  questions: questionsReducer,
  responses: responsesReducer,
  theme: themeReducer,
});

/* ACTIONS */
export type RootAction =
  | DimensionActions
  | DeviceActions
  | AuthActions
  | ChatMessageActions
  | ListActions
  | ItemActions
  | NavigationActions
  | NetworkActions
  | QuestionnairesActions
  | QuestionsActions
  | ChoicesActions
  | ResponsesActions
  | ThemeActions;
export type RootThunkAction<R> = ThunkAction<R, RootState, {}, RootAction>;

/* CONSTANTS */
const persistConfig = {
  key: 'root',
  storage: Storage,
};
const middlewares: Middleware[] = [thunk];
// @ts-ignore: custom __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const composers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composers(applyMiddleware(...middlewares));

/* STORE */
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = createStore(persistedReducer, enhancers);
const persistor = persistStore(store);
// persistor.purge();

/* CONTAINER */
export const Redux = memo(function Redux({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
});
