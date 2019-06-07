import * as React from "react";
import { mockRenderer } from "../../../../../utils/Mock";
import { Main } from "../../Main";

it("renders correctly", () => {
  const dom = mockRenderer(<Main />).toJSON();
  expect(dom).toMatchSnapshot();
});
