import React from "react";
import { mockRenderer } from "../../../../../utils/Mock";
import { NotFound } from "../../NotFound";

it("renders correctly", () => {
  const dom = mockRenderer(<NotFound />).toJSON();
  expect(dom).toMatchSnapshot();
});
