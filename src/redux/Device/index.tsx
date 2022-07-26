import { AppState, AppStateStatus, ScaledSize } from 'react-native';
import { LocationProviderInfo, PowerState } from 'react-native-device-info';
import {
  Calendar,
  Locale,
  NumberFormatSettings,
  TemperatureUnit,
} from 'react-native-localize';
import { RootAction } from 'root-types';
import { createAction, getType } from 'typesafe-actions';
import { logout } from '../Auth';

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
  screen: ScaledSize;
  window: ScaledSize;
}

export interface DeviceInfo {
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
  supported32BitAbis: ReadonlyArray<string>;
  supported64BitAbis: ReadonlyArray<string>;
  supportedAbis: ReadonlyArray<string>;
  syncUniqueId: string;
  systemAvailableFeatures: ReadonlyArray<string>;
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
}

export type DeviceState = {
  appStatus: AppStateStatus;
  keyboardHeight: number;
  keyboardVisible: boolean;
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
  numberFormatSettings: {
    decimalSeparator: '.',
    groupingSeparator: ',',
  },
  calendar: 'gregorian',
  country: '',
  locales: [
    {
      countryCode: 'US',
      languageTag: 'en-US',
      languageCode: 'en',
      isRTL: false,
    },
  ],
  currencies: [],
  temperatureUnit: 'fahrenheit',
  timezone: '',
  uses24HourClock: false,
  usesMetricSystem: false,
  usesAutoDateAndTime: false,
  usesAutoTimeZone: false,
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
  maxMemory: 0,
  model: '',
  phoneNumber: '',
  powerState: null,
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
  totalMemory: 0,
  uniqueId: '',
  usedMemory: 0,
  userAgent: '',
  version: '',
  hasGms: false,
  hasHms: false,
  hasNotch: false,
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
