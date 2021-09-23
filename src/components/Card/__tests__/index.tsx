import React from 'react';
import { Card } from '..';
import { mockRenderer } from '../../../mocks/Renderer';

describe('card', () => {
  it('renders correctly', () => {
    expect.hasAssertions();
    const { tree } = mockRenderer({ component: <Card /> });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with onPress', () => {
    expect.hasAssertions();
    const callback = jest.fn();
    const { tree } = mockRenderer({ component: <Card onPress={callback} /> });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
