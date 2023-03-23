import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useState } from 'react';
import { type LayoutChangeEvent } from 'react-native';
import { KeyboardHandler, Screen } from '../../../../components';
import {
  spacing,
  useColors,
  useKeyboardHeight,
  useLayout,
} from '../../../../features';
import { getSmallestDimension, useRootSelector } from '../../../../redux';
import { Board } from '../../components';

// TODO: figure out centering of list

export const Project = memo(function Project() {
  const { goBack } = useNavigation();
  const colors = useColors();
  const screenWidth = useRootSelector(getSmallestDimension);
  const { projectItemId } = useRootSelector((s) => s.completeItem.nav);
  if (!projectItemId) throw new Error('missing projectItemId on board screen');
  const projectItemType = useRootSelector(
    (s) => s.completeItem.items[projectItemId].type,
  );
  const projectItemTitle = useRootSelector(
    (s) => s.completeItem.items[projectItemId].title,
  );
  const listWidth = screenWidth * 0.7;
  const { tabBarEdges } = useLayout();
  const [container, setContainer] = useState(0);
  const keyboardHeight = useKeyboardHeight();
  const typePadding = spacing(projectItemType === 'list' ? 12 : 0);
  const keyboardPadding = spacing(keyboardHeight ? 28 : 48);
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

  return (
    <Screen
      edges={tabBarEdges}
      onLeftPress={navBack}
      title={projectItemTitle}
    >
      <KeyboardHandler
        backgroundColor={colors.background.secondary}
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
