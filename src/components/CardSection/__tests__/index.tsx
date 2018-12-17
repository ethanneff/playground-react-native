import * as React from "react";
import { View } from "react-native";
import { create } from "react-test-renderer";
import { Card, CardSection } from "../..";

it("renders correctly", () => {
  const dom = create(
    <Card>
      <CardSection>
        <View />
      </CardSection>
    </Card>
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
