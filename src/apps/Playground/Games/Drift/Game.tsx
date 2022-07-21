import React, { memo } from 'react';
import { View } from '../../../../components';
import { useColors, useLayout } from '../../../../features';
import { Character } from './Character';
import { Tracks } from './Tracks';

export const Game = memo(function Game() {
  const { layout, onLayout } = useLayout();
  const colors = useColors();

  return (
    <View
      onLayout={onLayout}
      style={{ flex: 1, backgroundColor: colors.background.secondary }}
    >
      {layout ? (
        <>
          <Character canvas={layout} />
          <Tracks />
        </>
      ) : null}
    </View>
  );
});
