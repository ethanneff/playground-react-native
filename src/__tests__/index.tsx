import React from "react";
import { create } from "react-test-renderer";
import { Launcher } from "..";

describe("Launcher Container", () => {
  it("renders correctly", () => {
    const component = create(<Launcher />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
