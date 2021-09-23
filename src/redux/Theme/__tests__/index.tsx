import { getType } from 'typesafe-actions';
import {
  changeTheme,
  getCurrentTheme,
  themeInitialState,
  themeReducer,
} from '..';
import { loginRequest, logout } from '../../Auth';
import { store } from '../../core';

describe('theme', () => {
  it('getCurrentTheme dark', () => {
    expect.hasAssertions();
    store.dispatch(changeTheme('dark'));
    expect(getCurrentTheme(store.getState())).toMatchObject({
      statusBar: 'light-content',
    });
  });

  it('getCurrentTheme light', () => {
    expect.hasAssertions();
    store.dispatch(changeTheme('light'));
    expect(getCurrentTheme(store.getState())).toMatchObject({
      statusBar: 'dark-content',
    });
  });

  it('changeTheme', () => {
    expect.hasAssertions();
    const payload = 'dark';
    expect(
      themeReducer(themeInitialState, {
        payload,
        type: getType(changeTheme),
      }),
    ).toMatchObject({ currentTheme: payload });
  });

  it('logout', () => {
    expect.hasAssertions();
    expect(
      themeReducer(themeInitialState, {
        type: getType(logout),
      }),
    ).toMatchObject(themeInitialState);
  });

  it('loginRequest', () => {
    expect.hasAssertions();
    expect(
      themeReducer(undefined, {
        type: getType(loginRequest),
      }),
    ).toMatchObject(themeInitialState);
  });
});
