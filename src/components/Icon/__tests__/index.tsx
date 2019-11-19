import React from "react";
import { Icon } from "..";
import { mockRenderer } from "../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<Icon name="check" />).toJSON();
  expect(dom).toMatchSnapshot();
});

it("renders correctly without defaults", () => {
  const dom = mockRenderer(
    <Icon name="check" size={1} badge={1} color={"blue"} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});

it("renders correctly with clear and max badge", () => {
  const dom = mockRenderer(
    <Icon name="check" size={1} badge={1100} clear color={"blue"} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
