import React from 'react';
import { Button } from '..';
import { mockRenderer } from '../../../utils/Mock';

it('renders correctly', () => {
  const dom = mockRenderer(
    <Button title="hello" onPress={() => undefined} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});

it('renders disable', () => {
  const dom = mockRenderer(
    <Button center disable title="hello" onPress={() => undefined} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
