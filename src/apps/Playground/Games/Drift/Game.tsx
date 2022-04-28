import React, { memo } from 'react';
import { View } from 'react-native';
import { useCanvas, useColors } from '../../../../features';
import { Character } from './Character';
import { Tracks } from './Tracks';

export const Game = memo(function Game() {
  const { canvas, onLayout } = useCanvas();
  const colors = useColors();

  return (
    <View
      onLayout={onLayout}
      style={{ flex: 1, backgroundColor: colors.background.secondary }}
    >
      {canvas && (
        <>
          <Character canvas={canvas} />
          <Tracks />
        </>
      )}
    </View>
  );
});
