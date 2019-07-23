import React from "react";
import { Template } from "..";
import { mockRenderer } from "../../../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<Template />).toJSON();
  expect(dom).toMatchSnapshot();
});
