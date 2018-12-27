import * as React from "react";
import { create } from "react-test-renderer";
import { NotFound } from "..";
import { MockProviderAndRouter } from "../../../utils";

it("renders correctly", () => {
  const dom = create(<MockProviderAndRouter Component={NotFound} />).toJSON();
  expect(dom).toMatchSnapshot();
});
