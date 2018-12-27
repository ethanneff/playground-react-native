import * as React from "react";
import { create } from "react-test-renderer";
import { Template } from "..";
import { MockProviderAndRouter } from "../../../../../utils";

it("renders correctly", () => {
  const dom = create(<MockProviderAndRouter Component={Template} />).toJSON();
  expect(dom).toMatchSnapshot();
});
