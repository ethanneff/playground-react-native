import {
  ConnectionInfo,
  ConnectionType,
  Dimensions,
  EffectiveConnectionType,
  ScaledSize
} from "react-native";
import { ActionType, createStandardAction, getType } from "typesafe-actions";
import { RootAction, RootState } from "../../models";
// import { logout } from "../Auth";

// interfaces
export interface DimensionsProps {
  window: ScaledSize;
  screen: ScaledSize;
}
export interface DeviceState {
  uniqueId?: string;
  manufacturer?: string;
  brand?: string;
  model?: string;
  deviceId?: string;
  systemName?: string;
  systemVersion?: string;
  deviceName?: string;
  userAgent?: string;
  deviceLocale?: string;
  deviceCountry?: string;
  timezone?: string;
  instanceId?: string;
  installReferrer?: string;
  isEmulator?: boolean;
  isTablet?: boolean;
  fontScale?: number;
  is24Hour?: boolean;
  isPinOrFingerprintSet?: boolean;
  firstInstallTime?: number;
  lastUpdateTime?: number;
  serialNumber?: string;
  phoneNumber?: string;
  apiLevel?: number;
  carrier?: string;
  totalMemory?: number;
  maxMemory?: number;
  totalDiskCapacity?: number;
  freeDiskStorage?: number;
  batteryLevel?: number;
  networkType?: ConnectionType;
  networkEffectiveType?: EffectiveConnectionType;
  windowDimensions: ScaledSize;
  screenDimensions: ScaledSize;
}
export type DeviceActions = ActionType<
  | typeof updateBattery
  | typeof updateFingerprint
  | typeof loadDevice
  | typeof updateNetwork
  | typeof updateDimensions
>;

// actions
export const updateBattery = createStandardAction("device/UPDATE_BATTERY")<
  number
>();

export const updateFingerprint = createStandardAction(
  "device/UPDATE_FINGERPRINT"
)<boolean>();

export const loadDevice = createStandardAction("device/LOAD")<DeviceState>();

export const updateNetwork = createStandardAction("device/UPDATE_NETWORK")<
  ConnectionInfo
>();

export const updateDimensions = createStandardAction("device/UPDATE_DIMENSION")<
  DimensionsProps
>();

// selectors
export const getLandscapeOrientation = (state: RootState): boolean =>
  state.device.windowDimensions.height < state.device.windowDimensions.width;

export const getSmallestDimension = (state: RootState): number =>
  state.device.windowDimensions.height > state.device.windowDimensions.width
    ? state.device.windowDimensions.width
    : state.device.windowDimensions.height;

export const getLargestDimension = (state: RootState): number =>
  state.device.windowDimensions.height > state.device.windowDimensions.width
    ? state.device.windowDimensions.height
    : state.device.windowDimensions.width;

export const getWidth = (state: RootState): number =>
  state.device.windowDimensions.width;

export const getHeight = (state: RootState): number =>
  state.device.windowDimensions.height;

// reducers
const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

export const deviceInitialState: DeviceState = {
  screenDimensions,
  windowDimensions
};

export const deviceReducer = (
  state: DeviceState = deviceInitialState,
  action: RootAction
): DeviceState => {
  switch (action.type) {
    case getType(updateBattery):
      return {
        ...state,
        batteryLevel: action.payload
      };
    case getType(updateFingerprint):
      return {
        ...state,
        isPinOrFingerprintSet: action.payload
      };
    case getType(updateNetwork):
      return {
        ...state,
        networkEffectiveType: action.payload.effectiveType,
        networkType: action.payload.type
      };
    case getType(updateDimensions):
      return {
        ...state,
        screenDimensions: action.payload.screen,
        windowDimensions: action.payload.window
      };
    case getType(loadDevice):
      return {
        ...state,
        ...action.payload
      };
    // TODO: add back logout
    // case getType(logout):
    // return deviceInitialState;
    default:
      return state;
  }
};
