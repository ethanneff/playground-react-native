import * as React from "react";
import { Alert } from "..";
import { mockRenderer } from "../../../utils/Mock";

jest.useFakeTimers();
describe("Alert component", () => {
  it("renders correctly with defaults", () => {
    const dom = mockRenderer(<Alert title="bob" />);
    expect(dom.toJSON()).toMatchSnapshot();
  });

  it("renders correctly with props", () => {
    const dom = mockRenderer(
      <Alert
        title="nope"
        message="yep"
        duration={2000}
        confirmButtonText="dog"
        cancelButtonText="bird"
        onBackgroundPress={jest.fn()}
        onConfirmButtonPress={jest.fn()}
        onCancelButtonPress={jest.fn()}
      />
    );
    expect(dom.toJSON()).toMatchSnapshot();
  });
});
