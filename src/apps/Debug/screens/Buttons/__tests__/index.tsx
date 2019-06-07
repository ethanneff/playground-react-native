import * as React from "react";
import { Buttons } from "..";
import { mockRenderer } from "../../../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<Buttons />).toJSON();
  expect(dom).toMatchSnapshot();
});
