import React, { memo, useCallback, useEffect, useRef } from 'react';
import { type ListRenderItem } from 'react-native';
import { FlatList, type FlatListRef } from '../../../../components';
import { spacing, useColors } from '../../../../features';
import { useRootSelector } from '../../../../redux';
import { Item } from './Item';
import {
  getActiveChatMessagesOrderByCreatedAt,
  type Message,
} from './Messages';

export const Items = memo(function ChatMessageItems() {
  const itemsRef = useRef<FlatListRef>(null);
  const colors = useColors();
  const messages = useRootSelector(getActiveChatMessagesOrderByCreatedAt);
  const renderItem = useCallback<ListRenderItem<Message>>(
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
    <FlatList
      contentContainerStyle={{ padding: spacing(4) }}
      data={messages}
      initialNumToRender={0}
      inverted
      keyExtractor={keyExtractor}
      onRef={itemsRef}
      renderItem={renderItem}
      style={{ backgroundColor: colors.background.secondary }}
    />
  );
});
