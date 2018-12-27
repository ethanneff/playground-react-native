import * as React from "react";
import { create } from "react-test-renderer";
import { Main } from "..";
import { MockProviderAndRouter } from "../../../utils";

it("renders correctly", () => {
  const dom = create(<MockProviderAndRouter Component={Main} />).toJSON();
  expect(dom).toMatchSnapshot();
});
