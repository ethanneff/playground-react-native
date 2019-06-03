import * as React from "react";
import { Input } from "..";
import { mockRenderer } from "../../../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<Input />).toJSON();
  expect(dom).toMatchSnapshot();
});
