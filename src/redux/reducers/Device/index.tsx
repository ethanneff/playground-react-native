import { type NetInfoState } from '@react-native-community/netinfo';
import {
  type AppStateStatus,
  type KeyboardMetrics,
  type ScaledSize,
} from 'react-native';
import {
  type LocationProviderInfo,
  type PowerState,
} from 'react-native-device-info';
import { type RootAction } from 'root-types';
import { type DeepReadonly } from 'ts-essentials';
import { createAction, getType } from 'typesafe-actions';
import { logout } from '../Auth';

/* INTERFACES */
export type DimensionState = {
  screen: ScaledSize;
  window: ScaledSize;
};

export type LocalizeState = {
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

export type DetailsState = {
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
  dimensions: DimensionState | null;
  keyboard: KeyboardMetrics | null;
  localization: LocalizeState | null;
  network: NetInfoState | null;
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
export const setKeyboard = createAction('device/keyboard')<KeyboardMetrics>();

export const deviceActions = {
  setDetails,
  setDimensions,
  setKeyboard,
  setLocalization,
  setNetwork,
  setStatus,
};

/* REDUCERS */
export const deviceInitialState: DeviceState = {
  details: null,
  dimensions: null,
  keyboard: null,
  localization: null,
  network: null,
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
    case getType(setKeyboard):
      return {
        ...state,
        keyboard: action.payload,
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
