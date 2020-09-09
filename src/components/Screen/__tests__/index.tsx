import React from 'react';
import {View} from 'react-native';
import {Screen} from '..';
import {mockRenderer} from '../../../mocks/Renderer';

it('renders correctly', () => {
  const {tree} = mockRenderer({
    component: (
      <Screen>
        <View />
      </Screen>
    ),
  });
  expect(tree.toJSON()).toMatchSnapshot();
});
