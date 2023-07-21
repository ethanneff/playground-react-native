import React, { useCallback, useState } from 'react';
import { type LayoutChangeEvent } from 'react-native';
import { KeyboardHandler, Screen } from '../../../../components';
import { useKeyboardHeight, useLayout } from '../../../../features';
import { useAppSelector } from '../../../../redux';
import { List } from '../../components';
import { getProjects } from '../../models';

// TODO: add journal
// TODO: add historical data
// TODO: add purpose
// TODO: add goals

// TODO: render as <Board />

export const Projects = () => {
  const { tabBarEdges } = useLayout();
  const [dimensions, setDimensions] = useState(0);
  const keyboardHeight = useKeyboardHeight();
  const itemId = useAppSelector(getProjects);
  if (!itemId) throw new Error('missing item id');
  const maxHeight = dimensions - keyboardHeight;

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setDimensions(event.nativeEvent.layout.height);
  }, []);

  return (
    <Screen
      dropShadow
      edges={tabBarEdges}
      title="Implement"
    >
      <KeyboardHandler
        backgroundColor="secondary"
        onLayout={onLayout}
      >
        <List
          itemId={itemId}
          maxHeight={maxHeight}
          parentItemId={null}
        />
      </KeyboardHandler>
    </Screen>
  );
};
