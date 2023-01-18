import { fireEvent, screen } from '@testing-library/react-native';
import React from 'react';
import { type RootState } from 'root-types';
import { Template } from '..';
import { getMockRender, getMockStore, mockGoBack } from '../../../../mocks';

describe('template', () => {
  it('handles component state', () => {
    expect.hasAssertions();
    getMockRender(<Template />);
    fireEvent.press(screen.getByTestId('increase-button'));
    const value = screen.getByTestId('increase-value');
    expect(value).toHaveTextContent('1');
  });

  it('handles redux state change', () => {
    expect.hasAssertions();
    const store = getMockStore();
    const state = store.getState();
    const initialState: RootState = {
      ...state,
      theme: { ...state.theme, currentTheme: 'dark' },
    };
    getMockRender(<Template />, { initialState });
    fireEvent.press(screen.getByText('TOGGLE THEME'));
    expect(screen.getByText(/Theme color: light/iu)).toBeVisible();
  });

  it('handles navigation', () => {
    expect.hasAssertions();
    getMockRender(<Template />);
    fireEvent.press(screen.getByTestId('leftNav'));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
    mockGoBack.mockReset();
  });
});
