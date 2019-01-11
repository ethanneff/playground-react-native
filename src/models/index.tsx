import * as React from "react";
import { Provider as Original } from "react-redux";
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Middleware
} from "redux";
import thunk from "redux-thunk";
import { DeepReadonly } from "utility-types";
import { AppReducer, AppState, DeviceReducer, DeviceState } from ".";
import { ItemReducer, Items } from "../screens/Debug/screens/Checklist/Item";

// models
export * from "./App";
export * from "./Device";

// interfaces
export type RootState = DeepReadonly<{
  app: AppState;
  device: DeviceState;
  items: Items;
}>;

// reducers
const reducers = combineReducers<RootState>({
  app: AppReducer,
  device: DeviceReducer,
  items: ItemReducer
});

// constants
const middlewares: Middleware[] = [thunk];
const composers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composers(applyMiddleware(...middlewares));

// store
const store = createStore(reducers, enhancers);

// provider
export class Provider extends React.PureComponent {
  public render() {
    const { children } = this.props;
    return <Original store={store}>{children}</Original>;
  }
}
