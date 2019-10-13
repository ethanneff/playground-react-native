import { AppState, AppStateStatus, ScaledSize } from "react-native";
import { ActionType, createStandardAction, getType } from "typesafe-actions";
import { RootAction } from "../../containers";
import { logout } from "../Auth";

/* ACTIONS */
export const loadDevice = createStandardAction("device/LOAD")<DeviceInfo>();
export const changeAppStatus = createStandardAction("device/UPDATE_STATUS")<
  AppStateStatus
>();
export const changeKeyboardStatus = createStandardAction(
  "device/UPDATE_KEYBOARD_VISIBILITY"
)<boolean>();

/* INTERFACES */
export interface DimensionsProps {
  window: ScaledSize;
  screen: ScaledSize;
}
export interface DeviceInfo {
  androidId: string;
  apiLevel: number;
  applicationName: string;
  availableLocationProviders: object;
  baseOs: string;
  buildId: string;
  batteryLevel: number;
  bootloader: string;
  brand: string;
  buildNumber: string;
  bundleId: string;
  carrier: string;
  codename: string;
  device: string;
  deviceId: string;
  deviceType: string;
  display: string;
  deviceName: string;
  firstInstallTime: number;
  fingerprint: string;
  fontScale: number;
  freeDiskStorage: number;
  hardware: string;
  host: string;
  ipAddress: string;
  incremental: string;
  installReferrer: string;
  instanceId: string;
  lastUpdateTime: number;
  macAddress: string;
  manufacturer: string;
  maxMemory: string;
  model: string;
  phoneNumber: string;
  powerState: object;
  product: string;
  previewSdkInt: number;
  readableVersion: string;
  serialNumber: string;
  securityPatch: string;
  systemAvailableFeatures: ReadonlyArray<string>;
  systemName: string;
  systemVersion: string;
  tags: string;
  type: string;
  totalDiskCapacity: number;
  totalMemory: string;
  uniqueId: string;
  usedMemory: number;
  userAgent: string;
  version: string;
  hasNotch: boolean;
  hasSystemFeature: boolean;
  isAirplaneMode: boolean;
  isBatteryCharging: boolean;
  isCameraPresence: false;
  isEmulator: boolean;
  isLandscape: boolean;
  isLocationEnabled: boolean;
  isPinOrFingerprintSet: boolean;
  isTablet: boolean;
  supported32BitAbis: ReadonlyArray<string>;
  supported64BitAbis: ReadonlyArray<string>;
  supportedAbis: ReadonlyArray<string>;
}

export type DeviceState = {
  keyboardVisible: boolean;
  appStatus: AppStateStatus;
} & DeviceInfo;
export type DeviceActions = ActionType<
  typeof loadDevice | typeof changeAppStatus | typeof changeKeyboardStatus
>;

/* REDUCERS */
export const deviceInfoInitialState: DeviceInfo = {
  androidId: "",
  apiLevel: 0,
  applicationName: "",
  availableLocationProviders: {},
  baseOs: "",
  buildId: "",
  batteryLevel: 0,
  bootloader: "",
  brand: "",
  buildNumber: "",
  bundleId: "",
  carrier: "",
  codename: "",
  device: "",
  deviceId: "",
  deviceType: "",
  display: "",
  deviceName: "",
  firstInstallTime: 0,
  fingerprint: "",
  fontScale: 0,
  freeDiskStorage: 0,
  hardware: "",
  host: "",
  ipAddress: "",
  incremental: "",
  installReferrer: "",
  instanceId: "",
  lastUpdateTime: 0,
  macAddress: "",
  manufacturer: "",
  maxMemory: "",
  model: "",
  phoneNumber: "",
  powerState: {},
  product: "",
  previewSdkInt: 0,
  readableVersion: "",
  serialNumber: "",
  securityPatch: "",
  systemAvailableFeatures: [],
  systemName: "",
  systemVersion: "",
  tags: "",
  type: "",
  totalDiskCapacity: 0,
  totalMemory: "",
  uniqueId: "",
  usedMemory: 0,
  userAgent: "",
  version: "",
  hasNotch: false,
  hasSystemFeature: false,
  isAirplaneMode: false,
  isBatteryCharging: false,
  isCameraPresence: false,
  isEmulator: false,
  isLandscape: false,
  isLocationEnabled: false,
  isPinOrFingerprintSet: false,
  isTablet: false,
  supported32BitAbis: [],
  supported64BitAbis: [],
  supportedAbis: []
};
export const deviceInitialState: DeviceState = {
  ...deviceInfoInitialState,
  keyboardVisible: false,
  appStatus: AppState.currentState
};

export const deviceReducer = (
  state: DeviceState = deviceInitialState,
  action: RootAction
): DeviceState => {
  switch (action.type) {
    case getType(changeAppStatus):
      return {
        ...state,
        appStatus: action.payload
      };
    case getType(changeKeyboardStatus):
      return {
        ...state,
        keyboardVisible: action.payload
      };
    case getType(loadDevice):
      return {
        ...state,
        ...action.payload
      };
    case getType(logout):
      return deviceInitialState;
    default:
      return state;
  }
};
