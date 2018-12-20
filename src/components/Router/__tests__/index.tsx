import * as React from "react";
import { View } from "react-native";
import { create } from "react-test-renderer";
import { Route, Router } from "../..";

it("renders correctly", () => {
  const dom = create(
    <Router>
      <Route exact path="/" component={() => <View />} />
      <Route path="/normal" component={() => <View />} />
      <Route auth path="/auth" component={() => <View />} />
    </Router>
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
