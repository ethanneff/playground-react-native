import { AppStateStatus } from "react-native";
import { RootState } from "../../models";

// action types
export enum AppActionTypes {
  APP_LOAD = "APP_LOAD",
  APP_UPDATE_STATUS = "APP_UPDATE_STATUS"
}

// interfaces
export interface AppState {
  appVersion?: string;
  buildVersion?: string;
  bundleIdentifier?: string;
  applicationName?: string;
  buildNumber?: string;
  version?: string;
  readableVersion?: string;
  status?: AppStateStatus;
}
interface AppLoadAction {
  type: AppActionTypes.APP_LOAD;
  payload: AppLoadPayload;
}
interface AppStateChangeAction {
  type: AppActionTypes.APP_UPDATE_STATUS;
  payload: AppStateStatus;
}
type AppActions = AppLoadAction | AppStateChangeAction;
type AppLoadPayload = AppState;

// actions
export const onAppLoad = (payload: AppLoadPayload) => ({
  type: AppActionTypes.APP_LOAD,
  payload
});
export const onAppStateChange = (payload: AppStateStatus) => ({
  type: AppActionTypes.APP_UPDATE_STATUS,
  payload
});

// selectors
export const selectAppStatus = (state: RootState) => state.app.status;

// reducers
export function appReducer(state: AppState = {}, action: AppActions): AppState {
  switch (action.type) {
    case AppActionTypes.APP_LOAD:
      return {
        ...state,
        ...action.payload
      };
    case AppActionTypes.APP_UPDATE_STATUS:
      return {
        ...state,
        status: action.payload
      };
    default:
      return state;
  }
}
