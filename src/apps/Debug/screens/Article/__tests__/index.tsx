import * as React from "react";
import { Article } from "..";
import { mockRenderer } from "../../../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<Article />).toJSON();
  expect(dom).toMatchSnapshot();
});
