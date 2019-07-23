import React from "react";
import { PinchSpread } from "..";
import { mockRenderer } from "../../../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<PinchSpread />).toJSON();
  expect(dom).toMatchSnapshot();
});
