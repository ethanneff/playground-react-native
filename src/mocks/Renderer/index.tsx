import { renderHook } from '@testing-library/react-hooks';
import { render, RenderAPI } from '@testing-library/react-native';
import React, { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { RootState } from 'root-types';
import { reducers } from '../../redux/store';

type OptionalOptions = {
  initialState?: RootState;
  initialProps?: Record<string, unknown>;
};
type WrapperProps = {
  children?: ReactNode;
};
type WrapperHook = (props: WrapperProps) => unknown;

export const getMockStore = (initialState?: RootState) => {
  if (initialState) return createStore(reducers, initialState);
  return createStore(reducers);
};

export const getMockRender = (
  ui: ReactElement,
  { initialState }: OptionalOptions = {},
): RenderAPI => {
  const store = getMockStore(initialState);
  const Wrapper = ({ children }: WrapperProps) => (
    <Provider store={store}>{children}</Provider>
  );
  return render(ui, { wrapper: Wrapper });
};

export const getMockHook = (
  hook: WrapperHook,
  { initialState, initialProps }: OptionalOptions = {},
) => {
  const store = getMockStore(initialState);
  return renderHook(hook, {
    initialProps,
    wrapper: ({ children }: WrapperProps) => (
      <Provider store={store}>{children}</Provider>
    ),
  });
};
