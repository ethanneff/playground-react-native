import React, {memo, useCallback, useRef, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {Button, KeyboardHandler, Screen} from '../../../../components';
import {useColor} from '../../../../hooks';
import {padding, useRootSelector} from '../../../../utils';
import {Card, List} from '../../components';
import {getInbox} from '../../models';
import {useTabTap} from '../../utils';
import {useKeyboardHeight} from '../../utils/useKeyboardHeight';

const initialState = {container: 0, button: 0};
export const Capture = memo(function Capture() {
  useTabTap();
  const color = useColor();
  const containerRefs = useRef(initialState);
  const keyboardHeight = useKeyboardHeight();
  const [containerHeight, setContainerHeight] = useState(0);
  const keyboardPadding = padding(keyboardHeight ? 11 : 48);
  const maxHeight = containerHeight - keyboardHeight - keyboardPadding;

  const itemId = useRootSelector(getInbox);
  if (!itemId) throw new Error('missing item id');
  const noItemChildren = useRootSelector(
    s => s.completeItem.items[itemId].children.length === 0,
  );

  const onOrganize = useCallback(() => undefined, []);

  const onLayout = useCallback(
    (key: keyof typeof initialState) => (event: LayoutChangeEvent) => {
      const {height} = event.nativeEvent.layout;
      if (!containerRefs.current[key]) containerRefs.current[key] = height;
      const {container, button} = containerRefs.current;
      if (container > 0 && button > 0 && !containerHeight) {
        const dimensions = container - button;
        setContainerHeight(dimensions);
      }
    },
    [containerHeight],
  );

  const showSearchBar = useCallback(() => undefined, []);

  return (
    <Screen onRightPress={showSearchBar} rightIcon="magnify" title="Plan">
      <KeyboardHandler
        backgroundColor={color.background.secondary}
        onLayout={onLayout('container')}>
        <List
          footer={
            <Card onLayout={onLayout('button')}>
              <Button
                center
                color="accent"
                disabled={noItemChildren}
                onPress={onOrganize}
                title="Organize"
              />
            </Card>
          }
          itemId={itemId}
          maxHeight={maxHeight}
          parentItemId={null}
        />
      </KeyboardHandler>
    </Screen>
  );
});
