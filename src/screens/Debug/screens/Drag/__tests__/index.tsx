import * as React from "react";
import { create } from "react-test-renderer";
import { Drag } from "..";
import { MockProviderAndRouter } from "../../../../../utils";

it("renders correctly", () => {
  const dom = create(<MockProviderAndRouter Component={Drag} />).toJSON();
  expect(dom).toMatchSnapshot();
});
