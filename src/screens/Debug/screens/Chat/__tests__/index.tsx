import * as React from "react";
import { create } from "react-test-renderer";
import { Chat } from "..";
import { MockProviderAndRouter } from "../../../../../utils";

it("renders correctly", () => {
  const dom = create(<MockProviderAndRouter Component={Chat} />).toJSON();
  expect(dom).toMatchSnapshot();
});
