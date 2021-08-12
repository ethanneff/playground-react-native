import {AppState, AppStateStatus, ScaledSize} from 'react-native';
import {RootAction} from 'root-types';
import {createAction, getType} from 'typesafe-actions';
import {logout} from '../Auth';

/* ACTIONS */
export const loadDevice = createAction('device/LOAD')<DeviceInfo>();
export const changeAppStatus = createAction(
  'device/UPDATE_STATUS',
)<AppStateStatus>();
export const changeKeyboardStatus = createAction(
  'device/UPDATE_KEYBOARD_VISIBILITY',
)<number>();

export const deviceActions = {
  loadDevice,
  changeAppStatus,
  changeKeyboardStatus,
};

/* INTERFACES */
export interface DimensionsProps {
  window: ScaledSize;
  screen: ScaledSize;
}
export interface DeviceInfo {
  androidId: string;
  apiLevel: number;
  applicationName: string;
  availableLocationProviders: any;
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
  deviceToken: string;
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
  installerPackageName: string;
  instanceId: string;
  lastUpdateTime: number;
  macAddress: string;
  manufacturer: string;
  maxMemory: string;
  model: string;
  phoneNumber: string;
  powerState: any;
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
  hasGms: boolean;
  hasHms: boolean;
  hasNotch: boolean;
  hasSystemFeature: boolean;
  isAirplaneMode: boolean;
  isBatteryCharging: boolean;
  isCameraPresent: false;
  isEmulator: boolean;
  isHeadphonesConnected: boolean;
  isLandscape: boolean;
  isLocationEnabled: boolean;
  isPinOrFingerprintSet: boolean;
  isTablet: boolean;
  supported32BitAbis: ReadonlyArray<string>;
  supported64BitAbis: ReadonlyArray<string>;
  supportedAbis: ReadonlyArray<string>;
  syncUniqueId: string;
}

export type DeviceState = {
  keyboardVisible: boolean;
  keyboardHeight: number;
  appStatus: AppStateStatus;
} & DeviceInfo;

/* REDUCERS */
export const deviceInfoInitialState: DeviceInfo = {
  androidId: '',
  apiLevel: 0,
  applicationName: '',
  availableLocationProviders: {},
  baseOs: '',
  buildId: '',
  batteryLevel: 0,
  bootloader: '',
  brand: '',
  buildNumber: '',
  bundleId: '',
  carrier: '',
  codename: '',
  device: '',
  deviceId: '',
  deviceType: '',
  deviceToken: '',
  display: '',
  deviceName: '',
  firstInstallTime: 0,
  fingerprint: '',
  fontScale: 0,
  freeDiskStorage: 0,
  hardware: '',
  host: '',
  ipAddress: '',
  incremental: '',
  installReferrer: '',
  installerPackageName: '',
  instanceId: '',
  lastUpdateTime: 0,
  macAddress: '',
  manufacturer: '',
  maxMemory: '',
  model: '',
  phoneNumber: '',
  powerState: {},
  product: '',
  previewSdkInt: 0,
  readableVersion: '',
  serialNumber: '',
  securityPatch: '',
  systemAvailableFeatures: [],
  systemName: '',
  systemVersion: '',
  tags: '',
  type: '',
  totalDiskCapacity: 0,
  totalMemory: '',
  uniqueId: '',
  usedMemory: 0,
  userAgent: '',
  version: '',
  hasGms: false,
  hasHms: false,
  hasNotch: false,
  hasSystemFeature: false,
  isAirplaneMode: false,
  isBatteryCharging: false,
  isCameraPresent: false,
  isEmulator: false,
  isHeadphonesConnected: false,
  isLandscape: false,
  isLocationEnabled: false,
  isPinOrFingerprintSet: false,
  isTablet: false,
  supported32BitAbis: [],
  supported64BitAbis: [],
  supportedAbis: [],
  syncUniqueId: '',
};
export const deviceInitialState: DeviceState = {
  ...deviceInfoInitialState,
  keyboardVisible: false,
  keyboardHeight: 0,
  appStatus: AppState.currentState,
};

export const deviceReducer = (
  state: DeviceState = deviceInitialState,
  action: RootAction,
): DeviceState => {
  switch (action.type) {
    case getType(changeAppStatus):
      return {
        ...state,
        appStatus: action.payload,
      };
    case getType(changeKeyboardStatus):
      return {
        ...state,
        keyboardVisible: action.payload > 0,
        keyboardHeight: action.payload,
      };
    case getType(loadDevice):
      return {
        ...state,
        ...action.payload,
        keyboardHeight: 0,
      };
    case getType(logout):
      return deviceInitialState;
    default:
      return state;
  }
};
