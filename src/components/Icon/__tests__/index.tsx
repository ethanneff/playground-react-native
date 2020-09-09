import React from 'react';
import {Icon} from '..';
import {mockRenderer} from '../../../mocks/Renderer';

it('renders correctly', () => {
  const {tree} = mockRenderer({component: <Icon name="check" />});
  expect(tree.toJSON()).toMatchSnapshot();
});

it('renders correctly without defaults', () => {
  const {tree} = mockRenderer({
    component: <Icon badge={1} color="blue" name="check" size={1} />,
  });
  expect(tree.toJSON()).toMatchSnapshot();
});

it('renders correctly with clear and max badge', () => {
  const {tree} = mockRenderer({
    component: <Icon badge={1100} clear color="blue" name="check" size={1} />,
  });
  expect(tree.toJSON()).toMatchSnapshot();
});
