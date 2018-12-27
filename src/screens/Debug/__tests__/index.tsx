import * as React from "react";
import { create } from "react-test-renderer";
import { Debug } from "..";
import { MockProviderAndRouter } from "../../../utils";

it("renders correctly", () => {
  const dom = create(<MockProviderAndRouter Component={Debug} />).toJSON();
  expect(dom).toMatchSnapshot();
});
