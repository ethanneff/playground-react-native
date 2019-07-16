import * as React from "react";
import { Card } from "..";
import { mockRenderer } from "../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(<Card />).toJSON();
  expect(dom).toMatchSnapshot();
});

it("renders correctly with onPress", () => {
  const dom = mockRenderer(<Card onPress={() => undefined} />).toJSON();
  expect(dom).toMatchSnapshot();
});
