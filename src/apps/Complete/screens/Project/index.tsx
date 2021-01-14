import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {KeyboardHandler, Screen} from '../../../../components';
import {useColor} from '../../../../hooks';
import {getSmallestDimension} from '../../../../models';
import {config, useRootSelector} from '../../../../utils';
import {Board} from '../../components';
import {useKeyboardHeight} from '../../utils/useKeyboardHeight';

// TODO: figure out centering of list

export const Project = memo(function Project() {
  const {goBack} = useNavigation();
  const color = useColor();
  const screenWidth = useRootSelector(getSmallestDimension);
  const {projectItemId} = useRootSelector((s) => s.completeItem.nav);
  if (!projectItemId) throw new Error('missing projectItemId on board screen');
  if (!projectItemType)
    throw new Error('missing projectItemType on board screen');
  const listWidth = screenWidth * 0.7;
  const [container, setContainer] = useState(0);
  const keyboardHeight = useKeyboardHeight();
  const keyboardPadding = config.padding(keyboardHeight ? 28 : 48);
  const listMaxHeight = container - keyboardHeight - keyboardPadding;

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
    <Screen onLeftPress={navBack} title={projectItemTitle}>
      <KeyboardHandler backgroundColor={color.surface} onLayout={onLayout}>
        <Board
          listMaxHeight={listMaxHeight}
          listWidth={listWidth}
          projectItemId={projectItemId}
        />
      </KeyboardHandler>
    </Screen>
  );
});
