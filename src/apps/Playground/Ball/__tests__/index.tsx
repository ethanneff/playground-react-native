import React from 'react';
import {act, ReactTestRenderer} from 'react-test-renderer';
import {Ball} from '..';
import {mockRenderer} from '../../../../mocks/Renderer';

const getBallLocation = (tree: ReactTestRenderer) => {
  const ball = tree.root.findByProps({testID: 'ball'});
  const styles = ball.props.style[0];
  const location = {left: styles.left._value, top: styles.top._value};
  return location;
};

describe('ball', () => {
  it('renders correctly', () => {
    const {tree} = mockRenderer({component: <Ball />});
    const screen = tree.root.findByProps({testID: 'ballScreen'});
    expect(screen).toBeTruthy();
  });

  it('navigates back correctly', () => {
    const {tree, navigation} = mockRenderer({component: <Ball />});
    const leftNav = tree.root.findByProps({testID: 'leftNav'});
    act(() => leftNav.props.onPress());

    expect(navigation.goBack).toBeCalled();
  });

  it('handles initial state', () => {
    const {tree} = mockRenderer({component: <Ball />});
    const locationBefore = getBallLocation(tree);
    const button = tree.root.findByProps({testID: 'initialButton'});
    act(() => button.props.onPress());
    const locationAfter = getBallLocation(tree);
    expect(locationBefore).toEqual(locationAfter);
  });

  it('handles random state', () => {
    const {tree} = mockRenderer({component: <Ball />});
    const locationBefore = getBallLocation(tree);
    const button = tree.root.findByProps({testID: 'randomButton'});
    act(() => button.props.onPress());
    const locationAfter = getBallLocation(tree);
    expect(locationBefore).toEqual(locationAfter);
  });
});
