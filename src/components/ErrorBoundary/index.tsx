import React, {ErrorInfo, ReactNode} from 'react';
import {Text} from '../Text';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends React.PureComponent<Props, State> {
  static getDerivedStateFromError() {
    return {hasError: true};
  }

  constructor(props: Props) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    const {hasError} = this.state;
    const {children} = this.props;
    if (!hasError) {
      return children;
    }
    return <Text center title="something went wrong" />;
  }
}
