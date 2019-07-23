import React from "react";
import { mockRenderer } from "../../../../../utils/Mock";
import { ForgotPassword } from "../../ForgotPassword";

it("renders correctly", () => {
  const dom = mockRenderer(<ForgotPassword />).toJSON();
  expect(dom).toMatchSnapshot();
});
