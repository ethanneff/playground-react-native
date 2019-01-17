import {
  ConnectionInfo,
  ConnectionType,
  Dimensions,
  EffectiveConnectionType,
  ScaledSize
} from "react-native";
import { RootState } from "../../models";

const WINDOW = Dimensions.get("window");

// action types
export enum DeviceActionTypes {
  DEVICE_UPDATE_BATTERY = "DEVICE_UPDATE_BATTERY",
  DEVICE_UPDATE_FINGERPRINT = "DEVICE_UPDATE_FINGERPRINT",
  DEVICE_LOAD = "DEVICE_LOAD",
  DEVICE_UPDATE_NETWORK = "DEVICE_UPDATE_NETWORK",
  DEVICE_UPDATE_DIMENSION = "DEVICE_UPDATE_DIMENSION"
}

// interfaces
export interface DimensionsProps {
  window: ScaledSize;
  screen: ScaledSize;
}
interface DeviceUpdateBatteryAction {
  type: DeviceActionTypes.DEVICE_UPDATE_BATTERY;
  payload: number;
}
interface DeviceUpdateFingerprintAction {
  type: DeviceActionTypes.DEVICE_UPDATE_FINGERPRINT;
  payload: boolean;
}
interface DeviceLoadAction {
  type: DeviceActionTypes.DEVICE_LOAD;
  payload: DeviceState;
}
interface DeviceNetworkChangeAction {
  type: DeviceActionTypes.DEVICE_UPDATE_NETWORK;
  payload: ConnectionInfo;
}
interface DeviceDimensionChangeAction {
  type: DeviceActionTypes.DEVICE_UPDATE_DIMENSION;
  payload: DimensionsProps;
}
type DeviceActions =
  | DeviceUpdateBatteryAction
  | DeviceUpdateFingerprintAction
  | DeviceLoadAction
  | DeviceNetworkChangeAction
  | DeviceDimensionChangeAction;

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
  windowDimensions?: ScaledSize;
  screenDimensions?: ScaledSize;
}

// actions
export const onDeviceUpdateFingerprint = (payload: boolean) => ({
  type: DeviceActionTypes.DEVICE_UPDATE_FINGERPRINT,
  payload
});
export const onDeviceUpdateBattery = (payload: number) => ({
  type: DeviceActionTypes.DEVICE_UPDATE_BATTERY,
  payload
});
export const onDeviceLoad = (payload: DeviceState) => ({
  type: DeviceActionTypes.DEVICE_LOAD,
  payload
});
export const onNetworkChange = (payload: ConnectionType | ConnectionInfo) => ({
  type: DeviceActionTypes.DEVICE_UPDATE_NETWORK,
  payload
});
export const onDimensionChange = (payload: DimensionsProps) => ({
  type: DeviceActionTypes.DEVICE_UPDATE_DIMENSION,
  payload
});

// selectors
export const selectLandscapeOrientation = (state: RootState) =>
  !state.device.windowDimensions
    ? WINDOW.height < WINDOW.width
    : state.device.windowDimensions.height <
      state.device.windowDimensions.width;

export const selectSmallestDimension = (state: RootState) =>
  !state.device.windowDimensions
    ? WINDOW.height > WINDOW.width
      ? WINDOW.width
      : WINDOW.height
    : state.device.windowDimensions.height > state.device.windowDimensions.width
    ? state.device.windowDimensions.width
    : state.device.windowDimensions.height;

export const selectLargestDimension = (state: RootState) =>
  !state.device.windowDimensions
    ? WINDOW.height > WINDOW.width
      ? WINDOW.height
      : WINDOW.width
    : state.device.windowDimensions.height > state.device.windowDimensions.width
    ? state.device.windowDimensions.height
    : state.device.windowDimensions.width;

export const selectWidth = (state: RootState) =>
  !state.device.windowDimensions
    ? WINDOW.width
    : state.device.windowDimensions.width;

export const selectHeight = (state: RootState) =>
  !state.device.windowDimensions
    ? WINDOW.height
    : state.device.windowDimensions.height;

// reducers
export const deviceReducer = (
  state: DeviceState = {},
  action: DeviceActions
) => {
  switch (action.type) {
    case DeviceActionTypes.DEVICE_UPDATE_BATTERY:
      return {
        ...state,
        batteryLevel: action.payload
      };
    case DeviceActionTypes.DEVICE_UPDATE_FINGERPRINT:
      return {
        ...state,
        isPinOrFingerprintSet: action.payload
      };
    case DeviceActionTypes.DEVICE_UPDATE_NETWORK:
      return {
        ...state,
        networkType: action.payload.type,
        networkEffectiveType: action.payload.effectiveType
      };
    case DeviceActionTypes.DEVICE_UPDATE_DIMENSION:
      return {
        ...state,
        windowDimensions: action.payload.window,
        screenDimensions: action.payload.screen
      };
    case DeviceActionTypes.DEVICE_LOAD:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
