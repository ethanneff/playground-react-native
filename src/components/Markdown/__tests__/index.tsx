import * as React from "react";
import { create } from "react-test-renderer";
import { Markdown } from "..";

it("renders correctly", () => {
  const dom = create(<Markdown title="hello *world*" />).toJSON();
  expect(dom).toMatchSnapshot();
});
