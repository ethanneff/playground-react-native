import React from 'react';
import { Screen } from '..';
import { View } from '../../../components';
import { mockRenderer } from '../../../mocks/Renderer';

describe('screen', () => {
  it('renders correctly', () => {
    expect.hasAssertions();
    const { tree } = mockRenderer({
      component: (
        <Screen>
          <View />
        </Screen>
      ),
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
