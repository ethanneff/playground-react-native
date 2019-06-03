import * as React from "react";
import { NotFound } from "..";
import { mockRenderer } from "../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<NotFound />).toJSON();
  expect(dom).toMatchSnapshot();
});
