import React from 'react';
import {Card, CardSection} from '../..';
import {mockRenderer} from '../../../utils/Mock';

it('renders correctly', () => {
  const dom = mockRenderer(
    <Card>
      <CardSection>
        <></>
      </CardSection>
    </Card>,
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
