import React from "react";
import { mockRenderer } from "../../../../../utils/Mock";
import { Login } from "../../Login";

it("renders correctly", () => {
  const dom = mockRenderer(<Login />).toJSON();
  expect(dom).toMatchSnapshot();
});
