import { fireEvent, screen } from '@testing-library/react-native';
import React from 'react';
import { type RootState } from 'root-types';
import { Template } from '..';
import { mockGoBack, Testing } from '../../../../mocks';

describe('template', () => {
  it('handles component state', () => {
    expect.hasAssertions();
    Testing.renderComponent(<Template />);
    fireEvent.press(screen.getByText('INCREASE'));
    expect(screen.getByText('1')).toBeVisible();
  });

  it('handles redux state change', () => {
    expect.hasAssertions();
    const store = Testing.reduxStore();
    const state = store.getState();
    const initialState: RootState = {
      ...state,
      theme: { ...state.theme, currentTheme: 'dark' },
    };
    Testing.renderComponent(<Template />, { initialState });
    fireEvent.press(screen.getByText('TOGGLE THEME'));
    expect(screen.getByText(/Theme color: light/iu)).toBeVisible();
  });

  it('handles navigation', () => {
    expect.hasAssertions();
    Testing.renderComponent(<Template />);
    fireEvent.press(screen.getByTestId('leftNav'));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
    mockGoBack.mockReset();
  });
});
