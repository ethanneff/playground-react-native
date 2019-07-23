import React from "react";
import { Portfolio } from "../..";
import { mockRenderer } from "../../../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<Portfolio />).toJSON();
  expect(dom).toMatchSnapshot();
});
