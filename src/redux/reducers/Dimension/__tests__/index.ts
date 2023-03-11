import { getType } from 'typesafe-actions';
import {
  dimensionInitialState,
  dimensionReducer,
  getHeight,
  getLandscapeOrientation,
  getLargestDimension,
  getSmallestDimension,
  getWidth,
  updateDimension,
} from '..';
import { loginRequest, logout } from '../../Auth';
import { Testing } from './../../../../mocks';

const setupSelectors = () => {
  const dimensionChange = {
    screen: {
      fontScale: 0,
      height: 0,
      scale: 0,
      width: 0,
    },
    window: {
      fontScale: 123,
      height: 456,
      scale: 123,
      width: 123,
    },
  };
  const store = Testing.reduxStore();
  store.dispatch(updateDimension(dimensionChange));
  return store;
};

describe('selectors', () => {
  it('getLandscapeOrientation', () => {
    expect.hasAssertions();
    const store = setupSelectors();
    expect(getLandscapeOrientation(store.getState())).toBe(false);
  });
  it('getLargestDimension', () => {
    expect.hasAssertions();
    const store = setupSelectors();
    expect(getLargestDimension(store.getState())).toBe(456);
  });
  it('getSmallestDimension', () => {
    expect.hasAssertions();
    const store = setupSelectors();
    expect(getSmallestDimension(store.getState())).toBe(123);
  });
  it('getHeight', () => {
    expect.hasAssertions();
    const store = setupSelectors();
    expect(getHeight(store.getState())).toBe(456);
  });
  it('getWidth', () => {
    expect.hasAssertions();
    const store = setupSelectors();
    expect(getWidth(store.getState())).toBe(123);
  });
});

describe('selectors with no initial state', () => {
  it('getLandscapeOrientation null', () => {
    expect.hasAssertions();
    const store = Testing.reduxStore();
    expect(getLandscapeOrientation(store.getState())).toBe(false);
  });
  it('getSmallestDimension null', () => {
    expect.hasAssertions();
    const store = Testing.reduxStore();
    expect(getSmallestDimension(store.getState())).toBe(750);
  });
  it('getLargestDimension null', () => {
    expect.hasAssertions();
    const store = Testing.reduxStore();
    expect(getLargestDimension(store.getState())).toBe(1334);
  });
  it('getHeight null', () => {
    expect.hasAssertions();
    const store = Testing.reduxStore();
    expect(getHeight(store.getState())).toBe(1334);
  });
  it('getWidth null', () => {
    expect.hasAssertions();
    const store = Testing.reduxStore();
    expect(getWidth(store.getState())).toBe(750);
  });
});
describe('actions', () => {
  it('updateDimension action', () => {
    expect.hasAssertions();
    const size = {
      fontScale: 1,
      height: 1,
      scale: 1,
      width: 1,
    };
    const payload = { screen: size, window: size };
    const expectedAction = {
      payload,
      type: getType(updateDimension),
    };
    expect(updateDimension(payload)).toStrictEqual(expectedAction);
  });

  it('updateDimension', () => {
    expect.hasAssertions();
    const size = {
      fontScale: 123,
      height: 123,
      scale: 123,
      width: 123,
    };
    const data = {
      screen: size,
      window: size,
    };
    expect(
      dimensionReducer(dimensionInitialState, {
        payload: data,
        type: getType(updateDimension),
      }),
    ).toMatchObject({
      ...dimensionInitialState,
      screen: size,
      window: size,
    });
  });

  it('logout', () => {
    expect.hasAssertions();
    expect(
      dimensionReducer(dimensionInitialState, {
        type: getType(logout),
      }),
    ).toMatchObject(dimensionInitialState);
  });

  it('loginRequest', () => {
    expect.hasAssertions();
    expect(
      dimensionReducer(undefined, {
        type: getType(loginRequest),
      }),
    ).toMatchObject(dimensionInitialState);
  });
});
