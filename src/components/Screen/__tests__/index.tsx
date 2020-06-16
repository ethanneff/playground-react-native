import React from 'react';
import {View} from 'react-native';
import {Screen} from '..';
import {mockRenderer} from '../../../utils/Mock';

it('renders correctly', () => {
  const dom = mockRenderer(
    <Screen>
      <View />
    </Screen>,
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
