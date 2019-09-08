import React from "react";
import { mockRenderer } from "../../../../../utils/Mock";
import Screen from "..";

it("renders correctly", () => {
  const dom = mockRenderer(<Screen />).toJSON();
  expect(dom).toMatchSnapshot();
});
