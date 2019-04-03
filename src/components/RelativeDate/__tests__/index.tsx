import * as React from "react";
import { create, ReactTestRenderer } from "react-test-renderer";
import { RelativeDate } from "..";

jest.useFakeTimers();
describe("RelativeDate component", () => {
  const date = 1;
  let dom: ReactTestRenderer;

  beforeEach(() => {
    dom = create(<RelativeDate date={date} />);
  });

  afterEach(() => {
    dom.unmount();
  });

  it("renders correctly", () => {
    expect(dom).toMatchSnapshot();
  });

  it("renders correctly on touch", () => {
    const staticDom = create(<RelativeDate date={date} />);
    staticDom.root.instance.toggleRelativeDate();
    expect(staticDom).toMatchSnapshot();
  });

  it("updates state touch", () => {
    expect(dom.root.instance.state.showRelativeDate).toBe(true);
    dom.root.instance.toggleRelativeDate();
    expect(dom.root.instance.state.showRelativeDate).toBe(false);
    dom.root.instance.toggleRelativeDate();
    expect(dom.root.instance.state.showRelativeDate).toBe(true);
  });
});
