import * as React from "react";
import { create } from "react-test-renderer";
import { Launcher } from "..";

jest.mock("Platform", () => ({
  OS: jest.fn(),
  select: jest.fn()
}));
jest.mock("AppRegistry", () => ({
  registerComponent: jest.fn(),
  runApplication: jest.fn()
}));
describe("Launcher Container", () => {
  it("renders correctly", () => {
    const component = create(<Launcher />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
