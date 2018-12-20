import * as React from "react";
import { create } from "react-test-renderer";
import { Link, Router } from "../..";

it("renders correctly", () => {
  const dom = create(
    <Router>
      <Link title="hello" to="/" />
    </Router>
  ).toJSON();
  expect(dom).toMatchSnapshot();
});

it("renders correctly without defaults", () => {
  const dom = create(
    <Router>
      <Link title="hello" to="/" underlayColor="blue" />
    </Router>
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
