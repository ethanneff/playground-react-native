import React, {ErrorInfo, ReactNode} from 'react';
import {View} from 'react-native';
import {Text} from '../Text';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends React.PureComponent<Props, State> {
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
    return (
      <View>
        <Text center title="something went wrong" />
      </View>
    );
  }
}
