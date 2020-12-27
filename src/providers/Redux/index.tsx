import React, {memo, ReactNode} from 'react';
import {Provider} from 'react-redux';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Middleware,
} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import thunk, {ThunkAction} from 'redux-thunk';
import {DeepReadonly} from 'utility-types';
import {
  ChecklistItemReducer,
  checklistItemReducer,
  ChecklistReducer,
  checklistReducer,
  ItemActions,
  ListActions,
} from '../../apps/Checklists/models';
import {
  CompleteBoardActions,
  CompleteBoardReducer,
  completeBoardReducer,
  CompleteItemActions,
  CompleteItemReducer,
  completeItemReducer,
  CompleteListActions,
  CompleteListReducer,
  completeListReducer,
  CompleteUserActions,
  CompleteUserReducer,
  completeUserReducer,
} from '../../apps/Complete/models';
import {
  ChatMessageActions,
  ChatMessageReducer,
  chatMessageReducer,
} from '../../apps/Playground/Chat/Messages';
import {
  Choices,
  ChoicesActions,
  choicesReducer,
  Questionnaires,
  QuestionnairesActions,
  questionnairesReducer,
  Questions,
  QuestionsActions,
  questionsReducer,
  Responses,
  ResponsesActions,
  responsesReducer,
} from '../../apps/Playground/Questionnaire/models';
import {Storage} from '../../conversions';
import {
  AuthActions,
  authReducer,
  AuthState,
  DeviceActions,
  deviceReducer,
  DeviceState,
  DimensionActions,
  dimensionReducer,
  DimensionState,
  NetworkActions,
  networkReducer,
  NetworkState,
  Theme,
  ThemeActions,
  themeReducer,
} from '../../models';
export type RootState = DeepReadonly<{
  auth: AuthState;
  dimension: DimensionState;
  device: DeviceState;
  checklistItem: ChecklistItemReducer;
  checklist: ChecklistReducer;
  chatMessage: ChatMessageReducer;
  network: NetworkState;
  questions: Questions;
  choices: Choices;
  responses: Responses;
  questionnaires: Questionnaires;
  theme: Theme;
  completeItem: CompleteItemReducer;
  completeList: CompleteListReducer;
  completeBoard: CompleteBoardReducer;
  completeUser: CompleteUserReducer;
}>;

const reducers = combineReducers<RootState>({
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
  completeList: completeListReducer,
  completeBoard: completeBoardReducer,
  completeUser: completeUserReducer,
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
  | ThemeActions
  | ItemActions
  | CompleteItemActions
  | CompleteListActions
  | CompleteBoardActions
  | CompleteUserActions;

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
