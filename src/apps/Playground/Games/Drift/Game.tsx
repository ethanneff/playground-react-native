import React from 'react';
import { View } from '../../../../components';
import { useColors, useLayout } from '../../../../features';
import { Character } from './Character';
import { Tracks } from './Tracks';

export const Game = () => {
  const { layout, onLayout } = useLayout();
  const colors = useColors();

  return (
    <View
      onLayout={onLayout}
      style={{ backgroundColor: colors.background.secondary, flex: 1 }}
    >
      {layout ? (
        <>
          <Character canvas={layout} />
          <Tracks />
        </>
      ) : null}
    </View>
  );
};
