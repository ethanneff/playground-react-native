import React from 'react';
import { Text } from '..';
import { mockRenderer } from '../../../mocks/Renderer';

describe('text', () => {
  it('renders correctly', () => {
    expect.hasAssertions();
    const { tree } = mockRenderer({ component: <Text title="hello" /> });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('renders empty', () => {
    expect.hasAssertions();
    const { tree } = mockRenderer({ component: <Text title="" /> });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('renders h1', () => {
    expect.hasAssertions();
    const { tree } = mockRenderer({
      component: <Text title="hello" type="h1" />,
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('renders type="h2"', () => {
    expect.hasAssertions();
    const { tree } = mockRenderer({
      component: <Text title="hello" type="h2" />,
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('renders h3', () => {
    expect.hasAssertions();
    const { tree } = mockRenderer({
      component: <Text title="hello" type="h3" />,
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('renders h4', () => {
    expect.hasAssertions();
    const { tree } = mockRenderer({
      component: <Text title="hello" type="h4" />,
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('renders h5', () => {
    expect.hasAssertions();
    const { tree } = mockRenderer({
      component: <Text title="hello" type="h5" />,
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('renders h6', () => {
    expect.hasAssertions();
    const { tree } = mockRenderer({
      component: <Text title="hello" type="h6" />,
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('renders subtitle1', () => {
    expect.hasAssertions();
    const { tree } = mockRenderer({
      component: <Text title="hello" type="subtitle1" />,
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('renders subtitle2', () => {
    expect.hasAssertions();
    const { tree } = mockRenderer({
      component: <Text title="hello" type="subtitle2" />,
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('renders body1', () => {
    expect.hasAssertions();
    const { tree } = mockRenderer({
      component: <Text title="hello" type="body1" />,
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('renders body2', () => {
    expect.hasAssertions();
    const { tree } = mockRenderer({
      component: <Text title="hello" type="body2" />,
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('renders button', () => {
    expect.hasAssertions();
    const { tree } = mockRenderer({
      component: <Text title="hello" type="button" />,
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('renders button empty', () => {
    expect.hasAssertions();
    const { tree } = mockRenderer({
      component: <Text title="" type="button" />,
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('renders caption', () => {
    expect.hasAssertions();
    const { tree } = mockRenderer({
      component: <Text title="hello" type="caption" />,
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('renders overline', () => {
    expect.hasAssertions();
    const { tree } = mockRenderer({
      component: <Text title="hello" type="overline" />,
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
