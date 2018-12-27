import * as React from "react";
import { create } from "react-test-renderer";
import { Fonts } from "..";
import { MockProviderAndRouter } from "../../../../../utils";

it("renders correctly", () => {
  const dom = create(<MockProviderAndRouter Component={Fonts} />).toJSON();
  expect(dom).toMatchSnapshot();
});
