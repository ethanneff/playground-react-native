import * as React from "react";
import { Debug } from "..";
import { mockRenderer } from "../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<Debug />).toJSON();
  expect(dom).toMatchSnapshot();
});
