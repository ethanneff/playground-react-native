import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { KeyboardHandler, Screen } from '../../../../components';
import { padding, useColor, useKeyboardHeight } from '../../../../features';
import { getSmallestDimension, useRootSelector } from '../../../../redux';
import { Board } from '../../components';

// TODO: figure out centering of list

export const Project = memo(function Project() {
  const { goBack } = useNavigation();
  const color = useColor();
  const screenWidth = useRootSelector(getSmallestDimension);
  const { projectItemId } = useRootSelector(s => s.completeItem.nav);
  if (!projectItemId) throw new Error('missing projectItemId on board screen');
  const projectItemType = useRootSelector(
    s => s.completeItem.items[projectItemId].type,
  );
  const projectItemTitle = useRootSelector(
    s => s.completeItem.items[projectItemId].title,
  );
  if (!projectItemType)
    throw new Error('missing projectItemType on board screen');
  const listWidth = screenWidth * 0.7;
  const [container, setContainer] = useState(0);
  const keyboardHeight = useKeyboardHeight();
  const typePadding = padding(projectItemType === 'list' ? 12 : 0);
  const keyboardPadding = padding(keyboardHeight ? 28 : 48);
  const listMaxHeight =
    container - keyboardHeight - keyboardPadding + typePadding;

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (container > 0) return;
      setContainer(event.nativeEvent.layout.height);
    },
    [container],
  );

  const navBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const showSearchBar = useCallback(() => undefined, []);

  return (
    <Screen
      onLeftPress={navBack}
      onRightPress={showSearchBar}
      rightIcon="magnify"
      title={projectItemTitle}
    >
      <KeyboardHandler
        backgroundColor={color.background.secondary}
        onLayout={onLayout}
      >
        <Board
          listMaxHeight={listMaxHeight}
          listWidth={listWidth}
          projectItemId={projectItemId}
        />
      </KeyboardHandler>
    </Screen>
  );
});
