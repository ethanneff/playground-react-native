import React from 'react';
import {Icon} from '..';
import {mockRenderer} from '../../../mocks/Renderer';

describe('icon', () => {
  it('renders correctly', () => {
    expect.hasAssertions();
    const {tree} = mockRenderer({component: <Icon name="check" />});
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly without defaults', () => {
    expect.hasAssertions();
    const {tree} = mockRenderer({
      component: <Icon badge={1} color="blue" name="check" size={1} />,
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with clear and max badge', () => {
    expect.hasAssertions();
    const {tree} = mockRenderer({
      component: <Icon badge={1100} clear color="blue" name="check" size={1} />,
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
