import React, {memo, useCallback, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {KeyboardHandler, Screen} from '../../../../components';
import {useColor} from '../../../../hooks';
import {config, useRootSelector} from '../../../../utils';
import {List} from '../../components';
import {getProjects} from '../../models';
import {useKeyboardHeight} from '../../utils/useKeyboardHeight';

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
  const keyboardPadding = config.padding(keyboardHeight ? 16 : 35);
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
      <KeyboardHandler backgroundColor={color.surface} onLayout={onLayout}>
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
