import React from 'react';
import Screen from '..';
import {mockRenderer} from '../../../utils/Mock';

it('renders correctly', () => {
  const dom = mockRenderer(<Screen />).toJSON();
  expect(dom).toMatchSnapshot();
});
