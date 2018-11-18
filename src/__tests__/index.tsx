import * as React from "react";
import { create } from "react-test-renderer";
import { Launcher } from "..";

describe("Launcher Container", () => {
  beforeEach(() => {
    jest.mock("Platform", () => {
      return {
        OS: jest.fn(),
        select: jest.fn()
      };
    });
    jest.mock("AppRegistry", () => {
      return {
        registerComponent: jest.fn(),
        runApplication: jest.fn()
      };
    });
  });

  it("renders correctly", () => {
    const component = create(<Launcher />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
