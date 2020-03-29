import React from 'react';
import {create} from 'react-test-renderer';
import {Swipe} from '..';

it('renders correctly', () => {
  const dom = create(<Swipe />).toJSON();
  expect(dom).toMatchSnapshot();
});
