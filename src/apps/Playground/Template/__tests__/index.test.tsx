import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { type RootState } from 'root-types';
import { Template } from '..';
import { getMockRender, getMockStore, mockGoBack } from '../../../../mocks';

describe('template', () => {
  it('handles component state', () => {
    expect.hasAssertions();
    const { getByTestId } = getMockRender(<Template />);
    fireEvent.press(getByTestId('increase-button'));
    const value = getByTestId('increase-value');
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
    const { getByText } = getMockRender(<Template />, { initialState });
    fireEvent.press(getByText('TOGGLE THEME'));
    const theme = getByText(/Theme color:/iu);
    expect(theme.props.children).toBe('Theme color: light');
  });

  it('handles navigation', () => {
    expect.hasAssertions();
    const { getByTestId } = getMockRender(<Template />);
    fireEvent.press(getByTestId('leftNav'));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
    mockGoBack.mockReset();
  });
});
