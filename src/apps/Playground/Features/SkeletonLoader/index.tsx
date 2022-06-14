import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Screen, ScrollView, Text } from '../../../../components';
import { padding, useColors } from '../../../../features';
import { LoadingProfile } from './LoadingProfile';
import { LoadingSection } from './LoadingSection';

export const SkeletonLoading = memo(function PlaygroundTemplate() {
  const { goBack } = useNavigation();
  const colors = useColors();

  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  const onRetry = useCallback(() => {
    setLoading(true);
    load();
  }, [load]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Skeleton Loader"
    >
      <ScrollView
        contentContainerStyle={{ padding: padding(4) }}
        style={{ backgroundColor: colors.background.secondary }}
      >
        {loading ? (
          <View>
            <LoadingProfile />
            <LoadingSection />
            <LoadingSection />
            <LoadingSection />
            <LoadingSection />
          </View>
        ) : (
          <View>
            <Text
              center
              title="loaded"
            />
            <Button
              center
              onPress={onRetry}
              title="retry"
            />
          </View>
        )}
      </ScrollView>
    </Screen>
  );
});
