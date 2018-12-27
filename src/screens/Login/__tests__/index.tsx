import * as React from "react";
import { create } from "react-test-renderer";
import { Login } from "..";
import { MockProviderAndRouter } from "../../../utils";

it("renders correctly", () => {
  const dom = create(<MockProviderAndRouter Component={Login} />).toJSON();
  expect(dom).toMatchSnapshot();
});
