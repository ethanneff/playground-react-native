import * as React from "react";
import { Main } from "..";
import { mockRenderer } from "../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<Main />).toJSON();
  expect(dom).toMatchSnapshot();
});
