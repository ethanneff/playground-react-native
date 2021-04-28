import {getType} from 'typesafe-actions';
import {
  changeTheme,
  getCurrentColor,
  themeInitialState,
  themeReducer,
} from '..';
import {store} from '../../../providers';
import {loginRequest, logout} from '../../Auth';

describe('theme', () => {
  it('getCurrentColor dark', () => {
    expect.hasAssertions();
    store.dispatch(changeTheme('dark'));
    expect(getCurrentColor(store.getState())).toMatchObject({
      primary: 'hsl(263, 84%, 75%)',
    });
  });

  it('getCurrentColor light', () => {
    expect.hasAssertions();
    store.dispatch(changeTheme('light'));
    expect(getCurrentColor(store.getState())).toMatchObject({
      primary: 'hsl(211, 100%, 50%)',
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
    ).toMatchObject({currentColor: payload});
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
