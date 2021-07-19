import {getType} from 'typesafe-actions';
import {
  changeTheme,
  getCurrentTheme,
  themeInitialState,
  themeReducer,
} from '..';
import {store} from '../../../providers';
import {loginRequest, logout} from '../../Auth';

describe('theme', () => {
  it('getCurrentTheme dark', () => {
    expect.hasAssertions();
    store.dispatch(changeTheme('dark'));
    expect(getCurrentTheme(store.getState())).toMatchObject({
      primary: 'hsl(263, 84%, 75%)',
    });
  });

  it('getCurrentTheme light', () => {
    expect.hasAssertions();
    store.dispatch(changeTheme('light'));
    expect(getCurrentTheme(store.getState())).toMatchObject({
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
