import React, { ErrorInfo, ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from '../Text';

type Props = {
  children: ReactNode;
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

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);
  }

  render(): JSX.Element {
    const { hasError } = this.state;
    const { children } = this.props;
    return hasError ? (
      <Text center title="something went wrong" />
    ) : (
      <View>{children}</View>
    );
  }
}
