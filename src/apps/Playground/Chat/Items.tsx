import React, {memo, useCallback, useEffect, useRef} from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {padding, useColor} from '../../../features';
import {useRootSelector} from '../../../redux';
import {Item} from './Item';
import {getActiveChatMessagesOrderByCreatedAt, Message} from './Messages';

export const Items = memo(function ChatMessageItems() {
  const itemsRef = useRef<FlatList | null>(null);
  const color = useColor();
  const messages = useRootSelector(getActiveChatMessagesOrderByCreatedAt);
  const renderItem = useCallback<ListRenderItem<Message>>(
    ({item}) => <Item item={item} marginBottom={item.id !== messages[0].id} />,
    [messages],
  );
  const keyExtractor = useCallback((item: Message) => item.id, []);

  useEffect(() => {
    itemsRef.current?.scrollToItem({item: messages[0]});
  }, [messages]);

  return (
    <FlatList
      contentContainerStyle={{padding: padding(4)}}
      data={messages}
      inverted
      keyExtractor={keyExtractor}
      keyboardShouldPersistTaps="handled"
      ref={itemsRef}
      renderItem={renderItem}
      style={{backgroundColor: color.background.secondary}}
    />
  );
});
