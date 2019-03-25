import { AppStateStatus } from "react-native";
import { createSelector } from "reselect";
import { ActionType, createStandardAction, getType } from "typesafe-actions";
import { RootAction, RootState } from "../../models";
// import { logout } from "../Auth";

// interfaces
export interface AppState {
  appVersion?: string;
  buildVersion?: string;
  bundleIdentifier?: string;
  applicationName?: string;
  buildNumber?: string;
  version?: string;
  readableVersion?: string;
  status: AppStateStatus;
  keyboardVisible: boolean;
}
export type AppActions = ActionType<
  typeof onAppLoad | typeof onAppStatusChange | typeof onKeyboardChange
>;

// actions
export const onAppLoad = createStandardAction("APP/LOAD")<AppState>();
export const onAppStatusChange = createStandardAction("APP/UPDATE_STATUS")<
  AppStateStatus
>();
export const onKeyboardChange = createStandardAction(
  "APP/UPDATE_KEYBOARD_VISIBILITY"
)<boolean>();

// selectors
export const getAppStatus = (state: RootState): AppStateStatus =>
  state.app.status;
export const getKeyboardVisible = (state: RootState): boolean =>
  state.app.keyboardVisible;
export const getAppStatusForeground = createSelector(
  getAppStatus,
  (status: AppStateStatus): boolean => status === "active"
);

// reducers
export const appInitialState: AppState = {
  keyboardVisible: false,
  status: "inactive"
};
export function appReducer(
  state: AppState = appInitialState,
  action: RootAction
): AppState {
  switch (action.type) {
    case getType(onAppLoad):
      return {
        ...state,
        ...action.payload
      };
    case getType(onAppStatusChange):
      return {
        ...state,
        status: action.payload
      };
    case getType(onKeyboardChange):
      return {
        ...state,
        keyboardVisible: action.payload
      };
    // case getType(logout):
    //   return appInitialState;
    default:
      return state;
  }
}
