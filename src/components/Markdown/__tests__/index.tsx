import React from "react";
import { Markdown } from "..";
import { mockRenderer } from "../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<Markdown title="hello *world*" />).toJSON();
  expect(dom).toMatchSnapshot();
});
