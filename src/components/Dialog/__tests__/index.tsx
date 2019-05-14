import React from "react";
import renderer from "react-test-renderer";
import Component from "..";

jest.useFakeTimers();
describe("Dialog component", () => {
  it("renders correctly with defaults and hidden", () => {
    const dom = renderer.create(<Component title="bob" />);
    expect(dom.toJSON()).toMatchSnapshot();
  });

  it("renders correctly with defaults and visible", () => {
    const dom = renderer.create(<Component title="bob" visible />);
    expect(dom.toJSON()).toMatchSnapshot();
  });

  it("renders correctly with props", () => {
    const dom = renderer.create(
      <Component
        visible
        title="nope"
        message="yep"
        alert
        confirmButtonText="dog"
        cancelButtonText="bird"
        backgroundClose
        onConfirmButtonPress={jest.fn()}
        onCancelButtonPress={jest.fn()}
      />
    );
    expect(dom.toJSON()).toMatchSnapshot();
  });

  it("renders alert to show then hide", () => {
    const callback = jest.fn();
    const dom = renderer.create(
      <Component alert title="bob" onCancelButtonPress={callback} />
    );
    const disappearAlert = jest.spyOn(dom.root.instance, "disappearAlert");
    const clearTimeouts = jest.spyOn(dom.root.instance, "clearTimeouts");
    dom.update(
      <Component visible alert title="bob" onCancelButtonPress={callback} />
    );
    expect(disappearAlert).toHaveBeenCalled();
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
    expect(clearTimeouts).toHaveBeenCalled();
  });

  it("renders dialog to show single button in center", () => {
    const dom = renderer.create(
      <Component alert title="bob" onCancelButtonPress={() => undefined} />
    );
    expect(dom.toJSON()).toMatchSnapshot();
  });

  it("renders dialog to show double buttons beside each other", () => {
    const dom = renderer.create(
      <Component
        alert
        title="bob"
        onCancelButtonPress={() => undefined}
        onConfirmButtonPress={() => undefined}
      />
    );
    expect(dom.toJSON()).toMatchSnapshot();
  });

  it("renders alert to show then hide without onBackgroundPress", () => {
    const dom = renderer.create(<Component alert title="bob" />);
    const disappearAlert = jest.spyOn(dom.root.instance, "disappearAlert");
    const clearTimeouts = jest.spyOn(dom.root.instance, "clearTimeouts");
    dom.update(<Component visible alert title="bob" />);
    expect(disappearAlert).toHaveBeenCalled();
    jest.runAllTimers();
    expect(clearTimeouts).toHaveBeenCalled();
  });

  it("clears timeouts when disappearing", () => {
    const dom = renderer.create(<Component visible title="bob" />);
    const clearTimeouts = jest.spyOn(dom.root.instance, "clearTimeouts");
    dom.update(<Component title="bob" />);
    expect(clearTimeouts).toHaveBeenCalled();
  });

  it("clears timeouts when un mounting", () => {
    const dom = renderer.create(<Component visible title="bob" />);
    const clearTimeouts = jest.spyOn(dom.root.instance, "clearTimeouts");
    dom.unmount();
    expect(clearTimeouts).toHaveBeenCalled();
  });
});
