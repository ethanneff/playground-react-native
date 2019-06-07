import * as React from "react";
import { ForgotPassword } from "../../ForgotPassword";
import { mockRenderer } from "../../../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<ForgotPassword />).toJSON();
  expect(dom).toMatchSnapshot();
});
