import React from 'react';
import {TextInput} from '..';
import {mockRenderer} from '../../../utils/Mock';

it('renders correctly', () => {
  const dom = mockRenderer(
    <TextInput value="hello" onChangeText={() => undefined} />,
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
