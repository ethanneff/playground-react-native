import React, {ErrorInfo} from 'react';
import {Text} from '../Text';
import {View} from 'react-native';

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
    return (
      <View>
        <Text center title="something went wrong" />
      </View>
    );
  }
}
