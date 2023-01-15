import React, { memo, useCallback, useRef } from 'react';
import { type ListRenderItem } from 'react-native';
import { FlatList, type FlatListRef } from '../../../components';
import { useRootSelector } from '../../../redux';
import { ListItem } from './ListItem';

type ListItemsProps = {
  parentItemId: string;
};

export const ListItems = memo(function ListItems({
  parentItemId,
}: ListItemsProps) {
  const list = useRootSelector(
    (s) => s.completeItem.items[parentItemId].children,
  );
  const listRef = useRef<FlatListRef>(null);
  const cardsLength = useRef(list.length);

  const onKeyExtractor = useCallback((item: string) => item, []);

  const onCardSizeChange = useCallback(() => {
    if (list.length > cardsLength.current) {
      listRef.current?.scrollToEnd();
      cardsLength.current = list.length;
    }
  }, [list.length]);

  const onRenderItem: ListRenderItem<string> = useCallback(
    ({ index, item }) => (
      <ListItem
        index={index}
        itemId={item}
        key={item}
        parentItemId={parentItemId}
      />
    ),
    [parentItemId],
  );

  return (
    <FlatList
      data={list}
      keyExtractor={onKeyExtractor}
      keyboardShouldPersistTaps="handled"
      onContentSizeChange={onCardSizeChange}
      onRef={listRef}
      renderItem={onRenderItem}
      showsVerticalScrollIndicator={false}
    />
  );
});
