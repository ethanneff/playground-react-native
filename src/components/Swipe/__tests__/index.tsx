import React from 'react';
import {create} from 'react-test-renderer';
import {Swipe} from '..';

it('renders correctly', () => {
  const tree = create(<Swipe />).toJSON();
  expect(tree).toMatchSnapshot();
});
