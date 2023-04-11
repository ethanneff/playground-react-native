import React, { type PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './store';

const persistor = persistStore(store);

export const ReduxProvider = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
};
