import React from "react";
import { Ball } from "..";
import { mockRenderer } from "../../../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<Ball />).toJSON();
  expect(dom).toMatchSnapshot();
});
