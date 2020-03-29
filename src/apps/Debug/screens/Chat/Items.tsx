import React, {memo, useCallback} from 'react';
import {FlatList} from 'react-native';
import {Item} from './Item';
import {useRootSelector} from '../../../../utils';
import {Message, getActiveChatMessagesOrderByCreatedAt} from './Messages';

export const Items = memo(function ChatMessageItems() {
  const messages = useRootSelector(getActiveChatMessagesOrderByCreatedAt);
  const renderItem = useCallback(
    ({item}: {item: Message}) => <Item item={item} />,
    [],
  );
  const keyExtractor = useCallback((item: Message) => item.id, []);

  return (
    <FlatList
      inverted
      data={messages}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
});
