import React, {ErrorInfo} from 'react';
import {Text} from '../Text';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.PureComponent {
  state: State = {hasError: false};

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }
    return <Text title="something went wrong" />;
  }
}
