import React, { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { create, ReactTestRenderer } from 'react-test-renderer';
import { store } from '../../redux/core';

type MockRenderer = {
  tree: ReactTestRenderer;
};
type Props = {
  component: ReactNode;
};

export const mockRenderer = ({ component }: Props): MockRenderer => {
  const tree = create(<ReduxProvider store={store}>{component}</ReduxProvider>);
  return { tree };
};
