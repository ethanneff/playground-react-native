import React from "react";
import { Drag } from "..";
import { mockRenderer } from "../../../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<Drag />).toJSON();
  expect(dom).toMatchSnapshot();
});
