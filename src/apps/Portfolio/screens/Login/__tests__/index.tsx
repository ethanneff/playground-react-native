import React from 'react';
import {mockRenderer} from '../../../../../mocks/Renderer';
import Screen from '..';

it('renders correctly', () => {
  const dom = mockRenderer(<Screen />).toJSON();
  expect(dom).toMatchSnapshot();
});
