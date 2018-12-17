import * as React from "react";
import { create } from "react-test-renderer";
import { Button } from "..";

it("renders correctly", () => {
  const dom = create(
    <Button title="hello" onPress={() => undefined} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders correctly", () => {
  const dom = create(
    <Button title="hello" onPress={() => undefined} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders contained", () => {
  const dom = create(
    <Button contained title="hello" onPress={() => undefined} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders outlined", () => {
  const dom = create(
    <Button outlined title="hello" onPress={() => undefined} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders fab ", () => {
  const dom = create(
    <Button fab title="hello" onPress={() => undefined} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders text", () => {
  const dom = create(
    <Button text title="hello" onPress={() => undefined} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
