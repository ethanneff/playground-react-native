import React, { useCallback, useState } from 'react';
import { type LayoutChangeEvent } from 'react-native';
import { KeyboardHandler, Screen } from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { useKeyboardHeight, useLayout } from '../../../../features';
import { getSmallestDimension, useAppSelector } from '../../../../redux';
import { Board } from '../../components';

// TODO: figure out centering of list

export const Project = () => {
  const { goBack } = useNavigation();
  const screenWidth = useAppSelector(getSmallestDimension);
  const { projectItemId } = useAppSelector((s) => s.completeItem.nav);
  if (!projectItemId) throw new Error('missing projectItemId on board screen');
  const projectItemTitle = useAppSelector(
    (s) => s.completeItem.items[projectItemId].title,
  );
  const listWidth = screenWidth * 0.7;
  const { tabBarEdges } = useLayout();
  const [container, setContainer] = useState(0);
  const keyboardHeight = useKeyboardHeight();
  const listMaxHeight = container - keyboardHeight;

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setContainer(event.nativeEvent.layout.height);
  }, []);

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
        backgroundColor="secondary"
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
};
