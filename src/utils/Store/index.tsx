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
import { AppReducer, AppState, DeviceReducer, DeviceState } from "../../models";

// debug
interface DebugWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__<F extends any>(f: F): F;
}
declare var window: DebugWindow;

// interfaces
export interface RootState {
  app: AppState;
  device: DeviceState;
}

// constants
const middlewares: Middleware[] = [thunk];
const composers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composers(applyMiddleware(...middlewares));

// reducers
const reducers = combineReducers<RootState>({
  app: AppReducer,
  device: DeviceReducer
});

// store
const store = createStore(reducers, enhancers);

// provider
export class Provider extends React.PureComponent {
  public render() {
    const { children } = this.props;
    return <Original store={store}>{children}</Original>;
  }
}
