import * as React from "react";
import { create } from "react-test-renderer";
import { Landing } from "..";
import { MockProviderAndRouter } from "../../../utils";

it("renders correctly", () => {
  const dom = create(<MockProviderAndRouter Component={Landing} />).toJSON();
  expect(dom).toMatchSnapshot();
});
