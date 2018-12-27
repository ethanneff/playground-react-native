import * as React from "react";
import { create } from "react-test-renderer";
import { Cards } from "..";
import { MockProviderAndRouter } from "../../../../../utils";

it("renders correctly", () => {
  const dom = create(<MockProviderAndRouter Component={Cards} />).toJSON();
  expect(dom).toMatchSnapshot();
});
