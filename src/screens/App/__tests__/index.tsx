import * as React from "react";
import { create } from "react-test-renderer";
import { App } from "..";
import { MockProviderAndRouter } from "../../../utils";

it("renders correctly", () => {
  const dom = create(<MockProviderAndRouter Component={App} />).toJSON();
  expect(dom).toMatchSnapshot();
});
