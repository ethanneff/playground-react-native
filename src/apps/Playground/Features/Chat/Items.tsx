import React, { useCallback, useEffect, useRef } from 'react';
import {
  FlashList,
  View,
  type FlashListReference,
  type FlashListRenderItem,
} from '../../../../components';
import { spacing, useColors } from '../../../../features';
import { useAppSelector } from '../../../../redux';
import { Item } from './Item';
import {
  getActiveChatMessagesOrderByCreatedAt,
  type Message,
} from './Messages';

export const Items = () => {
  const itemsReference = useRef<FlashListReference<Message>>(null);
  const colors = useColors();
  const messages = useAppSelector(getActiveChatMessagesOrderByCreatedAt);
  const renderItem = useCallback<FlashListRenderItem<Message>>(
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
    itemsReference.current?.scrollToItem({ item: messages[0] });
  }, [messages]);

  return (
    <View
      backgroundColor="secondary"
      flex={1}
    >
      <FlashList
        contentContainerStyle={{
          backgroundColor: colors.background.secondary,
          padding: spacing(4),
        }}
        data={messages}
        estimatedItemSize={100}
        inverted
        keyExtractor={keyExtractor}
        onRef={itemsReference}
        renderItem={renderItem}
      />
    </View>
  );
};
