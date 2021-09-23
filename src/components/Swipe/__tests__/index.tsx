import React from 'react';
import { create } from 'react-test-renderer';
import { Swipe } from '..';

describe('swipe', () => {
  it('renders correctly', () => {
    expect.hasAssertions();
    const tree = create(<Swipe />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
