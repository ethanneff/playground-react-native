import React from 'react';
import { Text } from '..';
import { mockRenderer } from '../../../utils/Mock';

it('renders correctly', () => {
  const dom = mockRenderer(<Text title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders empty', () => {
  const dom = mockRenderer(<Text title="" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders h1', () => {
  const dom = mockRenderer(<Text h1 title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders h2', () => {
  const dom = mockRenderer(<Text h2 title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders h3', () => {
  const dom = mockRenderer(<Text h3 title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders h4', () => {
  const dom = mockRenderer(<Text h4 title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders h5', () => {
  const dom = mockRenderer(<Text h5 title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders h6', () => {
  const dom = mockRenderer(<Text h6 title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders subtitle1', () => {
  const dom = mockRenderer(<Text subtitle1 title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders subtitle2', () => {
  const dom = mockRenderer(<Text subtitle2 title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders body1', () => {
  const dom = mockRenderer(<Text body1 title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders body2', () => {
  const dom = mockRenderer(<Text body2 title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders button', () => {
  const dom = mockRenderer(<Text button title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders button empty', () => {
  const dom = mockRenderer(<Text button title="" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders caption', () => {
  const dom = mockRenderer(<Text caption title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders overline', () => {
  const dom = mockRenderer(<Text overline title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
