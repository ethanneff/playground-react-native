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
  const dom = mockRenderer(<Text title="hello" type="h1" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders type="h2"  ', () => {
  const dom = mockRenderer(<Text title="hello" type="h2" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders h3', () => {
  const dom = mockRenderer(<Text title="hello" type="h3" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders h4', () => {
  const dom = mockRenderer(<Text title="hello" type="h4" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders h5', () => {
  const dom = mockRenderer(<Text title="hello" type="h5" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders h6', () => {
  const dom = mockRenderer(<Text title="hello" type="h6" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders subtitle1', () => {
  const dom = mockRenderer(<Text title="hello" type="subtitle1" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders subtitle2', () => {
  const dom = mockRenderer(<Text title="hello" type="subtitle2" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders body1', () => {
  const dom = mockRenderer(<Text title="hello" type="body1" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders body2', () => {
  const dom = mockRenderer(<Text title="hello" type="body2" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders button', () => {
  const dom = mockRenderer(<Text title="hello" type="button" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders button empty', () => {
  const dom = mockRenderer(<Text title="" type="button" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders caption', () => {
  const dom = mockRenderer(<Text title="hello" type="caption" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it('renders overline', () => {
  const dom = mockRenderer(<Text title="hello" type="overline" />).toJSON();
  expect(dom).toMatchSnapshot();
});
