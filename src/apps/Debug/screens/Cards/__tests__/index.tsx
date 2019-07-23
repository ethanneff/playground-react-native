import React from "react";
import { Cards } from "..";
import { mockRenderer } from "../../../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<Cards />).toJSON();
  expect(dom).toMatchSnapshot();
});
