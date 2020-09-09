import React from 'react';
import {TextInput} from '..';
import {mockRenderer} from '../../../mocks/Renderer';

it('renders correctly', () => {
  const callback = jest.fn();
  const {tree} = mockRenderer({
    component: <TextInput onChangeText={callback} value="hello" />,
  });
  expect(tree.toJSON()).toMatchSnapshot();
});
