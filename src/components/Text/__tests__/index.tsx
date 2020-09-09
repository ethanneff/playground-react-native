import React from 'react';
import {Text} from '..';
import {mockRenderer} from '../../../mocks/Renderer';

it('renders correctly', () => {
  const {tree} = mockRenderer({component: <Text title="hello" />});
  expect(tree.toJSON()).toMatchSnapshot();
});
it('renders empty', () => {
  const {tree} = mockRenderer({component: <Text title="" />});
  expect(tree.toJSON()).toMatchSnapshot();
});
it('renders h1', () => {
  const {tree} = mockRenderer({component: <Text title="hello" type="h1" />});
  expect(tree.toJSON()).toMatchSnapshot();
});
it('renders type="h2"  ', () => {
  const {tree} = mockRenderer({component: <Text title="hello" type="h2" />});
  expect(tree.toJSON()).toMatchSnapshot();
});
it('renders h3', () => {
  const {tree} = mockRenderer({component: <Text title="hello" type="h3" />});
  expect(tree.toJSON()).toMatchSnapshot();
});
it('renders h4', () => {
  const {tree} = mockRenderer({component: <Text title="hello" type="h4" />});
  expect(tree.toJSON()).toMatchSnapshot();
});
it('renders h5', () => {
  const {tree} = mockRenderer({component: <Text title="hello" type="h5" />});
  expect(tree.toJSON()).toMatchSnapshot();
});
it('renders h6', () => {
  const {tree} = mockRenderer({component: <Text title="hello" type="h6" />});
  expect(tree.toJSON()).toMatchSnapshot();
});
it('renders subtitle1', () => {
  const {tree} = mockRenderer({
    component: <Text title="hello" type="subtitle1" />,
  });
  expect(tree.toJSON()).toMatchSnapshot();
});
it('renders subtitle2', () => {
  const {tree} = mockRenderer({
    component: <Text title="hello" type="subtitle2" />,
  });
  expect(tree.toJSON()).toMatchSnapshot();
});
it('renders body1', () => {
  const {tree} = mockRenderer({component: <Text title="hello" type="body1" />});
  expect(tree.toJSON()).toMatchSnapshot();
});
it('renders body2', () => {
  const {tree} = mockRenderer({component: <Text title="hello" type="body2" />});
  expect(tree.toJSON()).toMatchSnapshot();
});
it('renders button', () => {
  const {tree} = mockRenderer({
    component: <Text title="hello" type="button" />,
  });
  expect(tree.toJSON()).toMatchSnapshot();
});
it('renders button empty', () => {
  const {tree} = mockRenderer({component: <Text title="" type="button" />});
  expect(tree.toJSON()).toMatchSnapshot();
});
it('renders caption', () => {
  const {tree} = mockRenderer({
    component: <Text title="hello" type="caption" />,
  });
  expect(tree.toJSON()).toMatchSnapshot();
});
it('renders overline', () => {
  const {tree} = mockRenderer({
    component: <Text title="hello" type="overline" />,
  });
  expect(tree.toJSON()).toMatchSnapshot();
});
