import React, { memo, useCallback, useEffect, useRef } from 'react';

import {
  FlatList,
  type FlatListRef,
  type FlatListRenderItem,
  View,
} from '../../../../components';
import { spacing, useColors } from '../../../../features';
import { useRootSelector } from '../../../../redux';
import { Item } from './Item';
import {
  getActiveChatMessagesOrderByCreatedAt,
  type Message,
} from './Messages';

export const Items = memo(function ChatMessageItems() {
  const itemsRef = useRef<FlatListRef<Message>>(null);
  const colors = useColors();
  const messages = useRootSelector(getActiveChatMessagesOrderByCreatedAt);
  const renderItem = useCallback<FlatListRenderItem<Message>>(
    ({ item }) => (
      <Item
        item={item}
        marginBottom={item.id !== messages[0].id}
      />
    ),
    [messages],
  );
  const keyExtractor = useCallback((item: Message) => item.id, []);

  useEffect(() => {
    itemsRef.current?.scrollToItem({ item: messages[0] });
  }, [messages]);

  return (
    <View
      backgroundColor="secondary"
      flex={1}
    >
      <FlatList
        contentContainerStyle={{
          backgroundColor: colors.background.secondary,
          padding: spacing(4),
        }}
        data={messages}
        estimatedItemSize={100}
        inverted
        keyExtractor={keyExtractor}
        onRef={itemsRef}
        renderItem={renderItem}
      />
    </View>
  );
});
