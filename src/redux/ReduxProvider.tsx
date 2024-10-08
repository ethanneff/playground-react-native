import React, { type ReactNode } from 'react';
import DeviceInfo from 'react-native-device-info';
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import thunk from 'redux-thunk';
import { Storage } from '../conversions';
import { reducers } from './store';

type Properties = {
  readonly children: ReactNode;
};

const blacklist = ['gameOfLife', 'history'];
const key = DeviceInfo.getBundleId() || '123';
const persistConfig = { blacklist, key, storage: Storage };
const persistedReducer = persistReducer(persistConfig, reducers);
const middleware = [thunk];

const store = createStore(persistedReducer, applyMiddleware(...middleware));
export const persistor = persistStore(store);

export const ReduxProvider = ({ children }: Properties) => (
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}
    >
      {children}
    </PersistGate>
  </Provider>
);
