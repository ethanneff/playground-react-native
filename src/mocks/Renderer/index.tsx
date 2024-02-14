import { renderHook } from '@testing-library/react-hooks';
import { render, type RenderAPI } from '@testing-library/react-native';
import React, { type PropsWithChildren, type ReactElement } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore, type Store } from 'redux';
import { type RootState } from 'root-types';
import { GestureHandlerProvider } from '../../conversions';
import { ApplicationProvider } from '../../features';
import { reducers } from '../../redux/store';

type OptionalOptions<TProperties> = {
  initialProps?: TProperties;
  initialState?: RootState;
};

type ProviderProperties = PropsWithChildren & {
  readonly store: Store<RootState>;
};

const Providers = ({ children, store }: ProviderProperties) => (
  <SafeAreaProvider>
    <GestureHandlerProvider style={{ flex: 1 }}>
      <ReduxProvider store={store}>
        <ApplicationProvider>{children}</ApplicationProvider>
      </ReduxProvider>
    </GestureHandlerProvider>
  </SafeAreaProvider>
);

export const Testing = {
  reduxStore: (preloadedState?: RootState) =>
    // eslint-disable-next-line etc/no-deprecated
    createStore(reducers, preloadedState),
  renderComponent: <TProperties,>(
    ui: ReactElement,
    options: OptionalOptions<TProperties> = {},
  ): RenderAPI => {
    const store = Testing.reduxStore(options.initialState);
    const wrapper = ({ children }: PropsWithChildren) => (
      <Providers store={store}>{children}</Providers>
    );
    return render(ui, { wrapper });
  },
  renderHook: <TResult, TProperties extends PropsWithChildren>(
    hook: (properties: TProperties) => TResult,
    options: OptionalOptions<TProperties> = {},
  ) => {
    const store = Testing.reduxStore(options.initialState);
    const wrapper = ({ children }: PropsWithChildren) => (
      <Providers store={store}>{children}</Providers>
    );
    return renderHook(hook, { initialProps: options.initialProps, wrapper });
  },
};
