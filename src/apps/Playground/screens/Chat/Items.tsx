import React, {memo, useCallback, useRef, useEffect} from 'react';
import {FlatList} from 'react-native';
import {useRootSelector} from '../../../../utils';
import {Item} from './Item';
import {Message, getActiveChatMessagesOrderByCreatedAt} from './Messages';

export const Items = memo(function ChatMessageItems() {
  const itemsRef = useRef<FlatList | null>(null);
  const messages = useRootSelector(getActiveChatMessagesOrderByCreatedAt);
  const renderItem = useCallback(
    ({item}: {item: Message}) => <Item item={item} />,
    [],
  );
  const keyExtractor = useCallback((item: Message) => item.id, []);

  useEffect(() => {
    itemsRef.current?.scrollToItem({item: messages[0]});
  }, [messages]);

  return (
    <FlatList
      ref={itemsRef}
      inverted
      data={messages}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
});
