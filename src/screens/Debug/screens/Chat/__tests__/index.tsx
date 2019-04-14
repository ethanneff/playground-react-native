import * as React from "react";
import { create } from "react-test-renderer";
import { Chat } from "..";
import { MockProviderAndRouter } from "../../../../../utils";
import mockDate from "mockdate";

jest.mock("uuid", () => ({
  v4: jest.fn(() => 1)
}));
it("renders correctly", () => {
  mockDate.set("2000-11-22");

  const dom = create(<MockProviderAndRouter Component={Chat} />).toJSON();
  expect(dom).toMatchSnapshot();
});
