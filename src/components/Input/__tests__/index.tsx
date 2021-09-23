import React from 'react';
import { Input } from '..';
import { mockRenderer } from '../../../mocks/Renderer';

describe('input', () => {
  it('renders correctly', () => {
    expect.hasAssertions();
    const callback = jest.fn();
    const { tree } = mockRenderer({
      component: <Input onChangeText={callback} value="hello" />,
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
