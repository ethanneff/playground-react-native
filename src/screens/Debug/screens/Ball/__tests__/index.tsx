import * as React from "react";
import { create } from "react-test-renderer";
import { Ball } from "..";
import { MockProviderAndRouter } from "../../../../../utils";

it("renders correctly", () => {
  const dom = create(<MockProviderAndRouter Component={Ball} />).toJSON();
  expect(dom).toMatchSnapshot();
});
