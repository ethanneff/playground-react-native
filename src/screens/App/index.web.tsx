import * as React from "react";
import {
  AppState,
  AppStateStatus,
  ConnectionInfo,
  ConnectionType,
  Dimensions,
  NetInfo
} from "react-native";
import { connect } from "react-redux";
import { Route, Router, Switch } from "../../components";
import {
  DimensionsProps,
  onAppStatusChange,
  onDimensionChange,
  onNetworkChange
} from "../../models";
import { Debug, Landing, Login, Main, NotFound } from "../../screens";

interface DispatchProps {
  onAppStatusChange: typeof onAppStatusChange;
  onNetworkChange: typeof onNetworkChange;
  onDimensionChange: typeof onDimensionChange;
}

type Props = DispatchProps;

class Component extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.enableListeners();
  }

  public componentWillUnmount() {
    this.disableListeners();
  }

  public render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/debug" component={Debug} />
          <Route auth path="/app" component={Main} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }

  private enableListeners() {
    NetInfo.addEventListener("connectionChange", this.onNetworkChange);
    Dimensions.addEventListener("change", this.onDimensionChange);
    AppState.addEventListener("change", this.onAppStateChange);
  }

  private disableListeners() {
    NetInfo.removeEventListener("connectionChange", this.onNetworkChange);
    Dimensions.removeEventListener("change", this.onDimensionChange);
    AppState.removeEventListener("change", this.onAppStateChange);
  }

  private onNetworkChange = (change: ConnectionType | ConnectionInfo) => {
    if (typeof change === "string") {
      return;
    }
    this.props.onNetworkChange(change);
  };

  private onDimensionChange = (change: DimensionsProps) => {
    this.props.onDimensionChange(change);
  };

  private onAppStateChange = (change: AppStateStatus) => {
    this.props.onAppStatusChange(change);
  };
}

export const App = connect(
  null,
  {
    onAppStatusChange,
    onDimensionChange,
    onNetworkChange
  }
)(Component);
