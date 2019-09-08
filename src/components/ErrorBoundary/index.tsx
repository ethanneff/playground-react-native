import React, { ErrorInfo } from "react";
import { Text } from "../Text";

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.PureComponent {
  public state: State = { hasError: false };

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  public render() {
    if (!this.state.hasError) return this.props.children;
    return <Text title="something went wrong" />;
  }
}
