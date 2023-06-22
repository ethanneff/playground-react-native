import axios from 'axios';
import {
  type RootAction,
  type RootState,
  type RootThunkAction,
} from 'root-types';
import { createAction, getType } from 'typesafe-actions';
import { z } from 'zod';

/* ACTIONS */
export const loginRequest = createAction('auth/login/request')();
export const loginSuccess = createAction('auth/login/success')<string>();
export const loginFailure = createAction('auth/login/failure')<Error>();
export const registerRequest = createAction('auth/register/request')();
export const registerSuccess = createAction('auth/register/success')<string>();
export const registerFailure = createAction('auth/register/failure')<Error>();
export const logout = createAction('auth/logout')();

const timeout = 5000;

/* ACTION CREATORS */
export const onLogin = (): RootThunkAction<void> => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const res = await axios({
      data: {
        email: 'sydney@fife',
        password: 'pistol',
      },
      method: 'post',
      timeout,
      url: 'https://reqres.in/api/login',
    });
    const loginSchema = z.object({ token: z.string() });
    const data = loginSchema.parse(res.data);
    dispatch(loginSuccess(data.token));
  } catch (e) {
    if (e instanceof Error) dispatch(loginFailure(e));
  }
};
export const onRegister = (): RootThunkAction<void> => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const res = await axios({
      data: {
        email: 'sydney@fife',
        password: 'pistol',
      },
      method: 'post',
      timeout,
      url: 'https://reqres.in/api/register',
    });
    const registerScheme = z.object({
      id: z.number(),
      token: z.string(),
    });
    const data = registerScheme.parse(res.data);
    dispatch(loginSuccess(data.token));
  } catch (e) {
    if (e instanceof Error) dispatch(loginFailure(e));
  }
};
export const onLogout = (): RootThunkAction<void> => (dispatch, getState) => {
  const { token } = getState().auth;
  dispatch(logout());
  axios({
    data: {
      token,
    },
    method: 'post',
    timeout,
    url: 'https://reqres.in/api/logout',
  });
};

export const authActions = {
  loginFailure,
  loginRequest,
  loginSuccess,
  logout,
  registerFailure,
  registerRequest,
  registerSuccess,
};

/* SELECTORS */
export const getAuthToken = (state: RootState): string | undefined =>
  state.auth.token;
export const getAuthLoading = (state: RootState): boolean => state.auth.loading;

/* INTERFACES */
type AuthState = {
  error?: string;
  loading: boolean;
  token?: string;
};

/* REDUCERS */
export const authInitialState: AuthState = {
  loading: false,
};
export const authReducer = (
  state: AuthState = authInitialState,
  action: RootAction,
): AuthState => {
  switch (action.type) {
    case getType(loginRequest):
    case getType(registerRequest):
      return {
        ...state,
        loading: true,
      };
    case getType(loginFailure):
    case getType(registerFailure):
      return {
        ...state,
        error: action.payload.message,
        loading: false,
      };
    case getType(loginSuccess):
    case getType(registerSuccess):
      return {
        ...state,
        loading: false,
        token: action.payload,
      };
    case getType(logout):
      return authInitialState;
    default:
      return state;
  }
};
