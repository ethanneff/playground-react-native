import React from 'react';
import {Button} from '..';
import {mockRenderer} from '../../../mocks/Renderer';

describe('button', () => {
  it('renders correctly', () => {
    expect.hasAssertions();
    const callback = jest.fn();
    const {tree} = mockRenderer({
      component: <Button onPress={callback} title="hello" />,
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders disable', () => {
    expect.hasAssertions();
    const callback = jest.fn();
    const {tree} = mockRenderer({
      component: <Button center disabled onPress={callback} title="hello" />,
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
