import React from 'react';
import {Template} from '..';
import {mockRenderer} from '../../../../mocks/Renderer';

it('renders correctly', () => {
  const dom = mockRenderer(<Template />).toJSON();
  expect(dom).toMatchSnapshot();
});
