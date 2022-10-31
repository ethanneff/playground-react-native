import '@testing-library/jest-native/extend-expect';
import { NativeModules } from 'react-native';
import 'react-native-gesture-handler/jestSetup';
import 'react-native-get-random-values';
// @ts-ignore:next-line
import { setUpTests } from 'react-native-reanimated/lib/reanimated2/jestUtils';
import { mockGoBack, mockNavigate } from '../Navigation';

setUpTests();

jest.mock('react-native-sensors', () => null);
jest.mock('d3-scale', () => null);
jest.mock('d3-shape', () => null);
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid'),
}));

jest.mock('react-native-localize', () => ({
  addEventListener: jest.fn(),
  getCalendar: () => 'gregorian',
  getCountry: () => 'US',
  getCurrencies: () => ['USD', 'EUR'],
  getLocales: () => [
    {
      countryCode: 'GB',
      isRTL: false,
      languageCode: 'en',
      languageTag: 'en-GB',
    },
    {
      countryCode: 'US',
      isRTL: false,
      languageCode: 'en',
      languageTag: 'en-US',
    },
    {
      countryCode: 'FR',
      isRTL: false,
      languageCode: 'fr',
      languageTag: 'fr-FR',
    },
  ],
  getNumberFormatSettings: () => ({
    decimalSeparator: '.',
    groupingSeparator: ',',
  }),
  getTemperatureUnit: () => 'celsius',
  getTimeZone: () => 'Europe/Paris',
  removeEventListener: jest.fn(),
  uses24HourClock: () => true,
  usesMetricSystem: () => true,
}));

jest.mock('react-native-mmkv-storage', () => ({
  MMKVLoader: class Mock {
    constructor() {}

    withEncryption = () => this;

    initialize = () => this;

    getItem = () => Promise.resolve(jest.fn());

    setItem = () => Promise.resolve(jest.fn());
  },
}));

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual('@react-navigation/core'),
  useFocusEffect: () => jest.fn(),
  useNavigation: () => ({
    getState: () => ({
      routes: [],
    }),
    goBack: mockGoBack,
    navigate: mockNavigate,
  }),
}));

jest.mock('@invertase/react-native-apple-authentication', () => () => ({
  appleAuth: jest.fn(),
}));

jest.mock('@react-native-google-signin/google-signin', () => {
  const mockUserInfo = {
    accessToken: null,
    accessTokenExpirationDate: null,
    idToken: 'mockIdToken',
    scopes: [],
    serverAuthCode: 'mockServerAuthCode',
    user: {
      email: 'mockEmail',
      familyName: 'mockFamilyName',
      givenName: 'mockGivenName',
      id: 'mockId',
      name: 'mockFullName',
      photo: 'mockPhotoUtl',
    },
  };

  return {
    GoogleSignin: {
      configure: jest.fn(),
      hasPlayServices: jest.fn(() => Promise.resolve(true)),
      revokeAccess: jest.fn(() => Promise.resolve(true)),
      signIn: jest.fn(() => Promise.resolve(mockUserInfo)),
      signInSilently: jest.fn(() => Promise.resolve(mockUserInfo)),
      signOut: jest.fn(() => Promise.resolve(true)),
    },
  };
});

jest.mock('@react-native-firebase/crashlytics', () => () => ({
  log: jest.fn(),
}));

jest.mock('@react-native-firebase/auth', () => () => ({
  createUserWithEmailAndPassword: jest.fn(),
  currentUser: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  signInAnonymously: jest.fn(),
  signInWithCredential: jest.fn(),
  signInWithPhoneNumber: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('@react-native-firebase/firestore', () => () => ({
  collection: jest.fn(),
}));

jest.mock('@react-native-firebase/analytics', () => () => ({
  logEvent: jest.fn(),
  setCurrentScreen: jest.fn(),
  setUserId: jest.fn(),
  setUserProperties: jest.fn(),
}));

jest.mock(
  'react-native-sound',
  () =>
    class Mock {
      constructor() {}

      setVolume = jest.fn();

      setNumberOfLoops = jest.fn();

      play = jest.fn();

      stop = jest.fn();

      static setCategory = jest.fn();
    },
);

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

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

NativeModules.RNCNetInfo = {
  addListener: jest.fn(),
  getCurrentState: jest.fn(() => Promise.resolve()),
  removeListeners: jest.fn(),
};

NativeModules.RNCAsyncStorage = {
  clear: jest.fn(),
  flushGetRequests: jest.fn(),
  getAllKeys: jest.fn(),
  getItem: jest.fn(),
  mergeItem: jest.fn(),
  multiGet: jest.fn(),
  multiMerge: jest.fn(),
  multiRemove: jest.fn(),
  multiSet: jest.fn(),
  removeChecklistItem: jest.fn(),
  setItem: jest.fn(),
};

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
