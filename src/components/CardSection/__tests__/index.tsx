import React from 'react';
import {View} from 'react-native';
import {Card, CardSection} from '../..';
import {mockRenderer} from '../../../utils/Mock';

it('renders correctly', () => {
  const dom = mockRenderer(
    <Card>
      <CardSection>
        <View />
      </CardSection>
    </Card>,
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
