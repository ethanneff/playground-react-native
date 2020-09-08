import React from 'react';
import {Button} from '..';
import {mockRenderer} from '../../../mocks/Renderer';

it('renders correctly', () => {
  const callback = jest.fn();
  const dom = mockRenderer(
    <Button onPress={callback} title="hello" />,
  ).toJSON();
  expect(dom).toMatchSnapshot();
});

it('renders disable', () => {
  const callback = jest.fn();
  const dom = mockRenderer(
    <Button center disable onPress={callback} title="hello" />,
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
