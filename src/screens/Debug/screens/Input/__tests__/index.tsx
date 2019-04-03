import * as React from "react";
import { create } from "react-test-renderer";
import { Input } from "..";
import { MockProviderAndRouter } from "../../../../../utils";

it("renders correctly", () => {
  const dom = create(<MockProviderAndRouter Component={Input} />).toJSON();
  expect(dom).toMatchSnapshot();
});
