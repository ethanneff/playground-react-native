import { configureStore } from '@reduxjs/toolkit';
/* eslint-disable no-restricted-imports */
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
/* eslint-enable no-restricted-imports */
import { type AnyAction, type Middleware } from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { type ThunkAction } from 'redux-thunk';
import { getFlipperMiddleware } from './getFlipperMiddleware';
import { persistedReducer } from './persistor';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(getFlipperMiddleware()),
  reducer: persistedReducer,
});

export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppMiddleware = Middleware<void, AppState, AppDispatch>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  AnyAction
>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
