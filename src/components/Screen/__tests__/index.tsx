import * as React from "react";
import { View } from "react-native";
import { Screen } from "..";
import { mockRenderer } from "../../../utils/Mock";

it("renders correctly", () => {
  const dom = mockRenderer(
    <Screen>
      <View />
    </Screen>
  ).toJSON();
  expect(dom).toMatchSnapshot();
});

it("renders correctly with header", () => {
  const dom = mockRenderer(
    <Screen
      title="hello"
      onLeftPress={() => undefined}
      onRightPress={() => undefined}
    >
      <View />
    </Screen>
  ).toJSON();
  expect(dom).toMatchSnapshot();
});

it("renders correctly with icons", () => {
  const dom = mockRenderer(
    <Screen
      title="hello"
      leftIcon="check"
      rightIcon="check"
      onLeftPress={() => undefined}
      onRightPress={() => undefined}
    >
      <View />
    </Screen>
  ).toJSON();
  expect(dom).toMatchSnapshot();
});
