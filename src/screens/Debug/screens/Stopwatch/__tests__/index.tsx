import * as React from "react";
import { create } from "react-test-renderer";
import { Stopwatch } from "..";
import { MockProviderAndRouter } from "../../../../../utils";

it("renders correctly", () => {
  const dom = create(<MockProviderAndRouter Component={Stopwatch} />).toJSON();
  expect(dom).toMatchSnapshot();
});
