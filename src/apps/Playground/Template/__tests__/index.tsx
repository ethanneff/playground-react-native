import React from 'react';
import { Template } from '..';
import { mockRenderer } from '../../../../mocks/Renderer';

describe('template', () => {
  it('renders correctly', () => {
    expect.hasAssertions();
    const { tree } = mockRenderer({ component: <Template /> });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
