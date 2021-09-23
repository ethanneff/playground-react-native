import React, { memo, useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { KeyboardHandler, Screen } from '../../../../components';
import { padding, useColor, useKeyboardHeight } from '../../../../features';
import { useRootSelector } from '../../../../redux';
import { List } from '../../components';
import { getProjects } from '../../models';

// TODO: add journal
// TODO: add historical data
// TODO: add purpose
// TODO: add goals

// TODO: render as <Board />

export const Projects = memo(function Projects() {
  const color = useColor();
  const [dimensions, setDimensions] = useState(0);
  const keyboardHeight = useKeyboardHeight();
  const itemId = useRootSelector(getProjects);
  if (!itemId) throw new Error('missing item id');
  const keyboardPadding = padding(keyboardHeight ? 16 : 35);
  const maxHeight = dimensions - keyboardHeight - keyboardPadding;

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (dimensions > 0) return;
      setDimensions(event.nativeEvent.layout.height);
    },
    [dimensions],
  );

  const showSearchBar = useCallback(() => undefined, []);

  return (
    <Screen onRightPress={showSearchBar} rightIcon="magnify" title="Implement">
      <KeyboardHandler
        backgroundColor={color.background.secondary}
        onLayout={onLayout}
      >
        <List
          itemId={itemId}
          key={itemId}
          maxHeight={maxHeight}
          parentItemId={null}
        />
      </KeyboardHandler>
    </Screen>
  );
});
