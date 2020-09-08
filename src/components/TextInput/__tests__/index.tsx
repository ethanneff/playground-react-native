import React from 'react';
import {TextInput} from '..';
import {mockRenderer} from '../../../mocks/Renderer';

it('renders correctly', () => {
  const callback = jest.fn();
  const dom = mockRenderer(
    <TextInput onChangeText={callback} value="hello" />,
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
