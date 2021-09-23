import { NativeModules } from 'react-native';
import 'react-native-gesture-handler/jestSetup';

jest.mock('@invertase/react-native-apple-authentication', () => () => ({
  appleAuth: jest.fn(),
}));

const mockUserInfo = {
  idToken: 'mockIdToken',
  accessToken: null,
  accessTokenExpirationDate: null,
  serverAuthCode: 'mockServerAuthCode',
  scopes: [],
  user: {
    email: 'mockEmail',
    id: 'mockId',
    givenName: 'mockGivenName',
    familyName: 'mockFamilyName',
    photo: 'mockPhotoUtl',
    name: 'mockFullName',
  },
};

jest.mock('@react-native-community/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(() => Promise.resolve(true)),
    signIn: jest.fn(() => Promise.resolve(mockUserInfo)),
    signInSilently: jest.fn(() => Promise.resolve(mockUserInfo)),
    revokeAccess: jest.fn(() => Promise.resolve(true)),
    signOut: jest.fn(() => Promise.resolve(true)),
  },
}));

jest.mock('@react-native-firebase/analytics', () => () => ({
  logEvent: jest.fn(),
  setUserProperties: jest.fn(),
  setUserId: jest.fn(),
  setCurrentScreen: jest.fn(),
}));

jest.mock('react-native-sound', () => {
  return class Mock {
    constructor() {}
    setVolume = jest.fn();
    setNumberOfLoops = jest.fn();
    play = jest.fn();
    stop = jest.fn();
    static setCategory = jest.fn();
  };
});

jest.mock('react-native-device-info', () => ({
  getAPILevel: jest.fn(),
  getApplicationName: jest.fn(),
  getBatteryLevel: jest.fn(() => Promise.resolve(1)),
  getBrand: jest.fn(),
  getBuildNumber: jest.fn(),
  getBundleId: jest.fn(),
  getCarrier: jest.fn(),
  getDeviceCountry: jest.fn(),
  getDeviceId: jest.fn(),
  getDeviceLocale: jest.fn(),
  getDeviceName: jest.fn(),
  getFirstInstallTime: jest.fn(),
  getFontScale: jest.fn(),
  getFreeDiskStorage: jest.fn(),
  getInstallReferrer: jest.fn(),
  getInstanceID: jest.fn(),
  getLastUpdateTime: jest.fn(),
  getManufacturer: jest.fn(),
  getMaxMemory: jest.fn(),
  getModel: jest.fn(),
  getPhoneNumber: jest.fn(),
  getReadableVersion: jest.fn(),
  getSerialNumber: jest.fn(),
  getSystemName: jest.fn(),
  getSystemVersion: jest.fn(),
  getTimezone: jest.fn(() => 'America/Los_Angeles'),
  getTotalDiskCapacity: jest.fn(),
  getTotalMemory: jest.fn(),
  getUniqueID: jest.fn(),
  getUserAgent: jest.fn(),
  getVersion: jest.fn(),
  is24Hour: jest.fn(),
  isEmulator: jest.fn(),
  isPinOrFingerprintSet: jest.fn(),
  isTablet: jest.fn(() => false),
}));

NativeModules.RNCNetInfo = {
  addListener: jest.fn(),
  getCurrentState: jest.fn(() => Promise.resolve()),
  removeListeners: jest.fn(),
};

NativeModules.RNCAsyncStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeChecklistItem: jest.fn(),
  mergeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
  flushGetRequests: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
  multiRemove: jest.fn(),
  multiMerge: jest.fn(),
};

jest.useFakeTimers();

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
