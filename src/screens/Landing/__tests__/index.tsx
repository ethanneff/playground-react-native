import * as React from "react";
import { Landing } from "..";
import { mockRenderer } from "../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<Landing />).toJSON();
  expect(dom).toMatchSnapshot();
});
