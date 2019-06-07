import * as React from "react";
import { mockRenderer } from "../../../../../utils/Mock";
import { Landing } from "../../Landing";

it("renders correctly", () => {
  const dom = mockRenderer(<Landing />).toJSON();
  expect(dom).toMatchSnapshot();
});
