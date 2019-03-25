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
  ItemActions,
  itemReducer,
  Items,
  ListActions,
  listReducer,
  Lists
} from "../screens/Debug/screens/Checklists/models";
import { AppActions, appReducer, AppState } from "./App";
import { AuthActions, authReducer, AuthState } from "./Auth";
import { DeviceActions, deviceReducer, DeviceState } from "./Device";

// models
export * from "./App";
export * from "./Device";
export * from "./Auth";

// interfaces
export type RootState = DeepReadonly<{
  app: AppState;
  auth: AuthState;
  device: DeviceState;
  items: Items;
  lists: Lists;
}>;

// reducers
const reducers = combineReducers<RootState>({
  app: appReducer,
  auth: authReducer,
  device: deviceReducer,
  items: itemReducer,
  lists: listReducer
});

// actions
export type RootAction =
  | AppActions
  | DeviceActions
  | AuthActions
  | ListActions
  | ItemActions;
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
