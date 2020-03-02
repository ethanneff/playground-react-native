import React from "react";
import renderer from "react-test-renderer";
import ExampleComponent from "../example";

describe("example tests", () => {
  it("tests props", () => {
    const tree = renderer.create(
      <ExampleComponent title="hello" description="world" />
    );
    expect(
      tree.root.findByProps({ testID: "title" }).instance.props.children
    ).toBe("hello");
    expect(
      tree.root.findByProps({ testID: "description" }).instance.props.children
    ).toBe("world");
    console.log(tree.root.findByProps({ testID: "appVersion" }).instance.props);
  });
});
