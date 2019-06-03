import * as React from "react";
import { Stopwatch } from "..";
import { mockRenderer } from "../../../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<Stopwatch />).toJSON();
  expect(dom).toMatchSnapshot();
});
