import * as React from "react";
import { create } from "react-test-renderer";
import { Chat } from "..";
import { MockProviderAndRouter } from "../../../../../utils";

jest.mock("uuid", () => ({
  v4: jest.fn(() => 1)
}));
jest.mock("moment", () => () => ({
  format: () => "2018–01–30T12:34:56+00:00",
  subtract: () => jest.fn()
}));

it("renders correctly", () => {
  jest.spyOn(Date, "now").mockImplementation(() => 1479427200000);
  const dom = create(<MockProviderAndRouter Component={Chat} />).toJSON();
  expect(dom).toMatchSnapshot();
});
