import React from 'react';
import {Markdown} from '..';
import {mockRenderer} from '../../../mocks/Renderer';

describe('markdown', () => {
  it('renders correctly', () => {
    expect.hasAssertions();
    const {tree} = mockRenderer({
      component: <Markdown title="hello *world*" />,
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
