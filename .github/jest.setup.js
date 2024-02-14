import mockRNNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
import '@testing-library/jest-native/extend-expect';
import { NativeModules } from 'react-native';
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';
import 'react-native-gesture-handler/jestSetup';
import 'react-native-get-random-values';
import { mockGoBack, mockNavigate } from '../src/mocks/Navigation';

jest.mock('react-native-code-push', () => {
  const cp = () => (app) => app;
  Object.assign(cp, {
    InstallMode: {},
    CheckFrequency: {
      MANUAL: undefined,
      ON_APP_START: undefined,
      ON_APP_RESUME: undefined,
    },
    SyncStatus: {},
    UpdateState: {},
    DeploymentStatus: {},
    DEFAULT_UPDATE_DIALOG: {},
    allowRestart: jest.fn(),
    checkForUpdate: jest.fn(() => Promise.resolve(undefined)),
    disallowRestart: jest.fn(),
    getCurrentPackage: jest.fn(() => Promise.resolve(undefined)),
    getUpdateMetadata: jest.fn(() => Promise.resolve(undefined)),
    notifyAppReady: jest.fn(() => Promise.resolve()),
    restartApp: jest.fn(),
    sync: jest.fn(() => Promise.resolve(1)),
    clearUpdates: jest.fn(),
  });
  return cp;
});
jest.mock(
  'react-native-fbsdk-next',
  () => require('react-native-fbsdk-next/jest/mocks').default,
);
jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});
jest.mock('react-native-sensors', () => undefined);
jest.mock('react-native-config', () => ({
  APP: undefined,
  GOOGLE_SIGN_IN: undefined,
  DISABLE_ESLINT_PLUGIN: undefined,
  FACEBOOK_APP_ID: undefined,
}));
jest.mock('react-native-rate', () => ({
  AndroidMarket: { Google: undefined },
}));
jest.mock('d3-scale', () => undefined);
jest.mock('d3-shape', () => undefined);
jest.mock('lottie-react-native', () => undefined);
jest.mock('uuid', () => ({ v4: jest.fn(() => 'uuid') }));
jest.mock('react-native-localize', () => ({
  getCountry: jest.fn(() => 'US'),
  getLocales: jest.fn(() => ['en-US']),
  getTimeZone: jest.fn(() => 'America/New_York'),
  uses24HourClock: jest.fn(() => true),
  getCalendar: jest.fn(() => 'gregorian'),
  getCurrencies: jest.fn(() => ['USD']),
  getLocales: jest.fn(() => ['en-US']),
  getNumberFormatSettings: jest.fn(() => ({})),
  getTemperatureUnit: jest.fn(() => 'celsius'),
  getTimeZone: jest.fn(() => 'America/New_York'),
  uses24HourClock: jest.fn(() => true),
  usesAutoDateAndTime: jest.fn(() => true),
  usesAutoTimeZone: jest.fn(() => true),
  usesMetricSystem: jest.fn(() => true),
}));
jest.mock('@react-native-community/netinfo', () => mockRNNetInfo);
jest.mock('react-native-device-info', () => mockRNDeviceInfo);
jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: jest.fn().mockImplementation(({ children }) => children),
    SafeAreaConsumer: jest
      .fn()
      .mockImplementation(({ children }) => children(inset)),
    SafeAreaView: jest.fn().mockImplementation(({ children }) => children),
    useSafeAreaInsets: jest.fn().mockImplementation(() => inset),
  };
});
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
    getState: () => ({ routes: [] }),
    goBack: mockGoBack,
    navigate: mockNavigate,
  }),
}));
jest.mock('@invertase/react-native-apple-authentication', () => () => ({
  appleAuth: jest.fn(),
}));
jest.mock('@react-native-google-signin/google-signin', () => {
  const mockUserInfo = {
    accessToken: undefined,
    accessTokenExpirationDate: undefined,
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
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => false;
  return Reanimated;
});

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
