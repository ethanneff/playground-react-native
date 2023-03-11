import mockRNNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
import '@testing-library/jest-native/extend-expect';
import { NativeModules } from 'react-native';
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';
import 'react-native-gesture-handler/jestSetup';
import 'react-native-get-random-values';
import mockRNLocalize from 'react-native-localize/mock';
import { mockGoBack, mockNavigate } from '../src/mocks/Navigation';

jest.mock('react-native-sensors', () => null);
jest.mock('react-native-config', () => ({
  APP: null,
  GOOGLE_SIGN_IN: null,
  DISABLE_ESLINT_PLUGIN: null,
}));
jest.mock('react-native-rate', () => ({
  AndroidMarket: { Google: null },
}));
jest.mock('d3-scale', () => null);
jest.mock('d3-shape', () => null);
jest.mock('uuid', () => ({ v4: jest.fn(() => 'uuid') }));
jest.mock('react-native-localize', () => mockRNLocalize);
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
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
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
