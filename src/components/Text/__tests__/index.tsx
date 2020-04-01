import React from 'react';
import {Text} from '..';
import {mockRenderer} from '../../../utils/Mock';

it('renders correctly', () => {
  const dom = mockRenderer(<Text title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders empty', () => {
  const dom = mockRenderer(<Text title="" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders h1', () => {
  const dom = mockRenderer(<Text type="h1" title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders type="h2"  ', () => {
  const dom = mockRenderer(<Text type="h2" title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders h3', () => {
  const dom = mockRenderer(<Text type="h3" title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders h4', () => {
  const dom = mockRenderer(<Text type="h4" title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders h5', () => {
  const dom = mockRenderer(<Text type="h5" title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders h6', () => {
  const dom = mockRenderer(<Text type="h6" title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders subtitle1', () => {
  const dom = mockRenderer(<Text type="subtitle1" title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders subtitle2', () => {
  const dom = mockRenderer(<Text type="subtitle2" title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders body1', () => {
  const dom = mockRenderer(<Text type="body1" title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders body2', () => {
  const dom = mockRenderer(<Text type="body2" title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders button', () => {
  const dom = mockRenderer(<Text type="button" title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders button empty', () => {
  const dom = mockRenderer(<Text type="button" title="" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders caption', () => {
  const dom = mockRenderer(<Text type="caption" title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders overline', () => {
  const dom = mockRenderer(<Text type="overline" title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
