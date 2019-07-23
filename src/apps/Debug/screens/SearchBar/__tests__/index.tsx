import React from "react";
import { SearchBar } from "..";
import { mockRenderer } from "../../../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<SearchBar />).toJSON();
  expect(dom).toMatchSnapshot();
});
