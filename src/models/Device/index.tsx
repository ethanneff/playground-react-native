import {
  ConnectionInfo,
  ConnectionType,
  Dimensions,
  EffectiveConnectionType,
  ScaledSize
} from "react-native";
import { ActionType, createStandardAction, getType } from "typesafe-actions";
import { RootAction, RootState } from "../../models";
import { logout } from "../Auth";

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
  | typeof onBatteryChange
  | typeof onFingerprintChange
  | typeof onDeviceLoad
  | typeof onNetworkChange
  | typeof onDimensionChange
>;

// actions
export const onBatteryChange = createStandardAction("DEVICE/UPDATE_BATTERY")<
  number
>();
export const onFingerprintChange = createStandardAction(
  "DEVICE/UPDATE_FINGERPRINT"
)<boolean>();
export const onDeviceLoad = createStandardAction("DEVICE/LOAD")<DeviceState>();
export const onNetworkChange = createStandardAction("DEVICE/UPDATE_NETWORK")<
  ConnectionInfo
>();
export const onDimensionChange = createStandardAction(
  "DEVICE/UPDATE_DIMENSION"
)<DimensionsProps>();

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
    case getType(onBatteryChange):
      return {
        ...state,
        batteryLevel: action.payload
      };
    case getType(onFingerprintChange):
      return {
        ...state,
        isPinOrFingerprintSet: action.payload
      };
    case getType(onNetworkChange):
      return {
        ...state,
        networkEffectiveType: action.payload.effectiveType,
        networkType: action.payload.type
      };
    case getType(onDimensionChange):
      return {
        ...state,
        screenDimensions: action.payload.screen,
        windowDimensions: action.payload.window
      };
    case getType(onDeviceLoad):
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
