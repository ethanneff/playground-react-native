import { NativeModules } from 'react-native';
import 'react-native-gesture-handler/jestSetup';
import 'react-native-get-random-values';
import { mockGoBack, mockNavigate } from '../Navigation';

jest.mock('react-native-localize', () => ({
  getLocales: () => [
    {
      countryCode: 'GB',
      languageTag: 'en-GB',
      languageCode: 'en',
      isRTL: false,
    },
    {
      countryCode: 'US',
      languageTag: 'en-US',
      languageCode: 'en',
      isRTL: false,
    },
    {
      countryCode: 'FR',
      languageTag: 'fr-FR',
      languageCode: 'fr',
      isRTL: false,
    },
  ],
  getNumberFormatSettings: () => ({
    decimalSeparator: '.',
    groupingSeparator: ',',
  }),
  getCalendar: () => 'gregorian',
  getCountry: () => 'US',
  getCurrencies: () => ['USD', 'EUR'],
  getTemperatureUnit: () => 'celsius',
  getTimeZone: () => 'Europe/Paris',
  uses24HourClock: () => true,
  usesMetricSystem: () => true,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
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

  return {
    GoogleSignin: {
      configure: jest.fn(),
      hasPlayServices: jest.fn(() => Promise.resolve(true)),
      signIn: jest.fn(() => Promise.resolve(mockUserInfo)),
      signInSilently: jest.fn(() => Promise.resolve(mockUserInfo)),
      revokeAccess: jest.fn(() => Promise.resolve(true)),
      signOut: jest.fn(() => Promise.resolve(true)),
    },
  };
});

jest.mock('@react-native-firebase/crashlytics', () => () => ({
  log: jest.fn(),
}));

jest.mock('@react-native-firebase/auth', () => () => ({
  signOut: jest.fn(),
  currentUser: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  signInAnonymously: jest.fn(),
  signInWithCredential: jest.fn(),
  signInWithPhoneNumber: jest.fn(),
}));

jest.mock('@react-native-firebase/firestore', () => () => ({
  collection: jest.fn(),
}));

jest.mock('@react-native-firebase/analytics', () => () => ({
  logEvent: jest.fn(),
  setUserProperties: jest.fn(),
  setUserId: jest.fn(),
  setCurrentScreen: jest.fn(),
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

global.__reanimatedWorkletInit = jest.fn();

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
