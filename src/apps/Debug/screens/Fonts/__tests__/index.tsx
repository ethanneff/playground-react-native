import React from "react";
import { Fonts } from "..";
import { mockRenderer } from "../../../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<Fonts />).toJSON();
  expect(dom).toMatchSnapshot();
});
