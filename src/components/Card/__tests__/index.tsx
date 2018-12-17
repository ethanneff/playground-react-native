import * as React from "react";
import { create } from "react-test-renderer";
import { Card } from "..";

it("renders correctly", () => {
  const dom = create(<Card />).toJSON();
  expect(dom).toMatchSnapshot();
});
