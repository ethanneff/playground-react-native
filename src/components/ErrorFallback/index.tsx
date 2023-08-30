import React, { useCallback } from 'react';
import { type FallbackProps } from 'react-error-boundary';
import RNRestart from 'react-native-restart';
import { persistor } from '../../redux/ReduxProvider';
import { Button } from '../Button';
import { ScrollView } from '../ScrollView';
import { Text } from '../Text';

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const message = error instanceof Error ? error.message : 'unknown error';

  const handleReload = useCallback(() => {
    persistor.purge();
    resetErrorBoundary();
    RNRestart.restart();
  }, [resetErrorBoundary]);

  return (
    <ScrollView>
      <Text
        center
        title="Something went wrong :("
        type="h1"
      />
      <Text
        center
        title={message}
      />
      <Button
        onPress={handleReload}
        title="reload"
      />
    </ScrollView>
  );
};
