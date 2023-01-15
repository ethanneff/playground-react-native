import React, { memo, useCallback, useRef } from 'react';
import { FlatList, FlatListRef, FlatListRenderItem } from '../../../components';
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
  const listRef = useRef<FlatListRef<string>>(null);
  const cardsLength = useRef(list.length);

  const onKeyExtractor = useCallback((item: string) => item, []);

  const onCardSizeChange = useCallback(() => {
    if (list.length > cardsLength.current) {
      listRef.current?.scrollToEnd();
      cardsLength.current = list.length;
    }
  }, [list.length]);

  const onRenderItem = useCallback<FlatListRenderItem<string>>(
    ({ index, item }) => (
      <ListItem
        index={index}
        itemId={item}
        parentItemId={parentItemId}
      />
    ),
    [parentItemId],
  );

  return (
    <FlatList
      data={list}
      estimatedItemSize={55}
      keyExtractor={onKeyExtractor}
      keyboardShouldPersistTaps="handled"
      onContentSizeChange={onCardSizeChange}
      onRef={listRef}
      renderItem={onRenderItem}
      showsVerticalScrollIndicator={false}
    />
  );
});
