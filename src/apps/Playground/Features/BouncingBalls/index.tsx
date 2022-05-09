import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { View } from 'react-native';
import { Screen } from '../../../../components';
import { useColors, useLayout } from '../../../../features';
import { Balls } from './Balls';

export const BouncingBalls = memo(function PlaygroundBouncingBalls() {
  const { goBack } = useNavigation();
  const { layout, onLayout } = useLayout();
  const colors = useColors();

  return (
    <Screen dropShadow onLeftPress={goBack} title="BouncingBalls">
      <View
        onLayout={onLayout}
        style={{ flex: 1, backgroundColor: colors.background.secondary }}
      >
        {layout && (
          <Balls
            canvas={layout}
            count={1}
            maxSize={layout.width / 6}
            minSize={layout.width / 6}
          />
        )}
      </View>
    </Screen>
  );
});
