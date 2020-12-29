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
import {RootAction, RootState} from 'root-types';
import {
  checklistItemReducer,
  checklistReducer,
} from '../../apps/Checklists/models';
import {
  completeBoardReducer,
  completeItemReducer,
  completeListReducer,
  completeUserReducer,
} from '../../apps/Complete/models';
import {chatMessageReducer} from '../../apps/Playground/Chat/Messages';
import {
  choicesReducer,
  questionnairesReducer,
  questionsReducer,
  responsesReducer,
} from '../../apps/Playground/Questionnaire/models';
import {Storage} from '../../conversions';
import {
  authReducer,
  deviceReducer,
  dimensionReducer,
  networkReducer,
  themeReducer,
} from '../../models';

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
