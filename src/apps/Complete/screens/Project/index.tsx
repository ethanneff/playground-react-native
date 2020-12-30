import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {LayoutChangeEvent, Platform} from 'react-native';
import {Screen, Text} from '../../../../components';
import {useColor} from '../../../../hooks';
import {getSmallestDimension} from '../../../../models';
import {useRootSelector} from '../../../../utils';
import {Board, HandleKeyboard} from '../../components';
import {config} from '../../configs';

// TODO: figure out centering of list

export const Project = memo(function Project() {
  const {goBack} = useNavigation();
  const color = useColor();
  const screenWidth = useRootSelector(getSmallestDimension);
  const boardId = useRootSelector((s) => s.completeBoard.active);
  const listWidth = screenWidth * 0.7;
  const [container, setContainer] = useState(0);
  const android = Platform.OS === 'android';
  const keyboardHeight = useRootSelector(
    (state) => state.device.keyboardHeight,
  );

  const listMaxHeight =
    keyboardHeight === 0
      ? container - (android ? config.padding * 8 : config.padding * 12)
      : container -
        keyboardHeight -
        (android ? config.padding * 3 : config.padding * 7);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const {height} = event.nativeEvent.layout;
      if (container > 0) {
        return;
      }
      setContainer(height);
    },
    [container],
  );

  const navBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <Screen onLeftPress={navBack} title="Focus">
      {!boardId ? (
        <Text title="missing board" />
      ) : (
        <HandleKeyboard
          backgroundColor={color.surface}
          onLayout={onLayout}
          render={container > 0}>
          <Board
            boardId={boardId}
            listMaxHeight={listMaxHeight}
            listWidth={listWidth}
          />
        </HandleKeyboard>
      )}
    </Screen>
  );
});
