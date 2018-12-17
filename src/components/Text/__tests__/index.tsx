import * as React from "react";
import { create } from "react-test-renderer";
import { Text } from "..";

it("renders correctly", () => {
  const dom = create(<Text title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders empty", () => {
  const dom = create(<Text title="" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders h1", () => {
  const dom = create(<Text h1 title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders h2", () => {
  const dom = create(<Text h2 title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders h3", () => {
  const dom = create(<Text h3 title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders h4", () => {
  const dom = create(<Text h4 title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders h5", () => {
  const dom = create(<Text h5 title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders h6", () => {
  const dom = create(<Text h6 title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders subtitle1", () => {
  const dom = create(<Text subtitle1 title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders subtitle2", () => {
  const dom = create(<Text subtitle2 title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders body1", () => {
  const dom = create(<Text body1 title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders body2", () => {
  const dom = create(<Text body2 title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders button", () => {
  const dom = create(<Text button title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders button empty", () => {
  const dom = create(<Text button title="" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders caption", () => {
  const dom = create(<Text caption title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders overline", () => {
  const dom = create(<Text overline title="hello" />).toJSON();
  expect(dom).toMatchSnapshot();
});
