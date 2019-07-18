import * as React from "react";
import { Loader } from "../..";
import { mockRenderer } from "../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<Loader title="bob" />).toJSON();
  expect(dom).toMatchSnapshot();
});

it("renders correctly with optional props", () => {
  const dom = mockRenderer(
    <Loader title="bob" center style={{ flex: 1 }} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
