import { screen } from '@testing-library/react-native';
import React from 'react';
import { Testing } from '../../../mocks';
import { NavBar } from '../NavBar';

describe('navBar', () => {
  it('shows secondary left nav', () => {
    expect.assertions(1);
    Testing.renderComponent(
      <NavBar
        onSecondLeftPress={jest.fn()}
        secondLeftIcon="dog"
      />,
    );
    expect(screen.getByTestId('secondLeftNav')).toBeTruthy();
  });

  it('shows secondary right nav', () => {
    expect.assertions(1);
    Testing.renderComponent(
      <NavBar
        onSecondRightPress={jest.fn()}
        secondRightIcon="bird"
      />,
    );
    expect(screen.getByTestId('secondRightNav')).toBeTruthy();
  });
});
