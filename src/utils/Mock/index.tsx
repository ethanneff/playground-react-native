import * as React from "react";
import { Provider } from "..";
import { Router } from "../../components";

interface Props {
  Component: any;
}

export class MockProviderAndRouter extends React.PureComponent<Props> {
  public mock = jest.fn();
  public history = {
    push: this.mock
  };
  public render() {
    const { Component } = this.props;
    return (
      <Provider>
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
