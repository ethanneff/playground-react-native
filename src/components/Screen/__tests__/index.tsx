import React from 'react';
import {View} from 'react-native';
import {Screen} from '..';
import {mockRenderer} from '../../../mocks/Renderer';

describe('screen', () => {
  it('renders correctly', () => {
    expect.hasAssertions();
    const {tree} = mockRenderer({
      component: (
        <Screen>
          <View />
        </Screen>
      ),
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
