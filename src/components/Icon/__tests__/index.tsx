import React from "react";
import { Icon } from "..";
import { Theme } from "../../../utils";
import { mockRenderer } from "../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<Icon name="check" />).toJSON();
  expect(dom).toMatchSnapshot();
});

it("renders correctly without defaults", () => {
  const dom = mockRenderer(
    <Icon name="check" size={1} badge={1} color={Theme.color.background} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});

it("renders correctly with clear and max badge", () => {
  const dom = mockRenderer(
    <Icon
      name="check"
      size={1}
      badge={1100}
      clear
      color={Theme.color.background}
    />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
