import * as React from "react";
import { Login } from "..";
import { mockRenderer } from "../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<Login />).toJSON();
  expect(dom).toMatchSnapshot();
});
