import React, { type ErrorInfo, type ReactNode } from 'react';
import { Text } from '../Text';

type Props = {
  readonly children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends React.PureComponent<Props, State> {
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('error boundary', error, errorInfo);
    return this;
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    return hasError ? (
      <Text
        center
        title="something went wrong"
      />
    ) : (
      children
    );
  }
}
