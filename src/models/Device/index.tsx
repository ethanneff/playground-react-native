import {
  NetInfoCellularGeneration,
  NetInfoState,
  NetInfoStateType
} from "@react-native-community/netinfo";
import { Dimensions, ScaledSize } from "react-native";
import DeviceInfo from "react-native-device-info";
import { ActionType, createStandardAction, getType } from "typesafe-actions";
import { RootAction, RootState } from "../../containers";
import { logout } from "../Auth";

/* ACTIONS */
export const updateBattery = createStandardAction("device/UPDATE_BATTERY")<
  number
>();

export const updateFingerprint = createStandardAction(
  "device/UPDATE_FINGERPRINT"
)<boolean>();

export const loadDevice = createStandardAction("device/LOAD")<DeviceState>();

export const updateNetwork = createStandardAction("device/UPDATE_NETWORK")<
  NetInfoState
>();

export const updateDimensions = createStandardAction("device/UPDATE_DIMENSION")<
  DimensionsProps
>();

/* HELPERS */
export const generateDeviceInitialState = (): DeviceState => ({
  apiLevel: DeviceInfo.getAPILevel(),
  batteryLevel: 0,
  brand: DeviceInfo.getBrand(),
  carrier: DeviceInfo.getCarrier(),
  deviceCountry: DeviceInfo.getDeviceCountry(),
  deviceId: DeviceInfo.getDeviceId(),
  deviceLocale: DeviceInfo.getDeviceLocale(),
  deviceName: DeviceInfo.getDeviceName(),
  firstInstallTime: DeviceInfo.getFirstInstallTime(),
  fontScale: DeviceInfo.getFontScale(),
  freeDiskStorage: DeviceInfo.getFreeDiskStorage(),
  installReferrer: DeviceInfo.getInstallReferrer(),
  instanceId: DeviceInfo.getInstanceID(),
  is24Hour: DeviceInfo.is24Hour(),
  isEmulator: DeviceInfo.isEmulator(),
  isPinOrFingerprintSet: false,
  isTablet: DeviceInfo.isTablet(),
  lastUpdateTime: DeviceInfo.getLastUpdateTime(),
  manufacturer: DeviceInfo.getManufacturer(),
  maxMemory: DeviceInfo.getMaxMemory(),
  model: DeviceInfo.getModel(),
  networkCellularGeneration: undefined,
  networkConnected: false,
  networkExpensiveConnection: undefined,
  networkReachable: false,
  networkType: undefined,
  phoneNumber: DeviceInfo.getPhoneNumber(),
  screenDimensions: Dimensions.get("screen"),
  serialNumber: DeviceInfo.getSerialNumber(),
  systemName: DeviceInfo.getSystemName(),
  systemVersion: DeviceInfo.getSystemVersion(),
  timezone: DeviceInfo.getTimezone(),
  totalDiskCapacity: DeviceInfo.getTotalDiskCapacity(),
  totalMemory: DeviceInfo.getTotalMemory(),
  uniqueId: DeviceInfo.getUniqueID(),
  userAgent: DeviceInfo.getUserAgent(),
  windowDimensions: Dimensions.get("window")
});

/* SELECTORS */
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

/* INTERFACES */
export interface DimensionsProps {
  window: ScaledSize;
  screen: ScaledSize;
}
export interface DeviceState {
  apiLevel: number;
  batteryLevel: number;
  brand: string;
  carrier: string;
  deviceCountry: string;
  deviceId: string;
  deviceLocale: string;
  deviceName: string;
  firstInstallTime: number;
  fontScale: number;
  freeDiskStorage: number;
  installReferrer: string;
  instanceId: string;
  is24Hour: boolean;
  isEmulator: boolean;
  isPinOrFingerprintSet: boolean;
  isTablet: boolean;
  lastUpdateTime: number;
  manufacturer: string;
  maxMemory: number;
  model: string;
  networkCellularGeneration: NetInfoCellularGeneration | undefined;
  networkConnected: boolean;
  networkExpensiveConnection: boolean | undefined;
  networkReachable: boolean;
  networkType: NetInfoStateType | undefined;
  phoneNumber: string;
  screenDimensions: ScaledSize;
  serialNumber: string;
  systemName: string;
  systemVersion: string;
  timezone: string;
  totalDiskCapacity: number;
  totalMemory: number;
  uniqueId: string;
  userAgent: string;
  windowDimensions: ScaledSize;
}

export type DeviceActions = ActionType<
  | typeof updateBattery
  | typeof updateFingerprint
  | typeof loadDevice
  | typeof updateNetwork
  | typeof updateDimensions
>;

/* REDUCERS */
export const deviceInitialState: DeviceState = generateDeviceInitialState();

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
      const details = action.payload.details;
      // TODO: update netinfo to 4+
      // networkReachable: action.payload.isInternetReachable,
      // networkCellularGeneration: details ? details.cellularGeneration,
      return {
        ...state,
        networkConnected: action.payload.isConnected,
        networkExpensiveConnection: details
          ? details.isConnectionExpensive
          : undefined,
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
    case getType(logout):
      return deviceInitialState;
    default:
      return state;
  }
};
