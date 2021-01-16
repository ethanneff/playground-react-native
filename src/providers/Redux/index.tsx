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
import thunk from 'redux-thunk';
import {
  checklistActions,
  checklistItemActions,
  checklistItemReducer,
  checklistReducer,
} from '../../apps/Checklists/models';
import {
  completeItemActions,
  completeItemReducer,
  completeUserActions,
  completeUserReducer,
} from '../../apps/Complete/models';
import {
  chatMessageActions,
  chatMessageReducer,
} from '../../apps/Playground/Chat/Messages';
import {
  choicesActions,
  choicesReducer,
  questionnairesActions,
  questionnairesReducer,
  questionsActions,
  questionsReducer,
  responsesActions,
  responsesReducer,
} from '../../apps/Playground/Questionnaire/models';
import {Storage} from '../../conversions';
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
} from '../../models';
import {syncMiddleware, useSync} from './sync';

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
});

const persistConfig = {key: 'root', storage: Storage};
const middlewares: Middleware[] = [thunk, syncMiddleware];
const composers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composers(applyMiddleware(...middlewares));

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = createStore(persistedReducer, enhancers);
const persistor = persistStore(store);
// persistor.purge();

type Props = {children: ReactNode};
export const Redux = memo(function Redux({children}: Props) {
  useSync();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
});
