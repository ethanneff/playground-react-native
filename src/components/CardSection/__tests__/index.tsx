import React from 'react';
import {View} from 'react-native';
import {Card, CardSection} from '../..';
import {mockRenderer} from '../../../mocks/Renderer';

describe('card section', () => {
  it('renders correctly', () => {
    expect.hasAssertions();
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
});
