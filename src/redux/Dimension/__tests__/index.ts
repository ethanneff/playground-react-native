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
import { store } from '../../core';

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
  store.dispatch(updateDimension(dimensionChange));
};

describe('selectors', () => {
  it('getLandscapeOrientation', () => {
    expect.hasAssertions();
    setupSelectors();
    expect(getLandscapeOrientation(store.getState())).toBe(false);
  });
  it('getLargestDimension', () => {
    expect.hasAssertions();
    setupSelectors();
    expect(getLargestDimension(store.getState())).toBe(456);
  });
  it('getSmallestDimension', () => {
    expect.hasAssertions();
    setupSelectors();
    expect(getSmallestDimension(store.getState())).toBe(123);
  });
  it('getHeight', () => {
    expect.hasAssertions();
    setupSelectors();
    expect(getHeight(store.getState())).toBe(456);
  });
  it('getWidth', () => {
    expect.hasAssertions();
    setupSelectors();
    expect(getWidth(store.getState())).toBe(123);
  });
});

describe('selectors with no initial state', () => {
  it('getLandscapeOrientation null', () => {
    expect.hasAssertions();
    expect(getLandscapeOrientation(store.getState())).toBe(false);
  });
  it('getSmallestDimension null', () => {
    expect.hasAssertions();
    expect(getSmallestDimension(store.getState())).toBe(123);
  });
  it('getLargestDimension null', () => {
    expect.hasAssertions();
    expect(getLargestDimension(store.getState())).toBe(456);
  });
  it('getHeight null', () => {
    expect.hasAssertions();
    expect(getHeight(store.getState())).toBe(456);
  });
  it('getWidth null', () => {
    expect.hasAssertions();
    expect(getWidth(store.getState())).toBe(123);
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
    const payload = { window: size, screen: size };
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
