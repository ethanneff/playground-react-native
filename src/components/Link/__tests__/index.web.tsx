import * as React from "react";
import { create } from "react-test-renderer";
import { Router } from "../.."; // TODO: pull from web router instead
import { Link } from "../index.web";

it("renders correctly", () => {
  const dom = create(
    <Router>
      <Link title="hello" to="/" />
    </Router>
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
