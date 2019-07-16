import * as React from "react";
import { RelativeDate } from "..";
import { mockRenderer } from "../../../utils/Mock";

jest.useFakeTimers();
describe("RelativeDate component", () => {
  const date = 1;
  it("renders correctly", () => {
    const dom = mockRenderer(<RelativeDate date={date} />).toJSON();
    expect(dom).toMatchSnapshot();
  });

  it("renders correctly on touch", () => {
    const dom = mockRenderer(<RelativeDate date={date} />);
    const component = dom.root.findByType(RelativeDate).instance;
    component.toggleRelativeDate();
    expect(dom).toMatchSnapshot();
  });

  it("updates state touch", () => {
    const dom = mockRenderer(<RelativeDate date={date} />);
    const component = dom.root.findByType(RelativeDate).instance;
    expect(component.state.showRelativeDate).toBe(true);
    component.toggleRelativeDate();
    expect(component.state.showRelativeDate).toBe(false);
    component.toggleRelativeDate();
    expect(component.state.showRelativeDate).toBe(true);
  });
});
