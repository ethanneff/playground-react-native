import { AppState, type AppStateStatus } from 'react-native';
import {
  type LocationProviderInfo,
  type PowerState,
} from 'react-native-device-info';
import {
  type Calendar,
  type Locale,
  type NumberFormatSettings,
  type TemperatureUnit,
} from 'react-native-localize';
import { type RootAction } from 'root-types';
import { type DeepReadonly } from 'ts-essentials';
import { createAction, getType } from 'typesafe-actions';
import { logout } from '../Auth';

/* INTERFACES */
export type DeviceData = DeepReadonly<{
  androidId: string;
  apiLevel: number;
  applicationName: string;
  availableLocationProviders: LocationProviderInfo;
  baseOs: string;
  batteryLevel: number;
  bootloader: string;
  brand: string;
  buildId: string;
  buildNumber: string;
  bundleId: string;
  calendar: Calendar;
  carrier: string;
  codename: string;
  country: string;
  currencies: string[];
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
  hardware: string;
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
  isEmulator: boolean;
  isHeadphonesConnected: boolean;
  isLandscape: boolean;
  isLocationEnabled: boolean;
  isPinOrFingerprintSet: boolean;
  isTablet: boolean;
  lastUpdateTime: number;
  locales: Locale[];
  macAddress: string;
  manufacturer: string;
  maxMemory: number;
  model: string;
  numberFormatSettings: NumberFormatSettings;
  phoneNumber: string;
  powerState: Partial<PowerState> | null;
  previewSdkInt: number;
  product: string;
  readableVersion: string;
  securityPatch: string;
  serialNumber: string;
  supported32BitAbis: string[];
  supported64BitAbis: string[];
  supportedAbis: string[];
  syncUniqueId: string;
  systemAvailableFeatures: string[];
  systemName: string;
  systemVersion: string;
  tags: string;
  temperatureUnit: TemperatureUnit;
  timezone: string;
  totalDiskCapacity: number;
  totalMemory: number;
  type: string;
  uniqueId: string;
  usedMemory: number;
  userAgent: string;
  uses24HourClock: boolean;
  usesAutoDateAndTime: boolean | undefined;
  usesAutoTimeZone: boolean | undefined;
  usesMetricSystem: boolean;
  version: string;
}>;

type DeviceState = DeepReadonly<
  DeviceData & {
    appStatus: AppStateStatus;
    keyboardHeight: number;
    keyboardVisible: boolean;
  }
>;

/* ACTIONS */
export const loadDevice = createAction('device/load')<DeviceData>();
export const changeAppStatus = createAction('device/update')<AppStateStatus>();
export const changeKeyboardStatus =
  createAction('device/setKeyboard')<number>();

export const deviceActions = {
  changeAppStatus,
  changeKeyboardStatus,
  loadDevice,
};

/* REDUCERS */
export const deviceInfoInitialState: DeviceData = {
  androidId: '',
  apiLevel: 0,
  applicationName: '',
  availableLocationProviders: {},
  baseOs: '',
  batteryLevel: 0,
  bootloader: '',
  brand: '',
  buildId: '',
  buildNumber: '',
  bundleId: '',
  calendar: 'gregorian',
  carrier: '',
  codename: '',
  country: '',
  currencies: [],
  device: '',
  deviceId: '',
  deviceName: '',
  deviceToken: '',
  deviceType: '',
  display: '',
  fingerprint: '',
  firstInstallTime: 0,
  fontScale: 0,
  freeDiskStorage: 0,
  hardware: '',
  hasGms: false,
  hasHms: false,
  hasNotch: false,
  host: '',
  incremental: '',
  installReferrer: '',
  installerPackageName: '',
  instanceId: '',
  ipAddress: '',
  isAirplaneMode: false,
  isBatteryCharging: false,
  isCameraPresent: false,
  isEmulator: false,
  isHeadphonesConnected: false,
  isLandscape: false,
  isLocationEnabled: false,
  isPinOrFingerprintSet: false,
  isTablet: false,
  lastUpdateTime: 0,
  locales: [
    {
      countryCode: 'US',
      isRTL: false,
      languageCode: 'en',
      languageTag: 'en-US',
    },
  ],
  macAddress: '',
  manufacturer: '',
  maxMemory: 0,
  model: '',
  numberFormatSettings: {
    decimalSeparator: '.',
    groupingSeparator: ',',
  },
  phoneNumber: '',
  powerState: null,
  previewSdkInt: 0,
  product: '',
  readableVersion: '',
  securityPatch: '',
  serialNumber: '',
  supported32BitAbis: [],
  supported64BitAbis: [],
  supportedAbis: [],
  syncUniqueId: '',
  systemAvailableFeatures: [],
  systemName: '',
  systemVersion: '',
  tags: '',
  temperatureUnit: 'fahrenheit',
  timezone: '',
  totalDiskCapacity: 0,
  totalMemory: 0,
  type: '',
  uniqueId: '',
  usedMemory: 0,
  userAgent: '',
  uses24HourClock: false,
  usesAutoDateAndTime: false,
  usesAutoTimeZone: false,
  usesMetricSystem: false,
  version: '',
};
export const deviceInitialState: DeviceState = {
  ...deviceInfoInitialState,
  appStatus: AppState.currentState,
  keyboardHeight: 0,
  keyboardVisible: false,
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
        keyboardHeight: action.payload,
        keyboardVisible: action.payload > 0,
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
