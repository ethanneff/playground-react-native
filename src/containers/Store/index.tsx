import { offline } from "@redux-offline/redux-offline";
import offlineConfig from "@redux-offline/redux-offline/lib/defaults";
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Middleware
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { DeepReadonly } from "utility-types";
import {
  AppState,
  AuthState,
  AppActions,
  appReducer,
  AuthActions,
  authReducer,
  DeviceActions,
  deviceReducer,
  navigationReducer,
  NavigationState,
  NavigationActions,
  DeviceState
} from "../../models";
import {
  Items,
  Lists,
  itemReducer,
  ListActions,
  ItemActions,
  listReducer
} from "../../apps/Checklists/models";

// interfaces
export type RootState = DeepReadonly<{
  app: AppState;
  auth: AuthState;
  device: DeviceState;
  items: Items;
  lists: Lists;
  navigation: NavigationState;
}>;

// reducers
const reducers = combineReducers<RootState>({
  app: appReducer,
  auth: authReducer,
  device: deviceReducer,
  items: itemReducer,
  lists: listReducer,
  navigation: navigationReducer
});

// actions
export type RootAction =
  | AppActions
  | DeviceActions
  | AuthActions
  | ListActions
  | ItemActions
  | NavigationActions;
export type RootThunkAction<R> = ThunkAction<R, RootState, {}, RootAction>;

// constants
const middlewares: Middleware[] = [thunk];
const composers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composers(
  applyMiddleware(...middlewares),
  offline(offlineConfig)
);

// store
export const store = createStore(reducers, enhancers);
