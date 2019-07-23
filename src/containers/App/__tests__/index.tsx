import React from "react";
import { App } from "..";
import { mockRenderer } from "../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<App />).toJSON();
  expect(dom).toMatchSnapshot();
});
