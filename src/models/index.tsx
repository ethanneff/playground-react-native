import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Middleware
} from "redux";
import thunk from "redux-thunk";
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
import { DeviceActions, deviceReducer, DeviceState } from "./Device";

// models
export * from "./App";
export * from "./Device";

// interfaces
export type RootState = DeepReadonly<{
  app: AppState;
  device: DeviceState;
  items: Items;
  lists: Lists;
}>;

// reducers
const reducers = combineReducers<RootState>({
  app: appReducer,
  device: deviceReducer,
  items: itemReducer,
  lists: listReducer
});

// actions
export type RootAction = AppActions | DeviceActions | ListActions | ItemActions;

// constants
const middlewares: Middleware[] = [thunk];
const composers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composers(applyMiddleware(...middlewares));

// store
export const store = createStore(reducers, enhancers);
