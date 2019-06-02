import React from "react";
import renderer from "react-test-renderer";
import { Dialog } from "..";

jest.useFakeTimers();
describe("Dialog component", () => {
  it("renders correctly with defaults and hidden", () => {
    const dom = renderer.create(<Dialog title="bob" />);
    expect(dom.toJSON()).toMatchSnapshot();
  });

  it("renders correctly with defaults and ", () => {
    const dom = renderer.create(<Dialog title="bob" />);
    expect(dom.toJSON()).toMatchSnapshot();
  });

  it("renders correctly with props", () => {
    const dom = renderer.create(
      <Dialog
        title="nope"
        message="yep"
        alert
        confirmButtonText="dog"
        cancelButtonText="bird"
        onBackgroundPress={jest.fn()}
        onConfirmButtonPress={jest.fn()}
        onCancelButtonPress={jest.fn()}
      />
    );
    expect(dom.toJSON()).toMatchSnapshot();
  });

  // it("renders alert to show then hide", () => {
  //   const callback = jest.fn();
  //   const dom = renderer.create(
  //     <Component title="bob" onBackgroundPress={callback} />
  //   );
  //   const alert = jest.spyOn(dom.root.instance, "alert");
  //   const clearTimeouts = jest.spyOn(dom.root.instance, "clearTimeouts");
  //   dom.update(<Component alert title="bob" onBackgroundPress={callback} />);
  //   expect(alert).toHaveBeenCalled();
  //   expect(callback).not.toHaveBeenCalled();
  //   jest.runAllTimers();
  //   expect(callback).toHaveBeenCalled();
  //   expect(clearTimeouts).toHaveBeenCalled();
  // });

  // it("renders dialog to show single button in center", () => {
  //   const dom = renderer.create(
  //     <Component alert title="bob" onCancelButtonPress={() => undefined} />
  //   );
  //   expect(dom.toJSON()).toMatchSnapshot();
  // });

  // it("renders dialog to show double buttons beside each other", () => {
  //   const dom = renderer.create(
  //     <Component
  //       alert
  //       title="bob"
  //       onCancelButtonPress={() => undefined}
  //       onConfirmButtonPress={() => undefined}
  //     />
  //   );
  //   expect(dom.toJSON()).toMatchSnapshot();
  // });

  // it("renders alert to show then hide without onBackgroundPress", () => {
  //   const dom = renderer.create(<Component alert title="bob" />);
  //   const disappearAlert = jest.spyOn(dom.root.instance, "disappearAlert");
  //   const clearTimeouts = jest.spyOn(dom.root.instance, "clearTimeouts");
  //   dom.update(<Component alert title="bob" />);
  //   expect(disappearAlert).toHaveBeenCalled();
  //   jest.runAllTimers();
  //   expect(clearTimeouts).toHaveBeenCalled();
  // });

  // it("clears timeouts when disappearing", () => {
  //   const dom = renderer.create(<Component title="bob" />);
  //   const clearTimeouts = jest.spyOn(dom.root.instance, "clearTimeouts");
  //   dom.update(<Component title="bob" />);
  //   expect(clearTimeouts).toHaveBeenCalled();
  // });

  // it("clears timeouts when unmounting", () => {
  //   const dom = renderer.create(<Component title="bob" />);
  //   const clearTimeouts = jest.spyOn(dom.root.instance, "clearTimeouts");
  //   dom.unmount();
  //   expect(clearTimeouts).toHaveBeenCalled();
  // });
});
