import * as React from "react";
import { create } from "react-test-renderer";
import { PinchSpread } from "..";
import { MockProviderAndRouter } from "../../../../../utils";

it("renders correctly", () => {
  const dom = create(
    <MockProviderAndRouter Component={PinchSpread} />
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
