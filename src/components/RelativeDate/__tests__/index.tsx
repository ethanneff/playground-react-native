import * as React from "react";
import { create } from "react-test-renderer";
import RelativeDate from "..";

it("renders correctly", () => {
  const dom = create(<RelativeDate date={Date.now()} />).toJSON();
  expect(dom).toMatchSnapshot();
});

it("renders correctly on touch", () => {
  const dom = create(<RelativeDate date={Date.now()} />);
  dom.root.instance.toggleRelativeDate();
  expect(dom).toMatchSnapshot();
});

it("updates state touch", () => {
  const dom = create(<RelativeDate date={Date.now()} />);
  expect(dom.root.instance.state.showRelativeDate).toBe(true);
  dom.root.instance.toggleRelativeDate();
  expect(dom.root.instance.state.showRelativeDate).toBe(false);
  dom.root.instance.toggleRelativeDate();
  expect(dom.root.instance.state.showRelativeDate).toBe(true);
});

it("kills timer on unmount", () => {
  const dom = create(<RelativeDate date={Date.now()} />);
  const timer = dom.root.instance.timer;
  expect(timer._onTimeout).not.toBeNull();
  dom.unmount();
  expect(timer._onTimeout).toBeNull();
});
