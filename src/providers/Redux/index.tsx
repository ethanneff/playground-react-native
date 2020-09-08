import React, {ReactNode, memo} from 'react';
import {persistReducer, persistStore} from 'redux-persist';
import {
  Middleware,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {DeepReadonly} from 'utility-types';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {
  ChecklistItemReducer,
  ChecklistReducer,
  ItemActions,
  ListActions,
  checklistItemReducer,
  checklistReducer,
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
} from '../../apps/Playground/Questionnaire/models';
import {
  AuthActions,
  AuthState,
  DeviceActions,
  DeviceState,
  DimensionActions,
  DimensionState,
  NetworkActions,
  NetworkState,
  Theme,
  ThemeActions,
  authReducer,
  deviceReducer,
  dimensionReducer,
  networkReducer,
  themeReducer,
} from '../../models';
import {Storage} from '../../conversions';
import {
  ChatMessageActions,
  ChatMessageReducer,
  chatMessageReducer,
} from '../../apps/Playground/Chat/Messages';

export type RootState = DeepReadonly<{
  auth: AuthState;
  dimension: DimensionState;
  device: DeviceState;
  checklistItems: ChecklistItemReducer; // TODO: figure out better naming without plural (e.g. checklists.items vs checklist.items)
  checklists: ChecklistReducer;
  chatMessage: ChatMessageReducer;
  network: NetworkState;
  questions: Questions;
  choices: Choices;
  responses: Responses;
  questionnaires: Questionnaires;
  theme: Theme;
}>;

const reducers = combineReducers<RootState>({
  auth: authReducer,
  choices: choicesReducer,
  dimension: dimensionReducer,
  device: deviceReducer,
  checklistItems: checklistItemReducer,
  checklists: checklistReducer,
  chatMessage: chatMessageReducer,
  network: networkReducer,
  questionnaires: questionnairesReducer,
  questions: questionsReducer,
  responses: responsesReducer,
  theme: themeReducer,
});

export type RootAction =
  | DimensionActions
  | DeviceActions
  | AuthActions
  | ChatMessageActions
  | ListActions
  | ItemActions
  | NetworkActions
  | QuestionnairesActions
  | QuestionsActions
  | ChoicesActions
  | ResponsesActions
  | ThemeActions;
export type RootThunkAction<R> = ThunkAction<R, RootState, any, RootAction>;

const persistConfig = {key: 'root', storage: Storage};
const middlewares: Middleware[] = [thunk];
const composers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composers(applyMiddleware(...middlewares));

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = createStore(persistedReducer, enhancers);
const persistor = persistStore(store);
// persistor.purge();

type Props = {children: ReactNode};
export const Redux = memo(function Redux({children}: Props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
});
