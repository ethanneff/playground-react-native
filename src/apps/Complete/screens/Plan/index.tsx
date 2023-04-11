import React, { memo, useCallback, useState } from 'react';
import { type LayoutChangeEvent } from 'react-native';
import {
  Button,
  Card,
  KeyboardHandler,
  Screen,
  Spacing,
  View,
} from '../../../../components';
import { spacing, useKeyboardHeight, useLayout } from '../../../../features';
import { useRootSelector } from '../../../../redux';
import { List } from '../../components';
import { getInbox } from '../../models';

export const Plan = memo(function Plan() {
  const { tabBarEdges } = useLayout();
  const keyboardHeight = useKeyboardHeight();
  const [containerHeight, setContainerHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const keyboardFooter = keyboardHeight ? footerHeight : 0;
  const maxHeight = containerHeight - keyboardHeight + keyboardFooter;
  const itemId = useRootSelector(getInbox);
  if (!itemId) throw new Error('missing item id');
  const noItemChildren = useRootSelector(
    (s) => s.completeItem.items[itemId].children.length === 0,
  );

  const onOrganize = useCallback(() => undefined, []);

  const onLayout = useCallback(
    (type: 'container' | 'footer') => (event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      if (type === 'container') {
        setContainerHeight(height);
      } else {
        setFooterHeight(height);
      }
    },
    [],
  );

  return (
    <Screen
      dropShadow
      edges={tabBarEdges}
      title="Plan"
    >
      <KeyboardHandler
        backgroundColor="secondary"
        onLayout={onLayout('container')}
      >
        {/* TODO: use a <Board /> similar screens/project */}
        <List
          footer={
            <View onLayout={onLayout('footer')}>
              <Spacing padding={spacing(2)} />
              <Card
                containerStyle={{ flex: 0 }}
                contentStyle={{ flex: 0 }}
              >
                <Button
                  center
                  color="accent"
                  disabled={noItemChildren}
                  onPress={onOrganize}
                  title="Organize"
                />
              </Card>
            </View>
          }
          itemId={itemId}
          maxHeight={maxHeight}
          parentItemId={null}
        />
      </KeyboardHandler>
    </Screen>
  );
});