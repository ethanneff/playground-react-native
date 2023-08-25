import {
  NetInfoStateType,
  type NetInfoState,
} from '@react-native-community/netinfo';
import { Dimensions, type AppStateStatus, type ScaledSize } from 'react-native';
import {
  type LocationProviderInfo,
  type PowerState,
} from 'react-native-device-info';
import { type RootAction, type RootState } from 'root-types';
import { type DeepReadonly } from 'ts-essentials';
import { createAction, getType } from 'typesafe-actions';
import { logout } from '../Auth';

/* INTERFACES */
type DimensionState = {
  screen: ScaledSize;
  window: ScaledSize;
};

type LocalizeState = {
  calendar: string;
  country: string;
  currencies: string[];
  locales: {
    countryCode: string;
    isRTL: boolean;
    languageCode: string;
    languageTag: string;
    scriptCode?: string | undefined;
  }[];
  numberFormatSettings: { decimalSeparator: string; groupingSeparator: string };
  temperatureUnit: string;
  timeZone: string;
  uses24HourClock: boolean;
  usesAutoDateAndTime: boolean | undefined;
  usesAutoTimeZone: boolean | undefined;
  usesMetricSystem: boolean;
};

type DetailsState = {
  androidId: string;
  apiLevel: number;
  applicationName: string;
  availableLocationProviders: LocationProviderInfo;
  baseOs: string;
  batteryLevel: number;
  bootloader: string;
  brand: string;
  brightness: number;
  buildId: string;
  buildNumber: string;
  bundleId: string;
  carrier: string;
  codename: string;
  device: string;
  deviceId: string;
  deviceName: string;
  deviceToken: string;
  deviceType: string;
  display: string;
  fingerprint: string;
  firstInstallTime: number;
  fontScale: number;
  freeDiskStorage: number;
  freeDiskStorageOld: number;
  hardware: string;
  hasDynamicIsland: boolean;
  hasGms: boolean;
  hasHms: boolean;
  hasNotch: boolean;
  host: string;
  incremental: string;
  installReferrer: string;
  installerPackageName: string;
  instanceId: string;
  ipAddress: string;
  isAirplaneMode: boolean;
  isBatteryCharging: boolean;
  isCameraPresent: boolean;
  isDisplayZoomed: boolean;
  isEmulator: boolean;
  isHeadphonesConnected: boolean;
  isKeyboardConnected: boolean;
  isLandscape: boolean;
  isLocationEnabled: boolean;
  isMouseConnected: boolean;
  isPinOrFingerprintSet: boolean;
  isTablet: boolean;
  isTabletMode: boolean;
  lastUpdateTime: number;
  macAddress: string;
  manufacturer: string;
  maxMemory: number;
  model: string;
  phoneNumber: string;
  powerState: Partial<PowerState>;
  previewSdkInt: number;
  product: string;
  readableVersion: string;
  securityPatch: string;
  serialNumber: string;
  supported32BitAbis: string[];
  supported64BitAbis: string[];
  supportedAbis: string[];
  systemAvailableFeatures: string[];
  systemName: string;
  systemVersion: string;
  tags: string;
  totalDiskCapacity: number;
  totalDiskCapacityOld: number;
  totalMemory: number;
  type: string;
  uniqueId: string;
  usedMemory: number;
  userAgent: string;
  version: string;
};

type DeviceState = DeepReadonly<{
  details: DetailsState | null;
  dimensions: DimensionState;
  keyboardHeight: number;
  localization: LocalizeState | null;
  network: NetInfoState;
  status: AppStateStatus;
}>;

/* ACTIONS */
export const setDetails = createAction('device/details')<DetailsState>();
export const setLocalization = createAction(
  'device/localization',
)<LocalizeState>();
export const setNetwork = createAction('device/network')<NetInfoState>();
export const setStatus = createAction('device/status')<AppStateStatus>();
export const setDimensions =
  createAction('device/dimensions')<DimensionState>();
export const setKeyboardHeight = createAction('device/keyboard')<number>();

export const deviceActions = {
  setDetails,
  setDimensions,
  setKeyboardHeight,
  setLocalization,
  setNetwork,
  setStatus,
};

/* SELECTORS */
export const getLandscapeOrientation = (state: RootState): boolean =>
  state.device.dimensions.window.height < state.device.dimensions.window.width;
export const getSmallestDimension = (state: RootState): number =>
  state.device.dimensions.window.height > state.device.dimensions.window.width
    ? state.device.dimensions.window.width
    : state.device.dimensions.window.height;
export const getLargestDimension = (state: RootState): number =>
  state.device.dimensions.window.height > state.device.dimensions.window.width
    ? state.device.dimensions.window.height
    : state.device.dimensions.window.width;
export const getWidth = (state: RootState): number =>
  state.device.dimensions.window.width;

/* REDUCERS */
export const deviceInitialState: DeviceState = {
  details: null,
  dimensions: {
    screen: Dimensions.get('screen'),
    window: Dimensions.get('window'),
  },
  keyboardHeight: 0,
  localization: null,
  network: {
    details: null,
    isConnected: null,
    isInternetReachable: null,
    type: NetInfoStateType.unknown,
  },
  status: 'unknown',
};

export const deviceReducer = (
  state: DeviceState = deviceInitialState,
  action: RootAction,
): DeviceState => {
  switch (action.type) {
    case getType(setDetails):
      return {
        ...state,
        details: action.payload,
      };
    case getType(setDimensions):
      return {
        ...state,
        dimensions: action.payload,
      };
    case getType(setKeyboardHeight):
      return {
        ...state,
        keyboardHeight: action.payload,
      };
    case getType(setLocalization):
      return {
        ...state,
        localization: action.payload,
      };
    case getType(setNetwork):
      return {
        ...state,
        network: action.payload,
      };
    case getType(setStatus):
      return {
        ...state,
        status: action.payload,
      };
    case getType(logout):
      return deviceInitialState;
    default:
      return state;
  }
};
