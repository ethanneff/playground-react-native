import { AppState as AppActiveState, AppStateStatus } from "react-native";
import DeviceInfo from "react-native-device-info";
import { ActionType, createStandardAction, getType } from "typesafe-actions";
import { RootAction, RootState } from "../../containers";
import { VersionNumber } from "../../utils";
import { logout } from "../Auth";

/* ACTIONS */
export const loadApp = createStandardAction("app/LOAD")<AppState>();
export const changeAppStatus = createStandardAction("app/UPDATE_STATUS")<
  AppStateStatus
>();
export const changeKeyboardStatus = createStandardAction(
  "app/UPDATE_KEYBOARD_VISIBILITY"
)<boolean>();

/* HELPERS */
export const generateAppInitialState = (): AppState => ({
  appVersion: VersionNumber.appVersion,
  applicationName: DeviceInfo.getApplicationName(),
  buildNumber: DeviceInfo.getBuildNumber(),
  buildVersion: VersionNumber.buildVersion,
  bundleIdentifier: DeviceInfo.getBundleId() || VersionNumber.bundleIdentifier,
  keyboardVisible: false,
  readableVersion: DeviceInfo.getReadableVersion(),
  status: AppActiveState.currentState,
  version: DeviceInfo.getVersion()
});

/* SELECTORS */
export const getAppStatus = (state: RootState): AppStateStatus =>
  state.app.status;
export const getKeyboardVisible = (state: RootState): boolean =>
  state.app.keyboardVisible;

/* INTERFACES */
export interface AppState {
  appVersion: string;
  buildVersion: string;
  bundleIdentifier: string;
  applicationName: string;
  buildNumber: string;
  version: string;
  readableVersion: string;
  status: AppStateStatus;
  keyboardVisible: boolean;
}
export type AppActions = ActionType<
  typeof loadApp | typeof changeAppStatus | typeof changeKeyboardStatus
>;

/* REDUCERS */
export const appInitialState: AppState = generateAppInitialState();

export function appReducer(
  state: AppState = appInitialState,
  action: RootAction
): AppState {
  switch (action.type) {
    case getType(loadApp):
      return {
        ...state,
        ...action.payload
      };
    case getType(changeAppStatus):
      return {
        ...state,
        status: action.payload
      };
    case getType(changeKeyboardStatus):
      return {
        ...state,
        keyboardVisible: action.payload
      };
    case getType(logout):
      return appInitialState;
    default:
      return state;
  }
}
