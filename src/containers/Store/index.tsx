import { offline } from "@redux-offline/redux-offline";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import offlineConfig from "@redux-offline/redux-offline/lib/defaults";
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Middleware,
  Dispatch
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { DeepReadonly } from "utility-types";
import {
  ItemActions,
  itemReducer,
  Items,
  ListActions,
  listReducer,
  Lists
} from "../../apps/Checklists/models";
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
  responsesReducer
} from "../../apps/Debug/screens/Questionnaire/models";
import {
  AppActions,
  appReducer,
  AppState,
  AuthActions,
  authReducer,
  AuthState,
  DeviceActions,
  deviceReducer,
  DeviceState,
  Navigation,
  NavigationActions,
  navigationReducer,
  Theme,
  ThemeActions,
  themeReducer
} from "../../models";

/* INTERFACES */
export type RootState = DeepReadonly<{
  app: AppState;
  auth: AuthState;
  device: DeviceState;
  items: Items;
  lists: Lists;
  navigation: Navigation;
  questions: Questions;
  choices: Choices;
  responses: Responses;
  questionnaires: Questionnaires;
  theme: Theme;
}>;

/* REDUCERS */
const reducers = combineReducers<RootState>({
  app: appReducer,
  auth: authReducer,
  choices: choicesReducer,
  device: deviceReducer,
  items: itemReducer,
  lists: listReducer,
  navigation: navigationReducer,
  questionnaires: questionnairesReducer,
  questions: questionsReducer,
  responses: responsesReducer,
  theme: themeReducer
});

/* ACTIONS */
export type RootAction =
  | AppActions
  | DeviceActions
  | AuthActions
  | ListActions
  | ItemActions
  | NavigationActions
  | QuestionnairesActions
  | QuestionsActions
  | ChoicesActions
  | ResponsesActions
  | ThemeActions;
export type RootThunkAction<R> = ThunkAction<R, RootState, {}, RootAction>;

/* CONSTANTS */
const middlewares: Middleware[] = [thunk];
const composers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composers(
  applyMiddleware(...middlewares),
  offline(offlineConfig)
);

/* STORE */
export const store = createStore(reducers, enhancers);
