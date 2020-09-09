import React from 'react';
import {View} from 'react-native';
import {Card, CardSection} from '../..';
import {mockRenderer} from '../../../mocks/Renderer';

it('renders correctly', () => {
  const {tree} = mockRenderer({
    component: (
      <Card>
        <CardSection>
          <View />
        </CardSection>
      </Card>
    ),
  });
  expect(tree.toJSON()).toMatchSnapshot();
});
