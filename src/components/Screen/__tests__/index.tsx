import * as React from "react";
import { View } from "react-native";
import { create } from "react-test-renderer";
import { Screen } from "..";

it("renders correctly", () => {
  const dom = create(
    <Screen>
      <View />
    </Screen>
  ).toJSON();
  expect(dom).toMatchSnapshot();
});

it("renders correctly with header", () => {
  const dom = create(
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
  const dom = create(
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
