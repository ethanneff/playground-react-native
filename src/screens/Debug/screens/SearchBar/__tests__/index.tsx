import * as React from "react";
import { create } from "react-test-renderer";
import { SearchBar } from "..";
import { MockProviderAndRouter } from "../../../../../utils";

it("renders correctly", () => {
  const dom = create(<MockProviderAndRouter Component={SearchBar} />).toJSON();
  expect(dom).toMatchSnapshot();
});
