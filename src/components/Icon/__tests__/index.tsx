import * as React from "react";
import { create } from "react-test-renderer";
import { Icon } from "..";
import { Theme } from "../../../utils";

it("renders correctly", () => {
  const dom = create(<Icon name="check" />).toJSON();
  expect(dom).toMatchSnapshot();
});

it("renders correctly without defaults", () => {
  const dom = create(
    <Icon name="check" size={1} badge={1} color={Theme.color.background} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});

it("renders correctly with clear and max badge", () => {
  const dom = create(
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
