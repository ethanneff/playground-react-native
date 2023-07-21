import { renderHook } from '@testing-library/react-hooks';
import { render, type RenderAPI } from '@testing-library/react-native';
import React, { type PropsWithChildren, type ReactElement } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore, type Store } from 'redux';
import { type RootState } from 'root-types';
import { ErrorBoundary } from '../../components';
import { GestureHandlerProvider } from '../../conversions';
import { ApplicationProvider } from '../../features';
import { reducers } from '../../redux/store';

type OptionalOptions<TProps> = {
  initialProps?: TProps;
  initialState?: RootState;
};

type ProviderProps = PropsWithChildren & {
  readonly store: Store<RootState>;
};

const Providers = ({ children, store }: ProviderProps) => (
  <SafeAreaProvider>
    <GestureHandlerProvider style={{ flex: 1 }}>
      <ReduxProvider store={store}>
        <ErrorBoundary>
          <ApplicationProvider>{children}</ApplicationProvider>
        </ErrorBoundary>
      </ReduxProvider>
    </GestureHandlerProvider>
  </SafeAreaProvider>
);

export const Testing = {
  reduxStore: (preloadedState?: RootState) => {
    if (preloadedState) return createStore(reducers, preloadedState);
    return createStore(reducers);
  },
  renderComponent: <TProps,>(
    ui: ReactElement,
    options: OptionalOptions<TProps> = {},
  ): RenderAPI => {
    const store = Testing.reduxStore(options.initialState);
    const wrapper = ({ children }: PropsWithChildren) => (
      <Providers store={store}>{children}</Providers>
    );
    return render(ui, { wrapper });
  },
  renderHook: <TResult, TProps extends PropsWithChildren>(
    hook: (props: TProps) => TResult,
    options: OptionalOptions<TProps> = {},
  ) => {
    const store = Testing.reduxStore(options.initialState);
    const wrapper = ({ children }: PropsWithChildren) => (
      <Providers store={store}>{children}</Providers>
    );
    return renderHook(hook, { initialProps: options.initialProps, wrapper });
  },
};
