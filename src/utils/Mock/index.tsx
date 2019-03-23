import * as React from "react";
import { Provider } from "react-redux";
import { Router } from "../../components";
import { store } from "../../models";

interface Props {
  Component: any;
}

export class MockProviderAndRouter extends React.PureComponent<Props> {
  private mock = jest.fn();
  private history = {
    push: this.mock
  };
  public render() {
    const { Component } = this.props;
    return (
      <Provider store={store}>
        <Router>
          <Component
            match={this.mock}
            location={this.mock}
            history={this.history}
          />
        </Router>
      </Provider>
    );
  }
}
