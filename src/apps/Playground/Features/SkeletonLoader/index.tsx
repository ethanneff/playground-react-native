import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Button, Screen, ScrollView, Text, View } from '../../../../components';
import { spacing, useColors } from '../../../../features';
import { LoadingProfile } from './LoadingProfile';
import { LoadingSection } from './LoadingSection';

export const SkeletonLoading = memo(function PlaygroundTemplate() {
  const { goBack } = useNavigation();
  const colors = useColors();
  const mounted = useRef(true);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    const timeout = setTimeout(() => {
      if (!mounted.current) return;
      setLoading(false);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const onRetry = useCallback(() => {
    setLoading(true);
    load();
  }, [load]);

  useEffect(() => {
    load();
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, [load]);

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Skeleton Loader"
    >
      <ScrollView
        contentContainerStyle={{ padding: spacing(4) }}
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
