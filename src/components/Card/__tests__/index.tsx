import React from 'react';
import {Card} from '..';
import {mockRenderer} from '../../../mocks/Renderer';

it('renders correctly', () => {
  const {tree} = mockRenderer({component: <Card />});
  expect(tree.toJSON()).toMatchSnapshot();
});

it('renders correctly with onPress', () => {
  const callback = jest.fn();
  const {tree} = mockRenderer({component: <Card onPress={callback} />});
  expect(tree.toJSON()).toMatchSnapshot();
});
