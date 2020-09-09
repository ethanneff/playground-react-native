import React from 'react';
import {Button} from '..';
import {mockRenderer} from '../../../mocks/Renderer';

it('renders correctly', () => {
  const callback = jest.fn();
  const {tree} = mockRenderer({
    component: <Button onPress={callback} title="hello" />,
  });
  expect(tree.toJSON()).toMatchSnapshot();
});

it('renders disable', () => {
  const callback = jest.fn();
  const {tree} = mockRenderer({
    component: <Button center disable onPress={callback} title="hello" />,
  });
  expect(tree.toJSON()).toMatchSnapshot();
});
