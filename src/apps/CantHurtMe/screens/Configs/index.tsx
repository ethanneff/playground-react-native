import React from "react";
import { connect } from "react-redux";
import { Dialog } from "../../../../components";

class Component extends React.PureComponent {
  public render() {
    return (
      <Dialog
        title="Settings"
        onBackgroundPress={() => undefined}
        onCancelButtonPress={() => undefined}
        onConfirmButtonPress={() => undefined}
      />
    );
  }
}

export const Configs = connect()(Component);
