import React from "react";
import { SwipeCell } from "..";
import { mockRenderer } from "../../../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<SwipeCell />).toJSON();
  expect(dom).toMatchSnapshot();
});
