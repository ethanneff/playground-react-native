import { screen } from '@testing-library/react-native';
import React from 'react';
import { getMockRender } from '../../../mocks';
import { NavBar } from '../NavBar';

describe('navBar', () => {
  it('shows secondary left nav', () => {
    expect.assertions(1);
    getMockRender(
      <NavBar
        onSecondLeftPress={jest.fn()}
        secondLeftIcon="dog"
      />,
    );
    expect(screen.getByTestId('secondLeftNav')).toBeTruthy();
  });

  it('shows secondary right nav', () => {
    expect.assertions(1);
    getMockRender(
      <NavBar
        onSecondRightPress={jest.fn()}
        secondRightIcon="bird"
      />,
    );
    expect(screen.getByTestId('secondRightNav')).toBeTruthy();
  });

  it('shows border', () => {
    expect.assertions(1);
    getMockRender(<NavBar border />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('shows dropshadow', () => {
    expect.assertions(1);
    getMockRender(<NavBar dropShadow />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
