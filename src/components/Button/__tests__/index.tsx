import React from "react";
import { Button } from "..";
import { mockRenderer } from "../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(
    <Button title="hello" onPress={() => undefined} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders contained", () => {
  const dom = mockRenderer(
    <Button contained title="hello" onPress={() => undefined} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders contained disable", () => {
  const dom = mockRenderer(
    <Button contained disable title="hello" onPress={() => undefined} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders outlined", () => {
  const dom = mockRenderer(
    <Button outlined title="hello" onPress={() => undefined} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders fab", () => {
  const dom = mockRenderer(
    <Button fab title="hello" onPress={() => undefined} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders text", () => {
  const dom = mockRenderer(
    <Button text title="hello" onPress={() => undefined} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders sizing", () => {
  const dom = mockRenderer(
    <Button center half wrap disable title="hello" onPress={() => undefined} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders icon", () => {
  const dom = mockRenderer(
    <Button icon="check" onPress={() => undefined} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
it("renders icon title", () => {
  const dom = mockRenderer(
    <Button title="hello" icon="check" onPress={() => undefined} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
