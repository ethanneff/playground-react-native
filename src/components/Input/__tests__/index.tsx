import React from 'react';
import {Input} from '..';
import {mockRenderer} from '../../../mocks/Renderer';

it('renders correctly', () => {
  const callback = jest.fn();
  const {tree} = mockRenderer({
    component: <Input onChangeText={callback} value="hello" />,
  });
  expect(tree.toJSON()).toMatchSnapshot();
});
